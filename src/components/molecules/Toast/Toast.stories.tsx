import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastContainer, ToastProvider, useToast } from './Toast';
import type { ToastVariant, ToastPlacement } from './Toast';
import { Button } from '../../atoms/Button/Button';

const meta = {
  title: 'Molecules/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'] satisfies ToastVariant[],
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'success',
    title: 'Order saved',
    children: 'Your draft order has been saved.',
    onDismiss: () => {},
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Toast variant="info" title="Heads up" onDismiss={() => {}}>Sync starts in 30 seconds.</Toast>
      <Toast variant="success" title="Saved" onDismiss={() => {}}>Order #1024 was saved.</Toast>
      <Toast variant="warning" title="Stock low" onDismiss={() => {}}>Only 3 left of SKU-001.</Toast>
      <Toast variant="error" title="Failed" onDismiss={() => {}}>We couldn't reach the server.</Toast>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Toast variant="info" onDismiss={() => {}}>Compact toast — body only.</Toast>
      <Toast variant="info" title="Title + body" onDismiss={() => {}}>
        A toast with both a title and a longer body of text.
      </Toast>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Toast variant="info" title="Default" onDismiss={() => {}}>Basic toast.</Toast>
      <Toast
        variant="error"
        title="With action"
        action={<Button size="sm" variant="ghost">Retry</Button>}
        onDismiss={() => {}}
      >
        Action plus a dismiss button.
      </Toast>
      <Toast variant="success" title="Without dismiss">Auto-dismisses only.</Toast>
    </div>
  ),
};

const PlaygroundInner = () => {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => toast({ variant: 'success', title: 'Saved', children: 'Order saved successfully.' })}>
        Show success
      </Button>
      <Button
        variant="destructive"
        onClick={() => toast({ variant: 'error', title: 'Failed', children: 'Network error — please retry.' })}
      >
        Show error
      </Button>
      <Button variant="secondary" onClick={() => toast({ variant: 'warning', title: 'Heads up', children: 'Sync may be slow.' })}>
        Show warning
      </Button>
    </div>
  );
};

export const Playground: StoryObj<typeof Toast> = {
  parameters: { docs: { description: { story: 'Live demo with `ToastProvider` + `useToast` hook.' } } },
  render: () => (
    <ToastProvider placement={'top-right' as ToastPlacement}>
      <PlaygroundInner />
    </ToastProvider>
  ),
};

export const ContainerOnly: StoryObj<typeof Toast> = {
  render: () => (
    <div className="relative h-60 w-full bg-neutral-100 rounded-md">
      <ToastContainer placement="top-right">
        <Toast variant="info" title="Top right" onDismiss={() => {}}>Positioned in a container.</Toast>
      </ToastContainer>
    </div>
  ),
};
