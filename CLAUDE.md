# Storefront DS — Design System

B2B SaaS / Commerce design system built in React + TypeScript + Tailwind + Storybook.

**Figma source of truth:** https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE

## Active skills

Load and apply all rules from `.claude/skills/frontend.md` and `.claude/skills/design-system.md` for every component and token task.

---

## Mandatory workflow

1. **Fetch Figma context first.** Before writing any component, call `get_design_context` with the relevant node from the Figma file. Never build from memory or assumption.
2. **One component at a time.** Never start a second component while one is in progress.
3. **QA before moving on.** Run the component QA agent after every component is built. Do not proceed to the next component until QA passes.
4. **Token audit every 5 components.** After every 5th component, run the token audit agent to catch drift before it accumulates.

---

## Folder structure

```
src/
├── components/
│   ├── atoms/        # Button, Input, Badge, Icon, Checkbox, Tag, Spinner
│   ├── molecules/    # SearchBar, FormField, StatusBadge, AmountDisplay
│   └── organisms/   # DataTable, Sidebar, OrderCard, ProductList
├── tokens/           # All design tokens (colors, spacing, typography, etc.)
└── stories/          # Storybook stories (mirrors components/ hierarchy)
```

Build in atomic order: **atoms → molecules → organisms**. Never build a molecule before all its atom dependencies exist.

---

## Component rules

### File naming

| File | Convention |
|---|---|
| Component | `ComponentName.tsx` |
| Story | `ComponentName.stories.tsx` |
| Types (if split) | `ComponentName.types.ts` |
| Index | `index.ts` |

### Props interface

Every component must export a typed props interface:

```ts
export interface ComponentNameProps {
  // required props first, optional last
}
```

Interface name must be `ComponentNameProps` — no exceptions.

### Required states

Every interactive component must implement all six states:

| State | Implementation |
|---|---|
| `default` | Base appearance |
| `hover` | `:hover` / `hover:` Tailwind variant |
| `focus` | `:focus-visible` / `focus-visible:` — never `:focus` alone |
| `active` | `:active` / `active:` Tailwind variant |
| `disabled` | `disabled` HTML attr + `disabled:` Tailwind variant + `pointer-events-none` |
| `error` | Prop-driven (`error?: boolean`) with error token colors |

### Commerce-specific states

Data-fetching and list components must additionally implement:

- **Loading skeleton** — use animated placeholder, never a spinner alone for layout components
- **Empty state** — meaningful message + action CTA, never a blank space
- **Status indicators** — must support exactly these values with no additions without review:
  `pending` | `processing` | `completed` `failed` | `cancelled`

### Currency / amount display

- Always use a shared `AmountDisplay` molecule — never format currency inline
- Respect locale and currency code props; never hardcode `$` or any symbol
- Handle `null` / `undefined` amounts gracefully (show `—` placeholder)

### Accessibility

- All interactive components must be fully keyboard accessible
- Use semantic HTML elements before reaching for `role=`
- Every icon-only button needs `aria-label`
- Focus rings must be visible — never `outline-none` without a `focus-visible:ring` replacement

---

## Token rules

### Naming convention

```
--storefront-{category}-{name}
```

Examples:
```css
--storefront-color-primary-600
--storefront-spacing-4
--storefront-typography-body-sm
--storefront-radius-md
--storefront-shadow-card
```

### Categories

| Category | Covers |
|---|---|
| `color` | All color primitives and semantic aliases |
| `spacing` | Padding, margin, gap values |
| `typography` | Font size, line height, weight, family |
| `radius` | Border radius |
| `shadow` | Box shadows |
| `transition` | Duration and easing |
| `z` | Z-index scale |

### Absolute rules

- **Never hardcode a hex value** — always reference a token
- **Never use arbitrary Tailwind values** like `w-[137px]`, `text-[13px]`, `bg-[#3b82f6]`
- **Never mix token naming conventions** within a file or PR
- All tokens live in `src/tokens/` — no inline token definitions in component files

---

## Storybook rules

Every component must have a story file. The story must include:

```ts
// Required exports per component story file:
export default meta;      // Meta with title, component, tags: ['autodocs'], argTypes
export const Default;     // The baseline story
export const AllVariants; // render() showing all variant props side by side
export const AllSizes;    // render() showing all size props (if applicable)
export const AllStates;   // render() showing default, disabled, error, loading
```

- `tags: ['autodocs']` is mandatory on every `meta` — this generates the docs page automatically
- `layout: 'centered'` is the default; use `'fullscreen'` only for organism-level stories
- Use `decorators` when a story needs a specific container width or background context
- Story file lives in the same folder as the component (`atoms/Button/Button.stories.tsx`), not in `src/stories/`

> `src/stories/` is reserved for cross-component and documentation MDX pages only.

---

## What to never do

| Prohibited | Why |
|---|---|
| Hardcode hex values anywhere | Breaks theming; use tokens |
| Use arbitrary Tailwind values (`w-[137px]`) | Bypasses the token system |
| Build a component without its Storybook story | Component is not considered done without it |
| Start a new component before QA passes on the current one | Defects compound |
| Skip the token audit past the 5-component mark | Token drift is hard to refactor later |
| Use `:focus` without `:focus-visible` | Triggers on mouse click; bad UX |
| Format currency inline | Use `AmountDisplay` — consistency across the system |
| Leave an empty state blank | Always provide message + action |
| Mix naming conventions in the same PR | Causes token audit failures |
| Build molecules before their atom dependencies | Breaks the atomic dependency graph |

---

## Definition of done (per component)

- [ ] Figma context fetched before writing any code
- [ ] Props interface exported with correct name (`ComponentNameProps`)
- [ ] All six states implemented (default, hover, focus, active, disabled, error)
- [ ] Commerce states implemented where applicable (skeleton, empty, status)
- [ ] Zero hardcoded colors, spacing, or typography values
- [ ] Storybook story with `Default`, `AllVariants`, `AllSizes`, `AllStates` exports
- [ ] `tags: ['autodocs']` on story meta
- [ ] Keyboard accessible (tab, enter/space, escape where applicable)
- [ ] QA agent run and passed
- [ ] Barrel export added to `index.ts`
- [ ] Token audit run (if this is the 5th component in the batch)
