import type { Meta, StoryObj } from '@storybook/react';
import { AmountDisplay } from './AmountDisplay';
import type { AmountSize } from './AmountDisplay';

const meta = {
  title: 'Molecules/AmountDisplay',
  component: AmountDisplay,
  tags: [],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] satisfies AmountSize[] },
    strikethrough: { control: 'boolean' },
    showSign: { control: 'boolean' },
    muted: { control: 'boolean' },
    currency: { control: 'text' },
    locale: { control: 'text' },
  },
} satisfies Meta<typeof AmountDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { amount: 1249.99, currency: 'USD', locale: 'en-US', size: 'md' },
};

export const AllVariants: Story = {
  args: { amount: 0, currency: 'USD' },
  render: () => (
    <div className="flex flex-col gap-3">
      <AmountDisplay amount={1249.99} currency="USD" locale="en-US" />
      <AmountDisplay amount={1249.99} currency="EUR" locale="de-DE" />
      <AmountDisplay amount={124999} currency="INR" locale="en-IN" />
      <AmountDisplay amount={1249.99} currency="JPY" locale="ja-JP" />
      <AmountDisplay amount={1249.99} currency="GBP" locale="en-GB" />
    </div>
  ),
};

export const AllSizes: Story = {
  args: { amount: 0, currency: 'USD' },
  render: () => (
    <div className="flex flex-col gap-3 items-start">
      <AmountDisplay amount={1249.99} currency="USD" size="sm" />
      <AmountDisplay amount={1249.99} currency="USD" size="md" />
      <AmountDisplay amount={1249.99} currency="USD" size="lg" />
      <AmountDisplay amount={1249.99} currency="USD" size="xl" />
    </div>
  ),
};

export const AllStates: Story = {
  args: { amount: 0, currency: 'USD' },
  render: () => (
    <div className="flex flex-col gap-3 items-start">
      <AmountDisplay amount={1249.99} currency="USD" />
      <AmountDisplay amount={1249.99} currency="USD" strikethrough />
      <AmountDisplay amount={1249.99} currency="USD" muted />
      <AmountDisplay amount={49} currency="USD" showSign />
      <AmountDisplay amount={-49} currency="USD" showSign />
      <AmountDisplay amount={null} currency="USD" />
      <AmountDisplay amount={null} currency="USD" placeholder="Not available" />
    </div>
  ),
};
