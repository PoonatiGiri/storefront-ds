import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './StatusBadge';
import type { OrderStatus, StatusBadgeSize } from './StatusBadge';

const meta = {
  title: 'Molecules/StatusBadge',
  component: StatusBadge,
  tags: [],
  parameters: { layout: 'centered' },
  argTypes: {
    status: {
      control: 'select',
      options: [
        'pending',
        'processing',
        'completed',
        'failed',
        'cancelled',
      ] satisfies OrderStatus[],
    },
    size: { control: 'select', options: ['sm', 'md'] satisfies StatusBadgeSize[] },
    hideDot: { control: 'boolean' },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { status: 'processing', size: 'md' },
};

export const AllVariants: Story = {
  args: { status: 'pending' },
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <StatusBadge status="pending" />
      <StatusBadge status="processing" />
      <StatusBadge status="completed" />
      <StatusBadge status="failed" />
      <StatusBadge status="cancelled" />
    </div>
  ),
};

export const AllSizes: Story = {
  args: { status: 'pending' },
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <StatusBadge status="processing" size="sm" />
      <StatusBadge status="processing" size="md" />
    </div>
  ),
};

export const AllStates: Story = {
  args: { status: 'pending' },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3 items-center">
        <span className="w-24 text-sm text-neutral-500">With dot</span>
        <StatusBadge status="pending" />
        <StatusBadge status="processing" />
        <StatusBadge status="completed" />
        <StatusBadge status="failed" />
        <StatusBadge status="cancelled" />
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <span className="w-24 text-sm text-neutral-500">Without dot</span>
        <StatusBadge status="pending" hideDot />
        <StatusBadge status="processing" hideDot />
        <StatusBadge status="completed" hideDot />
        <StatusBadge status="failed" hideDot />
        <StatusBadge status="cancelled" hideDot />
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <span className="w-24 text-sm text-neutral-500">Localized</span>
        <StatusBadge status="pending" label="En attente" />
        <StatusBadge status="completed" label="Terminé" />
      </div>
    </div>
  ),
};
