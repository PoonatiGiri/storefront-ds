import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import type { EmptyStateSize } from './EmptyState';
import { Button } from '../../atoms/Button/Button';

const meta = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] satisfies EmptyStateSize[] },
  },
  decorators: [(Story) => <div className="w-full max-w-2xl border border-neutral-200 rounded-lg bg-white"><Story /></div>],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'No orders yet',
    description: 'When customers place orders, they\'ll show up here.',
    primaryAction: <Button>Create your first order</Button>,
  },
};

export const AllVariants: Story = {
  args: { title: '' },
  render: () => (
    <div className="flex flex-col gap-6">
      <EmptyState
        title="No results found"
        description="Try adjusting your filters or search query."
        secondaryAction={<Button variant="ghost">Clear filters</Button>}
      />
      <EmptyState
        title="Connect a payment provider"
        description="Add a provider to start accepting payments on your storefront."
        primaryAction={<Button>Connect provider</Button>}
        secondaryAction={<Button variant="ghost">Learn more</Button>}
      />
    </div>
  ),
};

export const AllSizes: Story = {
  args: { title: '' },
  render: () => (
    <div className="flex flex-col gap-6">
      <EmptyState size="sm" title="Small empty state" description="For tight spaces like inline panels." />
      <EmptyState size="md" title="Medium empty state" description="The default size for tabs and main panels." />
      <EmptyState size="lg" title="Large empty state" description="Full-page empty states with prominent CTA." primaryAction={<Button>Get started</Button>} />
    </div>
  ),
};

export const AllStates: Story = {
  args: { title: '' },
  render: () => (
    <div className="flex flex-col gap-6">
      <EmptyState title="Title only" />
      <EmptyState title="Title + description" description="Some explanatory text." />
      <EmptyState
        title="With primary action"
        description="Action prompts the user to do something."
        primaryAction={<Button>Create new</Button>}
      />
      <EmptyState
        title="With both actions"
        description="Primary CTA plus a secondary option."
        primaryAction={<Button>Create new</Button>}
        secondaryAction={<Button variant="ghost">Import existing</Button>}
      />
    </div>
  ),
};
