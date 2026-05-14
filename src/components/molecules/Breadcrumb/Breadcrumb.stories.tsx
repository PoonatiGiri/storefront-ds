import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '#' },
      { label: 'Orders', href: '#' },
      { label: 'Order #1024' },
    ],
  },
};

export const AllVariants: Story = {
  args: { items: [] },
  render: () => (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: 'Home', href: '#' },
          { label: 'Library', href: '#' },
          { label: 'Data', href: '#' },
        ]}
      />
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '#' },
          { label: 'Orders', href: '#' },
          { label: 'Order #1024' },
        ]}
        separator={<span className="text-neutral-400">/</span>}
      />
    </div>
  ),
};

export const AllSizes: Story = {
  args: { items: [] },
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Dashboard', href: '#' },
        { label: 'Catalog', href: '#' },
        { label: 'Products', href: '#' },
        { label: 'SKU-001' },
      ]}
    />
  ),
};

export const AllStates: Story = {
  args: { items: [] },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs text-neutral-500 mb-2">Single item (current page only)</p>
        <Breadcrumb items={[{ label: 'Dashboard' }]} />
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-2">With collapse (maxItems=3)</p>
        <Breadcrumb
          maxItems={3}
          items={[
            { label: 'Root', href: '#' },
            { label: 'Section', href: '#' },
            { label: 'Subsection', href: '#' },
            { label: 'Detail', href: '#' },
            { label: 'Current' },
          ]}
        />
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-2">No links — text-only trail</p>
        <Breadcrumb
          items={[{ label: 'Dashboard' }, { label: 'Orders' }, { label: 'Order #1024' }]}
        />
      </div>
    </div>
  ),
};
