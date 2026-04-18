import type { Meta, StoryObj } from '@storybook/react';
import { TopBar } from './TopBar';
import type { TopBarVariant } from './TopBar';

const meta = {
  title: 'Organisms/TopBar',
  component: TopBar,
  tags: [],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'with-back-button'] satisfies TopBarVariant[] },
  },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: 'default' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TopBar variant="default" />
      <TopBar variant="with-back-button" pageTitle="Customers" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => <TopBar variant="default" />,
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TopBar variant="default" notificationCount={0} />
      <TopBar variant="default" notificationCount={5} />
      <TopBar variant="with-back-button" pageTitle="Order #ORD-2024-0891" />
    </div>
  ),
};

export const WithBackButton: Story = {
  args: { variant: 'with-back-button', pageTitle: 'Customers' },
};
