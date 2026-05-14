import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import type { TooltipPlacement, TooltipSize } from './Tooltip';
import { Button } from '../Button/Button';

const meta = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'] satisfies TooltipPlacement[],
    },
    size: { control: 'select', options: ['sm', 'md'] satisfies TooltipSize[] },
    open: { control: 'boolean' },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const stubChildren = <Button variant="secondary">Trigger</Button>;

export const Default: Story = {
  args: { content: 'Hello, this is a tooltip', placement: 'top', size: 'sm', children: stubChildren },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="secondary">Hover me</Button>
    </Tooltip>
  ),
};

export const AllVariants: Story = {
  args: { content: '', children: stubChildren },
  render: () => (
    <div className="grid grid-cols-2 gap-12 p-12">
      <Tooltip content="Top tooltip" placement="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" placement="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" placement="left">
        <Button variant="secondary">Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" placement="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
    </div>
  ),
};

export const AllSizes: Story = {
  args: { content: '', children: stubChildren },
  render: () => (
    <div className="flex gap-8 p-12">
      <Tooltip content="Small tooltip" size="sm" open>
        <Button variant="secondary">Small</Button>
      </Tooltip>
      <Tooltip content="Medium tooltip with a bit more breathing room" size="md" open>
        <Button variant="secondary">Medium</Button>
      </Tooltip>
    </div>
  ),
};

export const AllStates: Story = {
  args: { content: '', children: stubChildren },
  render: () => (
    <div className="flex gap-8 p-12">
      <Tooltip content="Default (hover/focus)" placement="top">
        <Button variant="secondary">Hover</Button>
      </Tooltip>
      <Tooltip content="Always open" placement="top" open>
        <Button variant="secondary">Open</Button>
      </Tooltip>
      <Tooltip content="Disabled tooltip" placement="top" disabled>
        <Button variant="secondary">Disabled</Button>
      </Tooltip>
    </div>
  ),
};
