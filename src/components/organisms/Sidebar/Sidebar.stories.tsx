import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';
import type { SidebarVariant } from './Sidebar';

const meta = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: { control: 'select', options: ['expanded', 'collapsed'] satisfies SidebarVariant[] },
  },
  decorators: [
    (Story) => (
      <div style={{ height: 600 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: 'expanded', activeKey: 'dashboard' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex h-[600px]">
      <Sidebar variant="expanded" activeKey="orders" />
      <Sidebar variant="collapsed" activeKey="dashboard" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex h-[600px]">
      <Sidebar variant="expanded" />
      <Sidebar variant="collapsed" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex h-[600px]">
      <Sidebar variant="expanded" activeKey="dashboard" />
      <Sidebar variant="collapsed" activeKey="dashboard" />
    </div>
  ),
};

export const Collapsed: Story = {
  args: { variant: 'collapsed', activeKey: 'dashboard' },
};
