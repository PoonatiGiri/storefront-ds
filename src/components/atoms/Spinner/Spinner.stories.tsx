import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';
import type { SpinnerSize, SpinnerTone } from './Spinner';

const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  tags: [],
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'] satisfies SpinnerSize[],
    },
    tone: {
      control: 'select',
      options: ['brand', 'neutral', 'inverse'] satisfies SpinnerTone[],
    },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { size: 'md', tone: 'brand', label: 'Loading' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 items-center">
      <div className="flex items-center gap-3">
        <Spinner tone="brand" />
        <span className="text-sm text-neutral-600">brand</span>
      </div>
      <div className="flex items-center gap-3">
        <Spinner tone="neutral" />
        <span className="text-sm text-neutral-600">neutral</span>
      </div>
      <div className="flex items-center gap-3 bg-neutral-900 px-4 py-3 rounded-md">
        <Spinner tone="inverse" />
        <span className="text-sm text-white">inverse</span>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 items-center">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(['brand', 'neutral'] satisfies SpinnerTone[]).map((tone) => (
        <div key={tone} className="flex flex-wrap gap-6 items-center">
          <span className="w-24 text-sm capitalize text-neutral-500">{tone}</span>
          <Spinner tone={tone} size="xs" />
          <Spinner tone={tone} size="sm" />
          <Spinner tone={tone} size="md" />
          <Spinner tone={tone} size="lg" />
        </div>
      ))}
    </div>
  ),
};
