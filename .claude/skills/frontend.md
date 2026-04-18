# Storefront DS — Frontend Skill

## Component Architecture

- Every component must be a pure functional component using React hooks
- Never use class components
- Every component must have a named export AND a default export
- Every component must have a co-located TypeScript props interface named `ComponentNameProps`
- Props interfaces must document every prop with a JSDoc comment explaining what it does
- Always destructure props in the function signature
- Never use `React.FC` type — use explicit return type `React.ReactNode` instead
- Keep components under 200 lines — if longer, split into sub-components
- Extract repeated JSX patterns into sub-components immediately
- Never put business logic inside components — keep components purely presentational

### Component template

```tsx
import { forwardRef } from 'react';

/** JSDoc describing what this component does */
export interface ComponentNameProps {
  /** Description of this prop */
  variant?: 'primary' | 'secondary';
  /** Description of this prop */
  disabled?: boolean;
}

export function ComponentName({
  variant = 'primary',
  disabled = false,
}: ComponentNameProps): React.ReactNode {
  // ...
}

export default ComponentName;
```

---

## TypeScript Rules

- Strict TypeScript only — never use `any` under any circumstance
- Always type event handlers explicitly: `React.MouseEvent<HTMLButtonElement>`, `React.ChangeEvent<HTMLInputElement>`, etc.
- Always type refs explicitly: `React.RefObject<HTMLButtonElement>` — never bare `useRef()`
- Use union types for variant props: `variant: 'primary' | 'secondary' | 'ghost'`
- Use `Record<K, V>` for objects with known keys
- Export all TypeScript interfaces — never keep them private to the file
- Use optional chaining (`?.`) and nullish coalescing (`??`) — never use `&&` for null/undefined rendering guards
- Always handle `undefined` and `null` cases explicitly — never assume a value exists

### Event handler typing examples

```ts
const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => { ... };
const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => { ... };
const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>): void => { ... };
```

### Ref typing examples

```ts
const ref = useRef<HTMLButtonElement>(null);          // ✓
const ref = useRef<HTMLInputElement>(null);           // ✓
const ref = useRef();                                  // ✗ — missing generic
```

---

## Tailwind Rules

- Never use arbitrary values: no `w-[137px]`, `text-[13px]`, `mt-[22px]`, `bg-[#3b82f6]`
- Always use Tailwind's design scale — spacing, typography, and colors from the predefined scale only
- Use CSS custom properties (tokens) for brand colors — never Tailwind color utilities for brand colors (e.g. `text-blue-600` is only acceptable for utility colors, not brand primaries)
- Group Tailwind classes in this order:

  ```
  layout (flex, grid, block) →
  spacing (p-, m-, gap-) →
  sizing (w-, h-, min-, max-) →
  typography (text-, font-, leading-) →
  colors (text-, bg-, border-colors) →
  borders (border, rounded) →
  effects (shadow, opacity, ring) →
  states (hover:, focus-visible:, active:, disabled:)
  ```

- Always declare `hover:`, `focus-visible:`, `active:`, `disabled:` variants explicitly — never rely on browser defaults
- Use `focus-visible:` instead of `focus:` for keyboard accessibility (never suppress focus rings without a `focus-visible:ring` replacement)
- Never mix inline `style={}` with Tailwind on the same element — pick one approach per component
- Use `clsx` or array-join pattern to conditionally apply classes — never string interpolation with template literals for class names

---

## State Management

- Use `useState` for local UI state only (open/closed, active tab, etc.)
- Never put API calls, data fetching, or mutations inside components — accept data as props
- Always handle all four states explicitly in data-driven components:

  | State | Required treatment |
  |---|---|
  | `loading` | Skeleton layout — never a spinner alone for layout components |
  | `error` | Clear error message + recovery action (retry button or link) |
  | `empty` | Meaningful message describing why it's empty + action CTA |
  | `success` | The normal rendered state |

