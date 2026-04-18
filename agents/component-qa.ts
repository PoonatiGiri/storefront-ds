#!/usr/bin/env tsx
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';

const MODEL = 'claude-opus-4-7';
const MAX_TOKENS = 8096;

function parseArgs(argv: string[]): { figmaUrl: string; component: string; output?: string } {
  const args = argv.slice(2);
  const get = (flag: string) => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] : undefined;
  };

  const figmaUrl = get('--figma-url');
  const component = get('--component');
  const output = get('--output');

  if (!figmaUrl || !component) {
    process.stderr.write(
      'Usage: component-qa --figma-url <url> --component <path> [--output <path>]\n'
    );
    process.exit(1);
  }

  return { figmaUrl, component: component!, output };
}

function parseFigmaUrl(url: string): { fileKey: string; nodeId: string } | null {
  const fileMatch = url.match(/figma\.com\/design\/([^/?]+)/);
  const nodeMatch = url.match(/node-id=([^&]+)/);
  if (!fileMatch) return null;
  return {
    fileKey: fileMatch[1],
    nodeId: nodeMatch ? decodeURIComponent(nodeMatch[1]).replace(/-/g, ':') : '',
  };
}

const TOOLS: Anthropic.Tool[] = [
  {
    name: 'read_file',
    description: 'Read a file from the filesystem and return its full contents.',
    input_schema: {
      type: 'object' as const,
      properties: {
        path: { type: 'string', description: 'Absolute or relative path to the file' },
      },
      required: ['path'],
    },
  },
  {
    name: 'fetch_figma_node',
    description: 'Fetch design data for a Figma node via the Figma REST API.',
    input_schema: {
      type: 'object' as const,
      properties: {
        file_key: { type: 'string', description: 'Figma file key extracted from the URL' },
        node_id: { type: 'string', description: 'Figma node ID with : separator (e.g. "12:34")' },
      },
      required: ['file_key', 'node_id'],
    },
  },
  {
    name: 'write_report',
    description: 'Write the finished QA report markdown to a file.',
    input_schema: {
      type: 'object' as const,
      properties: {
        path: { type: 'string', description: 'Output file path' },
        content: { type: 'string', description: 'Full markdown report content' },
      },
      required: ['path', 'content'],
    },
  },
];

async function fetchFigmaNode(fileKey: string, nodeId: string): Promise<string> {
  const token = process.env.FIGMA_TOKEN ?? process.env.FIGMA_API_KEY;
  if (!token) {
    return JSON.stringify({ error: 'Set FIGMA_TOKEN or FIGMA_API_KEY environment variable.' });
  }
  const url = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}&geometry=paths`;
  const res = await fetch(url, { headers: { 'X-Figma-Token': token } });
  if (!res.ok) {
    return JSON.stringify({ error: `Figma API ${res.status}: ${res.statusText}` });
  }
  return JSON.stringify(await res.json(), null, 2);
}

async function executeTool(name: string, input: Record<string, string>): Promise<string> {
  switch (name) {
    case 'read_file': {
      try {
        return readFileSync(resolve(input.path), 'utf-8');
      } catch {
        return `Error: could not read ${input.path}`;
      }
    }
    case 'fetch_figma_node':
      return fetchFigmaNode(input.file_key, input.node_id);
    case 'write_report':
      writeFileSync(resolve(input.path), input.content, 'utf-8');
      return `Report saved to ${resolve(input.path)}`;
    default:
      return `Unknown tool: ${name}`;
  }
}

const SYSTEM_PROMPT = `You are the Component QA Agent for the Storefront DS design system.

Your job: compare a built React component against its Figma source and produce a structured discrepancy report. You only report and suggest fixes — never modify files directly.

━━ STEP 1 — Fetch Figma design context ━━
Call fetch_figma_node with the provided file_key and node_id. From the response extract:
• All color values (fills, strokes, text colors) — record exact hex/rgba values
• All spacing values (padding, margin, gap) — record in px
• All typography values (font-size, font-weight, line-height, letter-spacing)
• All border values (radius in px, width, color)
• All shadow values
• All size values (width, height, min/max)
• All component states present (hover, focus, active, disabled, error, loading, empty)
• All component variants present

━━ STEP 2 — Read the React component ━━
Call read_file for the component path. Then try read_file for ComponentName.stories.tsx in the same directory. Extract:
• All Tailwind classes used
• All CSS custom properties (--storefront-*) referenced
• All inline style={{ }} blocks (flag these)
• All TypeScript prop names and their types
• All state variants handled in the JSX

