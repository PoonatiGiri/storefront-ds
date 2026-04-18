import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';
import type { DataTableVariant } from './DataTable';

const meta = {
  title: 'Organisms/DataTable',
  component: DataTable,
  tags: [],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'loading-skeleton', 'empty-state', 'row-selected', 'row-hover'] satisfies DataTableVariant[],
    },
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: 'default' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <DataTable variant="default" title="Default" />
      <DataTable variant="loading-skeleton" title="Loading Skeleton" />
      <DataTable variant="empty-state" title="Empty State" />
      <DataTable variant="row-selected" title="Row Selected" />
      <DataTable variant="row-hover" title="Row Hover" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <DataTable variant="default" title="Orders" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <DataTable variant="default" title="Default State" />
      <DataTable variant="loading-skeleton" title="Loading State" />
      <DataTable variant="empty-state" title="Empty State" onNewOrder={() => {}} />
      <DataTable variant="row-selected" title="Selection State" />
      <DataTable variant="row-hover" title="Hover State" />
    </div>
  ),
};

export const LoadingSkeleton: Story = {
  args: { variant: 'loading-skeleton' },
};

export const EmptyState: Story = {
  args: {
    variant: 'empty-state',
    emptyTitle: 'No orders found',
    emptyMessage: "Try adjusting your search or filters to find what you're looking for.",
  },
};

export const RowSelected: Story = {
  args: { variant: 'row-selected' },
};

export const RowHover: Story = {
  args: { variant: 'row-hover' },
};
