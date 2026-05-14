import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import type { AlertVariant } from './Alert';
import { Button } from '../../atoms/Button/Button';

const meta = {
  title: 'Molecules/Alert',
  component: Alert,
  tags: [],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'] satisfies AlertVariant[],
    },
  },
  decorators: [(Story) => <div className="w-full max-w-xl"><Story /></div>],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Heads up',
    children: 'You have unsaved changes in this order.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Alert variant="info" title="Heads up">A new version is available.</Alert>
      <Alert variant="success" title="Order placed">Your order #1024 was created successfully.</Alert>
      <Alert variant="warning" title="Stock low">Only 3 units left for SKU-001.</Alert>
      <Alert variant="error" title="Payment failed">We couldn't process your card. Please try again.</Alert>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Alert variant="info">Single-line message without a title.</Alert>
      <Alert variant="info" title="With title">Title plus a body of supporting text.</Alert>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Alert variant="info" title="Default">Simple alert.</Alert>
      <Alert variant="warning" title="Dismissible" onDismiss={() => {}}>You can dismiss this banner.</Alert>
      <Alert
        variant="error"
        title="With action"
        action={<Button variant="destructive" size="sm">Retry</Button>}
        onDismiss={() => {}}
      >
        Payment failed — retry or contact support.
      </Alert>
      <Alert variant="success" icon={false} title="No icon">Alert with the icon disabled.</Alert>
    </div>
  ),
};
