import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import type { ButtonVariant, ButtonSize } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive'] satisfies ButtonVariant[],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies ButtonSize[],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(['primary', 'secondary', 'ghost', 'destructive'] satisfies ButtonVariant[]).map(
        (variant) => (
          <div key={variant} className="flex flex-wrap gap-4 items-center">
            <span className="w-28 text-sm capitalize text-neutral-500">{variant}</span>
            <Button variant={variant}>Default</Button>
            <Button variant={variant} disabled>Disabled</Button>
            <Button variant={variant} loading>Loading</Button>
          </div>
        ),
      )}
    </div>
  ),
};

export const Loading: Story = {
  args: {
    children: 'Saving…',
    loading: true,
    variant: 'primary',
    size: 'md',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Unavailable',
    disabled: true,
    variant: 'primary',
    size: 'md',
  },
};