━━ STEP 3 — Compare across 6 categories ━━

CATEGORY 1 — Colors
• Match every Figma color to the component's implementation
• CRITICAL: hardcoded hex value instead of a token
• CRITICAL: wrong token used for a color
• CRITICAL: color state present in Figma (e.g. hover fill) but missing in component

CATEGORY 2 — Spacing
• Convert Figma px values to Tailwind scale (base 4px: 4→1, 8→2, 12→3, 16→4, …)
• CRITICAL: value doesn't match Figma
• CRITICAL: arbitrary Tailwind value used (e.g. p-[7px])
• MINOR: off by exactly one scale step

CATEGORY 3 — Typography
• Compare font-size, font-weight, line-height, letter-spacing
• CRITICAL: hardcoded font value instead of a token
• CRITICAL: wrong typography token applied
• MINOR: missing typography for a secondary state

CATEGORY 4 — Component states
• Figma states to check: default, hover, focus, active, disabled, error, loading, empty
• CRITICAL: state present in Figma but missing in React implementation
• MINOR: state in React not represented in any Figma variant (undocumented)

CATEGORY 5 — Variants
• CRITICAL: Figma variant missing as a TypeScript prop union option
• MINOR: React prop option with no corresponding Figma variant

CATEGORY 6 — Accessibility
• CRITICAL: interactive element lacks aria-label or visible label
• CRITICAL: focus ring uses focus: instead of focus-visible:
• CRITICAL: color is the only differentiator between states (no icon/text pair)
• CRITICAL: div/span used as a clickable element instead of button/a
• MINOR: missing keyboard handler for non-button interactives

━━ STEP 4 — Generate report ━━
Output the report in this exact markdown structure:

## Component QA Report: [ComponentName]
**Date:** [ISO 8601 timestamp]
**Figma URL:** [url]
**Component file:** [path]

---

### Summary
- Total issues found: X
- Critical issues: X
- Minor issues: X
- Passed checks: X

---

### Critical Issues

**1. [Category]: [short title]**
- **Location:** [element, prop, or class]
- **Figma value:** [exact value]
- **Current value:** [what the component has]
- **Fix:** \`[exact code change]\`

(repeat for each critical issue)

---

### Minor Issues
(same format)

---

### Passed Checks
- [each check that matched correctly]

---

### Recommended Fixes
Prioritised from most critical:

1. [fix with exact code]
2. ...

━━ STEP 5 — Output ━━
• Always print the complete report to stdout
• If an output path was provided, call write_report to save it
• End your final message with EXIT_CODE:1 if there are any critical issues, EXIT_CODE:0 otherwise`;

async function main(): Promise<void> {
  const { figmaUrl, component, output } = parseArgs(process.argv);
  const parsed = parseFigmaUrl(figmaUrl);
  const componentPath = resolve(component);
  const componentName = basename(dirname(componentPath));

  const client = new Anthropic();
  const messages: Anthropic.MessageParam[] = [
    {
      role: 'user',
      content: `Run a full QA audit with these inputs:

Component name: ${componentName}
Figma URL: ${figmaUrl}
Figma file key: ${parsed?.fileKey ?? 'could not parse — inspect URL manually'}
Figma node ID: ${parsed?.nodeId ?? 'could not parse — node-id param missing from URL'}
Component file: ${componentPath}
Output path: ${output ? resolve(output) : 'none — console only'}

Begin now.`,
    },
  ];

  let hasCritical = false;

  while (true) {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      tools: TOOLS,
      messages,
    });

    messages.push({ role: 'assistant', content: response.content });

    if (response.stop_reason === 'end_turn') {
      for (const block of response.content) {
        if (block.type === 'text') {
          process.stdout.write(block.text + '\n');
          if (block.text.includes('EXIT_CODE:1')) hasCritical = true;
        }
      }
      break;
    }

    if (response.stop_reason === 'tool_use') {
      const results: Anthropic.ToolResultBlockParam[] = [];
      for (const block of response.content) {
        if (block.type === 'tool_use') {
          const result = await executeTool(block.name, block.input as Record<string, string>);
          results.push({ type: 'tool_result', tool_use_id: block.id, content: result });
        }
      }
      messages.push({ role: 'user', content: results });
    }
  }

  process.exit(hasCritical ? 1 : 0);
}

main().catch((err) => {
  process.stderr.write(`Fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
