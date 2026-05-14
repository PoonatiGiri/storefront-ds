import type { Meta, StoryObj } from '@storybook/react';
import { PriceDisplay } from './PriceDisplay';
import type { PriceDisplayLayout } from './PriceDisplay';
import type { AmountSize } from '../AmountDisplay/AmountDisplay';

const meta = {
  title: 'Molecules/PriceDisplay',
  component: PriceDisplay,
  tags: [],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] satisfies AmountSize[] },
    layout: { control: 'inline-radio', options: ['inline', 'stacked'] satisfies PriceDisplayLayout[] },
    showDiscount: { control: 'boolean' },
  },
} satisfies Meta<typeof PriceDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { amount: 79.0, originalAmount: 129, currency: 'USD', showDiscount: true, size: 'md' },
};

export const AllVariants: Story = {
  args: { amount: 0, currency: 'USD' },
  render: () => (
    <div className="flex flex-col gap-4">
      <PriceDisplay amount={79} currency="USD" />
      <PriceDisplay amount={79} originalAmount={129} currency="USD" />
      <PriceDisplay amount={79} originalAmount={129} currency="USD" showDiscount />
      <PriceDisplay amount={79} originalAmount={129} currency="USD" layout="stacked" showDiscount />
    </div>
  ),
};

export const AllSizes: Story = {
  args: { amount: 0, currency: 'USD' },
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <PriceDisplay amount={79} originalAmount={129} currency="USD" size="sm" showDiscount />
      <PriceDisplay amount={79} originalAmount={129} currency="USD" size="md" showDiscount />
      <PriceDisplay amount={79} originalAmount={129} currency="USD" size="lg" showDiscount />
      <PriceDisplay amount={79} originalAmount={129} currency="USD" size="xl" showDiscount />
    </div>
  ),
};

export const AllStates: Story = {
  args: { amount: 0, currency: 'USD' },
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <PriceDisplay amount={49.5} currency="USD" />
      <PriceDisplay amount={79} originalAmount={129} currency="USD" showDiscount />
      <PriceDisplay amount={null} currency="USD" />
      <PriceDisplay amount={124999} originalAmount={199999} currency="INR" locale="en-IN" showDiscount />
      <PriceDisplay amount={79} originalAmount={129} currency="USD" layout="stacked" showDiscount />
    </div>
  ),
};
