import type { Meta, StoryObj } from '@storybook/react';
import { OrderSummary } from './OrderSummary';
import { Button } from '../../atoms/Button/Button';
import { LineItem } from '../../molecules/LineItem/LineItem';

const meta = {
  title: 'Organisms/OrderSummary',
  component: OrderSummary,
  tags: [],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="w-full max-w-md"><Story /></div>],
} satisfies Meta<typeof OrderSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

const demoImage =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="%23E2E8F0"/><path d="M16 48l12-14 8 10 4-6 8 10z" fill="%2394A3B8"/><circle cx="44" cy="22" r="5" fill="%2394A3B8"/></svg>';

export const Default: Story = {
  args: {
    currency: 'USD',
    total: 226.36,
    lines: [
      { label: 'Subtotal', amount: 207.5 },
      { label: 'Shipping', amount: 12 },
      { label: 'Tax', amount: 16.6, muted: true, hint: 'Estimated at checkout' },
      { label: 'Promo (SAVE10)', amount: -9.74, discount: true },
    ],
  },
};

export const AllVariants: Story = {
  args: { currency: 'USD', lines: [], total: 0 },
  render: () => (
    <div className="flex flex-col gap-8">
      <OrderSummary
        currency="USD"
        total={207.5}
        lines={[
          { label: 'Subtotal', amount: 207.5 },
          { label: 'Shipping', amount: 0, hint: 'Free over $200' },
          { label: 'Tax', amount: 0, muted: true, hint: 'Calculated at checkout' },
        ]}
      />
      <OrderSummary
        currency="USD"
        total={226.36}
        lines={[
          { label: 'Subtotal', amount: 207.5 },
          { label: 'Shipping', amount: 12 },
          { label: 'Tax', amount: 16.6 },
          { label: 'Promo (SAVE10)', amount: -9.74, discount: true },
        ]}
        footer={
          <div className="flex flex-col gap-3">
            <Button className="w-full">Place order</Button>
            <p className="text-xs text-neutral-500 text-center">
              Final taxes calculated based on shipping address.
            </p>
          </div>
        }
      />
    </div>
  ),
};

export const AllSizes: Story = {
  args: { currency: 'USD', lines: [], total: 0 },
  render: () => (
    <OrderSummary
      currency="USD"
      total={158}
      lines={[
        { label: 'Subtotal', amount: 158 },
      ]}
    />
  ),
};

export const AllStates: Story = {
  args: { currency: 'USD', lines: [], total: 0 },
  render: () => (
    <div className="flex flex-col gap-8">
      <OrderSummary
        title="Cart summary"
        currency="USD"
        total={226.36}
        lines={[
          { label: 'Subtotal', amount: 207.5 },
          { label: 'Shipping', amount: 12 },
          { label: 'Tax', amount: 16.6 },
          { label: 'Promo (SAVE10)', amount: -9.74, discount: true },
        ]}
      >
        <div className="divide-y divide-neutral-200 -mx-1">
          <LineItem
            size="sm"
            name="Linen Tailored Shirt"
            variant="Size M / Sand"
            image={demoImage}
            unitPrice={79}
            currency="USD"
            quantity={1}
          />
          <LineItem
            size="sm"
            name="Premium Leather Belt"
            variant="Brown / 34"
            image={demoImage}
            unitPrice={64.25}
            currency="USD"
            quantity={2}
          />
        </div>
      </OrderSummary>

      <OrderSummary
        title="Refund preview"
        currency="USD"
        totalLabel="Refund total"
        total={-89.0}
        lines={[
          { label: 'Items refunded', amount: -79 },
          { label: 'Tax refunded', amount: -10, muted: true },
        ]}
      />

      <OrderSummary
        currency="USD"
        total={null}
        lines={[
          { label: 'Subtotal', amount: 207.5 },
          { label: 'Shipping', amount: null, muted: true, hint: 'Calculated after address' },
          { label: 'Tax', amount: null, muted: true, hint: 'Calculated after address' },
        ]}
      />
    </div>
  ),
};
