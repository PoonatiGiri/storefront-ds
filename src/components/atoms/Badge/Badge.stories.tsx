import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import type { BadgeType, BadgeSize } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'] satisfies BadgeType[],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'] satisfies BadgeSize[],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Default', type: 'default', size: 'sm' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Badge type="default" label="Default" />
      <Badge type="success" label="Success" />
      <Badge type="warning" label="Warning" />
      <Badge type="error" label="Error" />
      <Badge type="info" label="Info" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['default', 'success', 'warning', 'error', 'info'] satisfies BadgeType[]).map((type) => (
        <div key={type} className="flex gap-3 items-center">
          <span className="w-20 text-sm capitalize text-neutral-500">{type}</span>
          <Badge type={type} size="sm" label={type} />
          <Badge type={type} size="md" label={type} />
        </div>
      ))}
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      {(['default', 'success', 'warning', 'error', 'info'] satisfies BadgeType[]).map((type) => (
        <Badge key={type} type={type} size="md" label={type} />
      ))}
    </div>
  ),
};
