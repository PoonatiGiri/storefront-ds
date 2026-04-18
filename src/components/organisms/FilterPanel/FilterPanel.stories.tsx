import type { Meta, StoryObj } from '@storybook/react';
import { FilterPanel } from './FilterPanel';
import type { FilterPanelVariant } from './FilterPanel';

const meta = {
  title: 'Organisms/FilterPanel',
  component: FilterPanel,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['sidebar-panel', 'modal-panel'] satisfies FilterPanelVariant[] },
  },
} satisfies Meta<typeof FilterPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: 'sidebar-panel' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-8 items-start">
      <FilterPanel variant="sidebar-panel" />
      <FilterPanel variant="modal-panel" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-8 items-start">
      <FilterPanel variant="sidebar-panel" />
      <FilterPanel variant="modal-panel" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex gap-8 items-start">
      <FilterPanel variant="sidebar-panel" />
      <FilterPanel variant="modal-panel" onClose={() => {}} />
    </div>
  ),
};

export const ModalPanel: Story = {
  args: { variant: 'modal-panel' },
};
