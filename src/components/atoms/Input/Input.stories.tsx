import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import type { InputVariant } from './Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  tags: [],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'] satisfies InputVariant[],
    },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Placeholder text',
    variant: 'default',
  },
};

export const Filled: Story = {
  args: {
    variant: 'default',
    defaultValue: 'Input value',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: 280 }}>
      <Input placeholder="Default — empty" variant="default" />
      <Input defaultValue="Default — filled" variant="default" />
      <Input placeholder="Error — empty" variant="error" />
      <Input defaultValue="Error — filled" variant="error" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: 280 }}>
      <Input placeholder="Default" variant="default" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: 280 }}>
      <Input placeholder="Default" variant="default" />
      <Input defaultValue="Filled" variant="default" />
      <Input placeholder="Error" variant="error" />
      <Input defaultValue="Error filled" variant="error" />
      <Input placeholder="Disabled" disabled />
      <Input defaultValue="Disabled filled" disabled />
    </div>
  ),
};
