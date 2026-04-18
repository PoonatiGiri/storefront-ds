import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';

const meta = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Search orders…' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: 320 }}>
      <SearchBar placeholder="Empty state" />
      <SearchBar placeholder="Active (focused)" autoFocus />
      <SearchBar defaultValue="ORD-2024-00142" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <SearchBar placeholder="Search orders…" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: 320 }}>
      <SearchBar placeholder="Empty" />
      <SearchBar defaultValue="ORD-2024-00142" />
    </div>
  ),
};

export const WithValue: Story = {
  args: { defaultValue: 'ORD-2024-00142' },
};
