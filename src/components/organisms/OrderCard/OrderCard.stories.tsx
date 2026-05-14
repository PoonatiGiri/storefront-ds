import type { Meta, StoryObj } from '@storybook/react';
import { OrderCard } from './OrderCard';
import type { OrderStatus } from '../../molecules/StatusBadge';

const meta = {
  title: 'Organisms/OrderCard',
  component: OrderCard,
  tags: [],
  parameters: { layout: 'centered' },
  argTypes: {
    status: { control: 'select', options: ['pending', 'processing', 'completed', 'failed', 'cancelled'] satisfies OrderStatus[] },
  },
} satisfies Meta<typeof OrderCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { status: 'pending' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 items-start">
      {(['pending', 'processing', 'completed', 'failed', 'cancelled'] satisfies OrderStatus[]).map((status) => (
        <OrderCard key={status} status={status} />
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => <OrderCard status="pending" />,
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 items-start">
      <OrderCard status="pending" />
      <OrderCard status="processing" />
      <OrderCard status="completed" />
      <OrderCard status="cancelled" />
    </div>
  ),
};