- Loading state must mirror the shape of the real content (skeleton rows for a table, skeleton cards for a card grid)
- Empty state must never be blank — always include a heading, description, and at least one action

---

## Accessibility

- Every interactive element must have an `aria-label` or a visible associated label
- Every `<img>` must have meaningful `alt` text — empty `alt=""` only for decorative images
- Never use `<div>` or `<span>` for clickable elements — use `<button>` or `<a>`
- Always manage focus explicitly for modals and drawers: trap focus while open, restore focus to trigger on close
- Color alone must never convey meaning — always pair color with an icon or text label
- Every form `<input>` must have an associated `<label>` element (not just placeholder)
- Keyboard navigation must work for all interactive components:
  - Tab / Shift+Tab to move between elements
  - Enter / Space to activate buttons
  - Escape to close modals, dropdowns, drawers
  - Arrow keys for listbox / menu navigation

---

## File Structure

Each component lives in its own folder with exactly these files:

```
ComponentName/
├── ComponentName.tsx         # component only — no styles, no tests, no stories
├── ComponentName.stories.tsx # all Storybook stories
├── ComponentName.test.tsx    # unit tests
└── index.ts                  # barrel export only
```

- Never put multiple components in one file
- `index.ts` contains only re-exports — no logic, no JSX

```ts
// index.ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
export default ComponentName;
```

---

## Storybook Story Rules

Every component must export these stories at minimum:

| Story export | What it shows |
|---|---|
| `Default` | Base/default state with sensible args |
| `AllVariants` | All `variant` prop values side by side in one `render()` |
| `AllSizes` | All `size` prop values in one `render()` (skip if no size prop) |
| `Disabled` | `disabled` prop applied |
| `Loading` | Loading/skeleton state |
| `Empty` | Empty state — required for any data or list component |
| `Error` | Error state with message visible |

### Story file conventions

- `tags: ['autodocs']` is mandatory on every `meta` object
- Every story must have `args` defined — never rely on component defaults alone in stories
- Use `argTypes` to document and constrain all controllable props
- Use `layout: 'centered'` by default; use `'fullscreen'` only for organism-level stories
- Use `decorators` to provide required context (e.g. fixed container width, theme wrapper)
- Never use hardcoded placeholder data — use realistic B2B/commerce data:
  - Order IDs: `ORD-2024-00142` format
  - Amounts: realistic invoice values with currency codes (`$12,450.00 USD`)
  - Status values: `pending` | `processing` | `completed` | `failed` | `cancelled`
  - Company names: realistic B2B company names, not `Foo Corp` or `Test Inc`

### Story template

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentName } from './ComponentName';

const meta = {
  title: 'Atoms/ComponentName', // or Molecules/ or Organisms/
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary'] },
  },
  args: {
    // realistic defaults
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {/* all variants */}
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true } };
export const Empty: Story = { args: { items: [] } };
export const Error: Story = { args: { error: 'Failed to load orders. Please retry.' } };
```

---

## Code Quality

- No `console.log` statements — ever. Use proper error boundaries and logging utilities
- No commented-out code — delete it; git history preserves it
- No `// TODO` comments — either implement it now or create a tracked task
- Every function must have a single responsibility — if you need "and" to describe it, split it
- Extract magic numbers into named constants at the top of the file:

  ```ts
  const MAX_VISIBLE_ITEMS = 5;
  const DEBOUNCE_MS = 300;
  ```

- Always use early returns to reduce nesting:

  ```tsx
  // ✓
  if (!items.length) return <EmptyState />;
  if (loading) return <Skeleton />;
  return <List items={items} />;

  // ✗
  return loading ? <Spinner /> : items.length ? <List /> : <EmptyState />;
  ```

- Maximum 3 levels of JSX nesting — if deeper, extract into a named sub-component
- Order code within a component file top-to-bottom:
  1. Imports
  2. Constants
  3. Types / interfaces
  4. Sub-components (if any)
  5. Main component function
  6. Default export
