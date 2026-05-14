import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import type { SkeletonShape } from './Skeleton';

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    shape: {
      control: 'select',
      options: ['rect', 'circle', 'text'] satisfies SkeletonShape[],
    },
    lines: { control: { type: 'number', min: 1, max: 8 } },
    noAnimation: { control: 'boolean' },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { shape: 'rect', width: 240, height: 16 },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-neutral-500">rect</span>
        <Skeleton shape="rect" width="100%" height={48} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-neutral-500">circle</span>
        <Skeleton shape="circle" width={56} height={56} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-neutral-500">text (3 lines)</span>
        <Skeleton shape="text" lines={3} />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-80">
      <Skeleton width="100%" height={8} />
      <Skeleton width="100%" height={12} />
      <Skeleton width="100%" height={16} />
      <Skeleton width="100%" height={24} />
      <Skeleton width="100%" height={48} />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-neutral-500">Card placeholder</span>
        <div className="flex gap-3 p-4 border border-neutral-200 rounded-md">
          <Skeleton shape="circle" width={40} height={40} />
          <div className="flex-1 flex flex-col gap-2">
            <Skeleton shape="text" width="60%" height={14} />
            <Skeleton shape="text" lines={2} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-neutral-500">No animation</span>
        <Skeleton width="100%" height={32} noAnimation />
      </div>
    </div>
  ),
};
