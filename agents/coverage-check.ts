#!/usr/bin/env tsx
import Anthropic from '@anthropic-ai/sdk';
import { readdirSync, statSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, join, basename } from 'node:path';

const MODEL = 'claude-opus-4-7';
const MAX_TOKENS = 8096;
const DEFAULT_COMPONENTS_DIR = 'src/components';
const COVERAGE_THRESHOLD = 80;

function parseArgs(argv: string[]): {
  figmaUrl: string;
  componentsDir: string;
  output?: string;
} {
  const args = argv.slice(2);
  const get = (flag: string, fallback?: string): string => {
    const i = args.indexOf(flag);
    return i !== -1 && args[i + 1] ? args[i + 1]! : (fallback ?? '');
  };
  const getOpt = (flag: string): string | undefined => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] : undefined;
  };

  const figmaUrl = get('--figma-url');
  if (!figmaUrl) {
    process.stderr.write(
      'Usage: coverage-check --figma-url <url> [--components-dir <path>] [--output <path>]\n'
    );
    process.exit(1);
  }

  return {
    figmaUrl,
    componentsDir: get('--components-dir', DEFAULT_COMPONENTS_DIR),
    output: getOpt('--output'),
  };
}

function parseFigmaFileKey(url: string): string | null {
  const match = url.match(/figma\.com\/design\/([^/?]+)/);
  return match ? match[1]! : null;
}

interface ComponentInventory {
  name: string;
  level: 'atom' | 'molecule' | 'organism' | 'unknown';
  path: string;
  hasTsx: boolean;
  hasStories: boolean;
  hasTest: boolean;
  hasIndex: boolean;
  storyExports: string[];
  propsCount: number;
}

function countExports(filePath: string): string[] {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const matches = content.match(/^export (?:const|function) (\w+)/gm) ?? [];
    return matches
      .map((m) => m.replace(/^export (?:const|function) /, ''))
      .filter((name) => name !== 'default' && name !== 'meta');
  } catch {
    return [];
  }
}

function countProps(filePath: string): number {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const interfaceMatch = content.match(/interface \w+Props \{([^}]+)\}/s);
    if (!interfaceMatch) return 0;
    return (interfaceMatch[1]?.match(/^\s+\w+\??:/gm) ?? []).length;
  } catch {
    return 0;
  }
}

function inferLevel(path: string): ComponentInventory['level'] {
  if (path.includes('/atoms/')) return 'atom';
  if (path.includes('/molecules/')) return 'molecule';
  if (path.includes('/organisms/')) return 'organism';
  return 'unknown';
}

function scanComponents(dir: string): ComponentInventory[] {
  const absDir = resolve(dir);
  const results: ComponentInventory[] = [];

  function walk(current: string): void {
    let entries: string[];
    try {
      entries = readdirSync(current);
    } catch {
      return;
    }

    for (const entry of entries) {
      const full = join(current, entry);
      const stat = statSync(full);
      if (!stat.isDirectory()) continue;

      const name = basename(full);
      const tsxPath = join(full, `${name}.tsx`);
      const storiesPath = join(full, `${name}.stories.tsx`);
      const testPath = join(full, `${name}.test.tsx`);
      const indexPath = join(full, 'index.ts');

      if (existsSync(tsxPath)) {
        results.push({
          name,
          level: inferLevel(full),
          path: full,
          hasTsx: true,
          hasStories: existsSync(storiesPath),
          hasTest: existsSync(testPath),
          hasIndex: existsSync(indexPath),
          storyExports: existsSync(storiesPath) ? countExports(storiesPath) : [],
          propsCount: countProps(tsxPath),
        });
      } else {
        walk(full);
      }
    }
  }

  walk(absDir);
  return results;
}

