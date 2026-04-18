import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

const OPTIONS = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
  { label: 'Option 4', value: 'option-4' },
];

const meta = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 320, paddingBottom: 200 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

function Interactive(props: { value?: string }) {
  const [value, setValue] = useState(props.value ?? '');
  return (
    <Dropdown
      options={OPTIONS}
      value={value || undefined}
      onChange={setValue}
      placeholder="Select option"
    />
  );
}

export const Default: Story = {
  render: () => <Interactive />,
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8" style={{ paddingBottom: 200 }}>
      <div>
        <p className="text-label-sm text-[var(--storefront-color-neutral-400)] mb-2">Closed</p>
        <Dropdown options={OPTIONS} placeholder="Select option" onChange={() => {}} />
      </div>
      <div>
        <p className="text-label-sm text-[var(--storefront-color-neutral-400)] mb-2">With selection</p>
        <Interactive value="option-2" />
      </div>
      <div>
        <p className="text-label-sm text-[var(--storefront-color-neutral-400)] mb-2">Disabled</p>
        <Dropdown options={OPTIONS} placeholder="Select option" disabled onChange={() => {}} />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => <Interactive />,
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6" style={{ paddingBottom: 200 }}>
      <Interactive />
      <Interactive value="option-2" />
      <Dropdown options={OPTIONS} placeholder="Select option" disabled onChange={() => {}} />
    </div>
  ),
};

export const WithSelection: Story = {
  render: () => <Interactive value="option-2" />,
};

export const Disabled: Story = {
  args: {
    options: OPTIONS,
    placeholder: 'Select option',
    disabled: true,
  },
};
