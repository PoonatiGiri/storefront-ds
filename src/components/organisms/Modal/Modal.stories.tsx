import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import type { ModalSize } from './Modal';
import { Button } from '../../atoms/Button/Button';

const meta = {
  title: 'Organisms/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] satisfies ModalSize[] },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo({
  size = 'md',
  withFooter = true,
  description,
}: {
  size?: ModalSize;
  withFooter?: boolean;
  description?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Open modal ({size})</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size={size}
        title="Confirm action"
        description={description}
        footer={
          withFooter && (
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
            </>
          )
        }
      >
        <p>
          Are you sure you want to proceed? This action will update the order and notify the customer.
        </p>
      </Modal>
    </div>
  );
}

const stubArgs = { open: false, onClose: () => {} };

export const Default: Story = {
  args: stubArgs,
  render: () => <Demo description="Review the changes before continuing." />,
};

export const AllVariants: Story = {
  args: stubArgs,
  render: () => (
    <div className="flex flex-wrap gap-3 p-8">
      <Demo size="sm" />
      <Demo size="md" />
      <Demo size="lg" />
      <Demo size="xl" />
    </div>
  ),
};

export const AllSizes: Story = {
  args: stubArgs,
  render: () => (
    <div className="flex flex-wrap gap-3 p-8">
      <Demo size="sm" />
      <Demo size="md" />
      <Demo size="lg" />
      <Demo size="xl" />
    </div>
  ),
};

export const AllStates: Story = {
  args: stubArgs,
  render: () => {
    function Variants() {
      const [withFooter, setWithFooter] = useState(true);
      const [open, setOpen] = useState(false);
      return (
        <div className="flex flex-wrap gap-3 p-8">
          <Button onClick={() => { setWithFooter(true); setOpen(true); }}>With footer</Button>
          <Button variant="secondary" onClick={() => { setWithFooter(false); setOpen(true); }}>Without footer</Button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="Modal demo"
            description={withFooter ? 'Footer actions are shown below.' : 'No footer — close via the X or Esc.'}
            footer={
              withFooter && (
                <>
                  <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={() => setOpen(false)}>Save</Button>
                </>
              )
            }
          >
            Body content goes here.
          </Modal>
        </div>
      );
    }
    return <Variants />;
  },
};
