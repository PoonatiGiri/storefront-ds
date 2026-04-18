#!/usr/bin/env tsx
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join, extname } from 'node:path';

const MODEL = 'claude-opus-4-7';
const MAX_TOKENS = 8096;
const DEFAULT_SCOPE = 'src/components';
const DEFAULT_TOKENS = 'src/tokens/index.ts';

function parseArgs(argv: string[]): { scope: string; tokens: string; output?: string } {
  const args = argv.slice(2);
  const get = (flag: string, fallback: string): string => {
    const i = args.indexOf(flag);
    return i !== -1 && args[i + 1] ? args[i + 1]! : fallback;
  };
  const getOpt = (flag: string): string | undefined => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] : undefined;
  };
  return {
    scope: get('--scope', DEFAULT_SCOPE),
    tokens: get('--tokens', DEFAULT_TOKENS),
    output: getOpt('--output'),
  };
}

function collectFiles(dir: string): string[] {
  const absDir = resolve(dir);
  const results: string[] = [];

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
      if (stat.isDirectory()) {
        walk(full);
      } else if (['.tsx', '.ts'].includes(extname(entry)) && !entry.endsWith('.stories.tsx')) {
        results.push(full);
      }
    }
  }

  walk(absDir);
  return results;
}

const TOOLS: Anthropic.Tool[] = [
  {
    name: 'read_file',
    description: 'Read a file from the filesystem.',
    input_schema: {
      type: 'object' as const,
      properties: {
        path: { type: 'string', description: 'Absolute path to the file' },
      },
      required: ['path'],
    },
  },
  {
    name: 'scan_files',
    description:
      'Receive the pre-collected list of component files and their contents for analysis.',
    input_schema: {
      type: 'object' as const,
      properties: {
        confirm: {
          type: 'boolean',
          description: 'Pass true to receive the file manifest.',
        },
      },
      required: ['confirm'],
    },
  },
  {
    name: 'write_report',
    description: 'Write the finished audit report markdown to a file.',
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

function buildFileManifest(files: string[]): string {
  return files
    .map((f) => {
      try {
        return `### ${f}\n\`\`\`tsx\n${readFileSync(f, 'utf-8')}\n\`\`\``;
      } catch {
        return `### ${f}\n[could not read file]`;
      }
    })
    .join('\n\n');
}

async function executeTool(
  name: string,
  input: Record<string, unknown>,
  manifest: string,
  outputPath?: string
): Promise<string> {
  switch (name) {
    case 'read_file': {
      try {
        return readFileSync(resolve(input.path as string), 'utf-8');
      } catch {
        return `Error: could not read ${input.path}`;
      }
    }
    case 'scan_files':
      return manifest;
    case 'write_report': {
      const path = resolve(input.path as string ?? outputPath ?? 'token-audit-report.md');
      writeFileSync(path, input.content as string, 'utf-8');
      return `Report saved to ${path}`;
    }
    default:
      return `Unknown tool: ${name}`;
  }
}

const SYSTEM_PROMPT = `You are the Token Audit Agent for the Storefront DS design system.

Your job: scan component source files and find every place where design values (colors, spacing, typography) are hardcoded instead of using design tokens. Produce a full audit report and a prioritised fix list. You never modify files.

━━ STEP 1 — Load token registry ━━
Call read_file on the tokens file provided. Read every file it imports. Build a complete map:
  token-name → resolved value
Example: --storefront-color-primary-default → #2563eb

━━ STEP 2 — Receive component files ━━
Call scan_files with confirm: true to receive all component source files and their contents.

━━ STEP 3 — Run 6 checks on every file ━━

CHECK 1 — Hardcoded hex colors
• Regex: /#([0-9a-fA-F]{3,6})\\b/g
• Flag every hit: file, line number, hex value
• Cross-reference token registry — if the hex matches a token value, suggest that token as the fix
• Severity: CRITICAL

CHECK 2 — Hardcoded rgb/rgba
• Regex: /rgba?\\s*\\(/g
• Flag every hit: file, line number, full rgb/rgba expression
• Suggest token replacement where hex equivalent is in registry
• Severity: CRITICAL

CHECK 3 — Arbitrary Tailwind values
• Regex: /\\w+-\\[([^\\]]+)\\]/g (matches w-[X], p-[X], text-[X], bg-[#X], etc.)
• Flag every hit: file, line number, full class token
• Suggest: nearest Tailwind scale equivalent for px values, or token for color values
• Severity: CRITICAL for color arb values, MINOR for spacing arb values

CHECK 4 — Inline styles
• Regex: /style=\\{\\{/g
• Flag every hit: file, line number
• Categorise after inspecting the property:
  - Layout property (position, display, flexDirection) → ACCEPTABLE (note only)
  - Color property (color, backgroundColor, borderColor) → CRITICAL violation
  - Spacing property (padding, margin, gap) → CRITICAL violation

CHECK 5 — Magic numbers
• Scan className strings for numeric values not from the Tailwind scale
• Tailwind spacing scale (multiples of 4px): 0,1,2,3,4,5,6,7,8,9,10,11,12,14,16,20,24,28,32,36,40,44,48,52,56,60,64,72,80,96
• Flag any spacing class number not on this list: e.g. p-7 is valid, p-13 is not
• Also flag font sizes and border-radius values that don't match Tailwind's scale
• Severity: MINOR

CHECK 6 — Missing token candidates
• Collect every color value (hex, rgb) used across all files
• Any value appearing in 2+ files without a corresponding token is a missing token candidate
• List the value, which files use it, and a suggested token name following --storefront-[category]-[variant]-[state]

━━ STEP 4 — Cross-file consistency analysis ━━
• Find cases where the same visual intent is implemented with different tokens in different components
• Example: primary button background uses --storefront-color-primary in Button.tsx but bg-blue-600 in OrderCard.tsx
• Flag these as CONSISTENCY VIOLATIONS

━━ STEP 5 — Generate report ━━
Output this exact markdown structure:

## Token Audit Report
**Date:** [ISO 8601 timestamp]
**Scope:** [directory scanned]
**Files scanned:** X
**Total violations:** X

---

### Violation Summary by Type
| Type | Violations | Files affected |
|---|---|---|
| Hardcoded hex colors | X | X |
| Hardcoded rgb/rgba | X | X |
| Arbitrary Tailwind values | X | X |
| Inline style violations | X | X |
| Magic numbers | X | X |
| Token consistency violations | X | X |

---

### Violations by File

#### [relative/path/to/File.tsx]
- **Line X** — [CHECK type] — \`[value found]\` → Fix: \`[token or scale value]\`
(repeat for every violation in this file)

(repeat section for each file with violations)

---

### New Tokens Needed
Values used in multiple files without a token:

| Value | Used in | Suggested token name |
|---|---|---|
| [hex/value] | [file list] | \`--storefront-[category]-[variant]-[state]\` |

---

### Clean Files
Files with zero violations:
- [list]

---

### Fix Priority
1. **Accessibility-affecting color violations** — [list]
2. **Brand color violations** — [list]
3. **Spacing violations** — [list]
4. **Arbitrary value / minor violations** — [list]

━━ STEP 6 — Output ━━
• Print the full report to stdout
• If an output path was provided, call write_report to save it
• End with EXIT_CODE:1 if any violations found, EXIT_CODE:0 if all clean`;

async function main(): Promise<void> {
  const { scope, tokens, output } = parseArgs(process.argv);
  const scopePath = resolve(scope);
  const tokensPath = resolve(tokens);
  const files = collectFiles(scopePath);
  const manifest = buildFileManifest(files);

  process.stdout.write(`Scanning ${files.length} files in ${scopePath}...\n`);

  const client = new Anthropic();
  const messages: Anthropic.MessageParam[] = [
    {
      role: 'user',
      content: `Run a full token audit with these inputs:

Tokens file: ${tokensPath}
Scope directory: ${scopePath}
Files found: ${files.length}
Output path: ${output ? resolve(output) : 'none — console only'}

Begin by loading the token registry, then call scan_files to receive all component source files.`,
    },
  ];

  let hasViolations = false;

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
          if (block.text.includes('EXIT_CODE:1')) hasViolations = true;
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
            manifest,
            output
          );
          results.push({ type: 'tool_result', tool_use_id: block.id, content: result });
        }
      }
      messages.push({ role: 'user', content: results });
    }
  }

  process.exit(hasViolations ? 1 : 0);
}

main().catch((err) => {
  process.stderr.write(`Fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
