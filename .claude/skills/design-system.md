# Storefront DS — Design System Skill

## Token Architecture

All tokens live in `src/tokens/`. Token files are split by category — never put all tokens in one file.

### Token file structure

```
src/tokens/
├── colors.ts      # all color tokens
├── typography.ts  # all typography tokens
├── spacing.ts     # all spacing tokens
├── radius.ts      # border radius tokens
├── shadows.ts     # shadow tokens
└── index.ts       # re-exports all tokens
```

### Token naming convention

```
--storefront-[category]-[variant]-[state]
```

Examples:
```css
--storefront-color-primary-default
--storefront-color-primary-hover
--storefront-color-primary-active
--storefront-color-primary-disabled
--storefront-color-error-default
--storefront-space-4
--storefront-radius-md
--storefront-shadow-card
```

### Token governance

- Never create a token without documenting its purpose in a JSDoc comment on the same line
- Never duplicate token values — if two things look identical, they share the same token
- Never add a new token without first checking whether an existing token covers the need
- When a raw value appears 3+ times across different tokens, extract it to a primitive token and reference it

---

## Color Token Rules

Every color must exist as a token — never use raw hex values anywhere in the codebase.

### Token categories

| Category | Tokens |
|---|---|
| **Brand** | `primary`, `secondary`, `accent` |
| **Neutral** | `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900` |
| **Semantic** | `success`, `warning`, `error`, `info` |
| **Surface** | `background`, `foreground`, `border`, `overlay` |
| **Commerce** | `price`, `discount`, `stock`, `rating` |

### Required states per color token

Every color token must define all four states:

```ts
// colors.ts
export const colors = {
  primary: {
    default: 'var(--storefront-color-primary-default)',
    hover:   'var(--storefront-color-primary-hover)',
    active:  'var(--storefront-color-primary-active)',
    disabled:'var(--storefront-color-primary-disabled)',
  },
} as const;
```

### Dark mode

Dark mode tokens must be defined **alongside** light mode tokens from the start — never retrofitted later.

```css
:root {
  --storefront-color-primary-default: #2563eb;
}
[data-theme="dark"] {
  --storefront-color-primary-default: #3b82f6;
}
```

---

## Typography Token Rules

### Scale

Typography must follow a modular scale — never arbitrary sizes. Categories and their tokens:

| Category | Tokens |
|---|---|
| **Display** | `display-lg`, `display-md`, `display-sm` |
| **Heading** | `h1`, `h2`, `h3`, `h4`, `h5`, `h6` |
| **Body** | `body-lg`, `body-md`, `body-sm`, `body-xs` |
| **Label** | `label-lg`, `label-md`, `label-sm` |
| **Code** | `code-lg`, `code-md`, `code-sm` |

### Required properties per token

Every typography token must define all four properties — no partial definitions:

```ts
// typography.ts
export const typography = {
  'body-md': {
    fontSize:      'var(--storefront-typography-body-md-size)',      // e.g. 14px
    lineHeight:    'var(--storefront-typography-body-md-line-height)', // e.g. 1.5
    fontWeight:    'var(--storefront-typography-body-md-weight)',     // e.g. 400
    letterSpacing: 'var(--storefront-typography-body-md-tracking)',   // e.g. 0
  },
} as const;
```

- Never mix tokens across categories — never apply a heading font-size with a body line-height
- Never apply typography styles piecemeal — always apply the full token set for a given scale step

---

## Spacing Token Rules

### Scale

Base unit is **4px**. Only these values are valid:

| Token | Value |
|---|---|
| `--storefront-space-0` | 0px |
| `--storefront-space-1` | 4px |
| `--storefront-space-2` | 8px |
| `--storefront-space-3` | 12px |
| `--storefront-space-4` | 16px |
| `--storefront-space-5` | 20px |
| `--storefront-space-6` | 24px |
| `--storefront-space-8` | 32px |
| `--storefront-space-10` | 40px |
| `--storefront-space-12` | 48px |
| `--storefront-space-16` | 64px |
| `--storefront-space-20` | 80px |
| `--storefront-space-24` | 96px |
| `--storefront-space-32` | 128px |

### Usage guidelines

- Never use spacing values outside this scale
- Component **internal** spacing (padding, internal gap): use `space-1` through `space-6` (4–24px)
- **Layout** spacing (section gaps, page margins): use `space-8` through `space-32` (32–128px)

---

## Component Hierarchy — Atomic Design

Build strictly in order: atoms → molecules → organisms. Never build a molecule before all its atom dependencies exist. Never build an organism before all its molecule dependencies exist.

### Atoms — single purpose, no component dependencies

```
Button          IconButton
Input           Textarea        Select
Checkbox        Radio           Toggle
Badge           Tag             Chip
Avatar          Icon
Divider         Spacer
Skeleton        Spinner
```

### Molecules — combine atoms, single responsibility

