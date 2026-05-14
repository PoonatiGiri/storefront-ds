import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';
import type { ProgressBarVariant, ProgressBarSize } from './ProgressBar';

const meta = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  tags: [],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['brand', 'success', 'warning', 'error'] satisfies ProgressBarVariant[],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] satisfies ProgressBarSize[] },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    showValue: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 62, label: 'Uploading…', showValue: true, variant: 'brand', size: 'md' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ProgressBar value={62} variant="brand" label="Brand" showValue />
      <ProgressBar value={88} variant="success" label="Success" showValue />
      <ProgressBar value={45} variant="warning" label="Warning" showValue />
      <ProgressBar value={12} variant="error" label="Error" showValue />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ProgressBar value={60} size="sm" label="Small" />
      <ProgressBar value={60} size="md" label="Medium" />
      <ProgressBar value={60} size="lg" label="Large" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ProgressBar value={0} label="Empty" showValue />
      <ProgressBar value={40} label="In progress" showValue />
      <ProgressBar value={100} variant="success" label="Complete" showValue />
      <ProgressBar label="Indeterminate" ariaLabel="Processing" />
    </div>
  ),
};
