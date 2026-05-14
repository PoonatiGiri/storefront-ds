import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';
import type { TagVariant, TagSize } from './Tag';

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'brand', 'success', 'warning', 'error', 'info'] satisfies TagVariant[],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'] satisfies TagSize[],
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Label', variant: 'neutral', size: 'md' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Tag variant="neutral">Neutral</Tag>
      <Tag variant="brand">Brand</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="error">Error</Tag>
      <Tag variant="info">Info</Tag>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['neutral', 'brand', 'success', 'warning', 'error', 'info'] satisfies TagVariant[]).map(
        (variant) => (
          <div key={variant} className="flex flex-wrap gap-3 items-center">
            <span className="w-20 text-sm capitalize text-neutral-500">{variant}</span>
            <Tag variant={variant}>Default</Tag>
            <Tag variant={variant} onRemove={() => {}}>Removable</Tag>
          </div>
        ),
      )}
    </div>
  ),
};
