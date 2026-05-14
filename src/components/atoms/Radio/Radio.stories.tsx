import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from './Radio';
import type { RadioSize } from './Radio';

const meta = {
  title: 'Atoms/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] satisfies RadioSize[] },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: 'demo', value: 'a', label: 'Option A', size: 'md' },
};

export const AllVariants: Story = {
  args: { name: 'shipping', value: 'standard' },
  render: () => (
    <RadioGroup name="shipping" defaultValue="standard" label="Shipping speed">
      <Radio value="standard" label="Standard (3–5 days)" helperText="Free" />
      <Radio value="express" label="Express (next day)" helperText="$12" />
      <Radio value="overnight" label="Overnight" helperText="$28" />
    </RadioGroup>
  ),
};

export const AllSizes: Story = {
  args: { name: 'size', value: 'a' },
  render: () => (
    <div className="flex flex-col gap-6">
      <RadioGroup name="size-sm" size="sm" defaultValue="b" label="Small">
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
      </RadioGroup>
      <RadioGroup name="size-md" size="md" defaultValue="b" label="Medium">
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
      </RadioGroup>
    </div>
  ),
};

export const AllStates: Story = {
  args: { name: 'states', value: 'a' },
  render: () => (
    <div className="flex flex-col gap-6">
      <RadioGroup name="states-default" defaultValue="b" label="Default">
        <Radio value="a" label="Unselected" />
        <Radio value="b" label="Selected" />
      </RadioGroup>
      <RadioGroup name="states-disabled" disabled defaultValue="b" label="Disabled">
        <Radio value="a" label="Unselected" />
        <Radio value="b" label="Selected" />
      </RadioGroup>
      <RadioGroup name="states-error" error defaultValue="" label="Error">
        <Radio value="a" label="Pick one to continue" helperText="A choice is required." />
        <Radio value="b" label="Or this one" />
      </RadioGroup>
    </div>
  ),
};
