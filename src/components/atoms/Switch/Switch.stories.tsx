import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import type { SwitchSize } from './Switch';

const meta = {
  title: 'Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] satisfies SwitchSize[] },
    labelPosition: { control: 'inline-radio', options: ['left', 'right'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Email notifications', size: 'md' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch label="Off" />
      <Switch label="On" defaultChecked />
      <Switch label="Helper text" helperText="We'll let you know about new orders." defaultChecked />
      <Switch label="Label on left" labelPosition="left" defaultChecked />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch size="sm" label="Small" defaultChecked />
      <Switch size="md" label="Medium" defaultChecked />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch label="Default off" />
      <Switch label="Default on" defaultChecked />
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
    </div>
  ),
};