```
FormField       (Label + Input + HelperText + ErrorMessage)
SearchBar       (Input + Icon + Button)
Pagination      (IconButton × n + Text)
Breadcrumb      (Link × n + Divider × n)
Tooltip         (trigger + floating content)
Dropdown        (trigger + Menu)
```

### Organisms — complex, combine molecules

```
DataTable       (Toolbar + Table + Pagination)
Sidebar         (Logo + Navigation + UserMenu)
TopBar          (Breadcrumb + Actions + UserMenu)
OrderCard       (Avatar + Details + Status + Actions)
FilterPanel     (FormField × n + Actions)
MetricCard      (Icon + Value + Label + Trend)
```

---

## Commerce / B2B Component Rules

### Status indicators

Every status indicator must use semantic color tokens — never hardcode status colors. The standard status set must be supported by all relevant components:

| Status | Token |
|---|---|
| `pending` | `--storefront-color-warning` |
| `processing` | `--storefront-color-info` |
| `completed` | `--storefront-color-success` |
| `failed` | `--storefront-color-error` |
| `cancelled` | `--storefront-color-neutral` |

No status value may be added to this set without design review.

### Currency and amounts

- Always show the currency symbol and use consistent decimal formatting (`$12,450.00`)
- Always accept a `currency` prop (`'USD'`, `'EUR'`, etc.) — never hardcode a symbol
- Use `Intl.NumberFormat` for formatting — never manual string manipulation
- Handle `null` / `undefined` amounts by displaying `—` (em dash placeholder)

### Data tables

Every `DataTable` organism must support all of:
- Column sorting (ascending / descending / none)
- Column filtering
- Pagination (page size + page number)
- Row selection (single and multi)
- Bulk actions on selected rows

### Action buttons in tables

Action buttons in table rows must always be **icon + label** — never icon alone. Icon-only actions fail accessibility and localization requirements.

### Data component states

Every component that renders external data must implement all three non-success states:

| State | Required implementation |
|---|---|
| `loading` | Skeleton that mirrors the shape of real content — skeleton rows for tables, skeleton cards for grids |
| `empty` | Heading + description explaining why it's empty + at least one action CTA |
| `error` | Clear error message + retry or recovery action |

---

## Component Consistency Rules

### Size scale

All components at the same atomic level must use the identical size scale:

```
xs | sm | md | lg | xl
```

No component may invent its own size labels (`tiny`, `large`, `huge`, etc.).

### Shared scales

All components must draw from the same token scales for:
- Border radius → `--storefront-radius-*`
- Box shadow → `--storefront-shadow-*`
- Z-index → `--storefront-z-*`

### Interactive state standards

These must be implemented identically across every interactive component:

| State | Implementation |
|---|---|
| `hover` | Subtle background change via `hover:` variant |
| `focus` | Visible focus ring using `--storefront-color-primary` via `focus-visible:ring` |
| `active` | Slight scale down: `active:scale-[0.98]` |
| `disabled` | 40% opacity (`disabled:opacity-40`) + `cursor-not-allowed` + `pointer-events-none` |

### Animation

- Durations must use tokens: `fast` (100ms) · `normal` (200ms) · `slow` (300ms)
- All transitions must use the same easing: `ease-in-out`
- No component may introduce a custom duration or easing without adding a token first

```css
--storefront-transition-fast:   100ms ease-in-out;
--storefront-transition-normal: 200ms ease-in-out;
--storefront-transition-slow:   300ms ease-in-out;
```

---

## Design System Governance Rules

### Before building anything new

1. Check the existing component list — can an existing component be extended with a new variant instead?
2. Check the existing token list — does an existing token cover this need?
3. If a visual pattern appears in 3 or more components, extract it to a shared token or utility before the third component is built

### Breaking changes

Breaking changes to existing components are **never** allowed. The process is:

1. Create a new variant or a new component
2. Deprecate the old variant/component with a JSDoc `@deprecated` tag pointing to the replacement
3. Migrate usages in a follow-up — never in the same PR as the new variant

### Documentation requirement

Every component decision must be documented in its story file's MDX or as a JSDoc comment on the component:

- Why it was built this way
- What alternatives were considered and rejected
- Any known limitations or edge cases

```tsx
/**
 * StatusBadge renders order and fulfillment statuses.
 *
 * Decision: uses semantic color tokens rather than Tailwind color utilities
 * so that status colors can be themed without touching component code.
 *
 * Alternative considered: inline color map — rejected because it couples
 * the component to specific hex values and breaks dark mode support.
 */
```

### Overlap review checklist

Before merging any new component, verify:

- [ ] No existing component in `atoms/`, `molecules/`, or `organisms/` serves the same purpose
- [ ] No existing token covers the new token's value
- [ ] All new tokens follow the `--storefront-[category]-[variant]-[state]` naming convention
- [ ] Dark mode variants are defined for all new color tokens
- [ ] The component has been added to the atomic hierarchy list in this skill file