const TOOLS: Anthropic.Tool[] = [
  {
    name: 'fetch_figma_file',
    description: 'Fetch the Figma file component index via the Figma REST API.',
    input_schema: {
      type: 'object' as const,
      properties: {
        file_key: { type: 'string', description: 'Figma file key' },
      },
      required: ['file_key'],
    },
  },
  {
    name: 'get_react_inventory',
    description: 'Retrieve the pre-scanned React component inventory.',
    input_schema: {
      type: 'object' as const,
      properties: {
        confirm: { type: 'boolean', description: 'Pass true to receive the inventory.' },
      },
      required: ['confirm'],
    },
  },
  {
    name: 'write_report',
    description: 'Write the finished coverage report markdown to a file.',
    input_schema: {
      type: 'object' as const,
      properties: {
        path: { type: 'string', description: 'Output file path' },
        content: { type: 'string', description: 'Full markdown content' },
      },
      required: ['path', 'content'],
    },
  },
];

async function fetchFigmaFile(fileKey: string): Promise<string> {
  const token = process.env.FIGMA_TOKEN ?? process.env.FIGMA_API_KEY;
  if (!token) {
    return JSON.stringify({ error: 'Set FIGMA_TOKEN or FIGMA_API_KEY environment variable.' });
  }
  const res = await fetch(`https://api.figma.com/v1/files/${fileKey}?depth=3`, {
    headers: { 'X-Figma-Token': token },
  });
  if (!res.ok) {
    return JSON.stringify({ error: `Figma API ${res.status}: ${res.statusText}` });
  }
  const data = await res.json() as { components?: unknown; document?: unknown };
  return JSON.stringify({ components: data.components, document: data.document }, null, 2);
}

async function executeTool(
  name: string,
  input: Record<string, unknown>,
  inventory: ComponentInventory[],
  output?: string
): Promise<string> {
  switch (name) {
    case 'fetch_figma_file':
      return fetchFigmaFile(input.file_key as string);
    case 'get_react_inventory':
      return JSON.stringify(inventory, null, 2);
    case 'write_report': {
      const path = resolve((input.path as string) ?? output ?? 'coverage-report.md');
      writeFileSync(path, input.content as string, 'utf-8');
      return `Report saved to ${path}`;
    }
    default:
      return `Unknown tool: ${name}`;
  }
}

const SYSTEM_PROMPT = `You are the Coverage Check Agent for the Storefront DS design system.

Your job: compare the Figma component library against the React implementation and produce a full coverage report showing what's built, what's missing, and what needs attention.

━━ STEP 1 — Fetch Figma component inventory ━━
Call fetch_figma_file with the file_key. From the response extract every component:
• Component name
• Category / page it lives on
• Number of variants defined (count from componentSets or variant properties)
• States defined (hover, focus, disabled, error — infer from variant names)
• Atomic level (atom / molecule / organism — infer from name and complexity)
• Whether it has a description in Figma

━━ STEP 2 — Receive React component inventory ━━
Call get_react_inventory to receive the pre-scanned list of React components. Each entry includes:
• name, level (atom/molecule/organism/unknown), path
• hasTsx, hasStories, hasTest, hasIndex (boolean)
• storyExports (array of exported story names)
• propsCount (number of props in the interface)

━━ STEP 3 — Match and categorise ━━
Match Figma components to React components by name (case-insensitive, ignore spaces/hyphens).
Categorise each component into exactly one bucket:

FULLY IMPLEMENTED ✅
• Exists in both Figma and React
• Has .tsx, .stories.tsx, .test.tsx, and index.ts
• Story exports include: Default, AllVariants, Disabled (minimum)

PARTIALLY IMPLEMENTED ⚠️
• Exists in React but missing one or more of: stories, tests, index barrel
• Or: story exports are fewer than expected

NOT STARTED ❌
• Exists in Figma but no matching React component found

UNDOCUMENTED 🔍
• Exists in React but not found in Figma
• Could be internal utility, deprecated, or needs Figma documentation

VARIANT GAP 📊
• React implementation exists but has fewer prop variants than Figma component variants

━━ STEP 4 — Calculate metrics ━━
Compute:
• Total Figma components
• Fully implemented count and percentage
• Partially implemented count and percentage
• Not started count and percentage
• Undocumented React components count
• Average variant coverage % = (sum of React variants / sum of Figma variants) × 100
• Story coverage % = components with .stories.tsx / total React components × 100
• Test coverage % = components with .test.tsx / total React components × 100

━━ STEP 5 — Generate report ━━
Output this exact markdown structure:

## Coverage Check Report: Storefront DS
**Date:** [ISO 8601 timestamp]
**Figma file:** [url]
**Components directory:** [path]

---

### Coverage Summary
| Metric | Count | Percentage |
|---|---|---|
| Fully implemented ✅ | X | X% |
| Partially implemented ⚠️ | X | X% |
| Not started ❌ | X | X% |
| Undocumented React components 🔍 | X | — |
| Story coverage | X | X% |
| Test coverage | X | X% |
| Average variant coverage | — | X% |

---

### Fully Implemented ✅
| Component | Level | Figma variants | React props | Stories | Tests |
|---|---|---|---|---|---|
| ComponentName | atom | X | X | ✅ | ✅ |

---

### Partially Implemented ⚠️
| Component | Level | What's missing | Priority |
|---|---|---|---|
| ComponentName | atom | missing tests, 2 story variants | Medium |

---

### Not Started ❌
| Component | Level | Est. complexity | Recommended after |
|---|---|---|---|
| ComponentName | molecule | Medium | Button, Input |

---

### Undocumented React Components 🔍
| Component | Suggestion |
|---|---|
| ComponentName | Add to Figma / Deprecate / Keep as internal utility |

---

### Variant Gaps 📊
| Component | Figma variants | React variants | Missing |
|---|---|---|---|
| ComponentName | 5 | 3 | 'outline', 'ghost' |

---

### Recommended Build Order
Based on atomic hierarchy and dependency analysis:

1. **[ComponentName]** (atom) — no dependencies
2. **[ComponentName]** (atom) — no dependencies
3. **[ComponentName]** (molecule) — depends on: Button, Input
...

---

### Next Sprint Suggestion
Top 5 highest priority components:

1. **[ComponentName]** — [reason: blocks X other components / high Figma usage / simple to build]
2. ...

━━ STEP 6 — Output ━━
• Print the full report to stdout
• If an output path was provided, call write_report to save it
• Coverage threshold is ${COVERAGE_THRESHOLD}%
• End with EXIT_CODE:1 if fully-implemented% < ${COVERAGE_THRESHOLD}, EXIT_CODE:0 if at or above`;

async function main(): Promise<void> {
  const { figmaUrl, componentsDir, output } = parseArgs(process.argv);
  const fileKey = parseFigmaFileKey(figmaUrl);
  const componentsDirAbs = resolve(componentsDir);
  const inventory = scanComponents(componentsDirAbs);

  process.stdout.write(
    `Found ${inventory.length} React components in ${componentsDirAbs}\n`
  );

  const client = new Anthropic();
  const messages: Anthropic.MessageParam[] = [
    {
      role: 'user',
      content: `Run a full coverage check with these inputs:

Figma URL: ${figmaUrl}
Figma file key: ${fileKey ?? 'could not parse — inspect URL manually'}
Components directory: ${componentsDirAbs}
React components found: ${inventory.length}
Output path: ${output ? resolve(output) : 'none — console only'}

Begin by fetching the Figma component inventory, then call get_react_inventory.`,
    },
  ];

  let belowThreshold = false;

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
          if (block.text.includes('EXIT_CODE:1')) belowThreshold = true;
        }
      }
      break;
    }

    if (response.stop_reason === 'tool_use') {
      const results: Anthropic.ToolResultBlockParam[] = [];
      for (const block of response.content) {
        if (block.type === 'tool_use') {
          const result = await executeTool(
            block.name,
            block.input as Record<string, unknown>,
            inventory,
            output
          );
          results.push({ type: 'tool_result', tool_use_id: block.id, content: result });
        }
      }
      messages.push({ role: 'user', content: results });
    }
  }

  process.exit(belowThreshold ? 1 : 0);
}

main().catch((err) => {
  process.stderr.write(`Fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
