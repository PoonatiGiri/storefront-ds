import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LineItem } from './LineItem';
import type { LineItemSize } from './LineItem';
import { Button } from '../../atoms/Button/Button';

const meta = {
  title: 'Molecules/LineItem',
  component: LineItem,
  tags: [],
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] satisfies LineItemSize[] },
  },
  decorators: [(Story) => <div className="w-full max-w-xl bg-white border border-neutral-200 rounded-lg p-4"><Story /></div>],
} satisfies Meta<typeof LineItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const demoImage =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="%23E2E8F0"/><path d="M16 48l12-14 8 10 4-6 8 10z" fill="%2394A3B8"/><circle cx="44" cy="22" r="5" fill="%2394A3B8"/></svg>';

export const Default: Story = {
  args: {
    name: 'Linen Tailored Shirt',
    variant: 'Size M / Sand',
    sku: 'LIN-M-SND',
    image: demoImage,
    unitPrice: 79,
    currency: 'USD',
    quantity: 2,
  },
};

export const AllVariants: Story = {
  args: {
    name: 'Placeholder',
    image: demoImage,
    unitPrice: 0,
    currency: 'USD',
    quantity: 1,
  },
  render: () => (
    <div className="divide-y divide-neutral-200">
      <LineItem
        name="Linen Tailored Shirt"
        variant="Size M / Sand"
        image={demoImage}
        unitPrice={79}
        currency="USD"
        quantity={1}
      />
      <LineItem
        name="Premium Leather Belt"
        variant="Brown / 34"
        sku="BLT-34-BR"
        image={demoImage}
        unitPrice={49.5}
        currency="USD"
        quantity={2}
        onRemove={() => {}}
      />
      <LineItem
        name="Wool Crew Sweater"
        variant="Size L / Olive"
        unitPrice={null}
        currency="USD"
        quantity={1}
      />
    </div>
  ),
};

export const AllSizes: Story = {
  args: { name: '', unitPrice: 0, currency: 'USD', quantity: 1 },
  render: () => (
    <div className="flex flex-col gap-6">
      <LineItem size="sm" name="Small line item" image={demoImage} unitPrice={29} currency="USD" quantity={1} />
      <LineItem size="md" name="Medium line item" image={demoImage} unitPrice={29} currency="USD" quantity={1} />
    </div>
  ),
};

export const AllStates: Story = {
  args: { name: '', unitPrice: 0, currency: 'USD', quantity: 1 },
  render: () => {
    function Inner() {
      const [qty, setQty] = useState(2);
      return (
        <div className="divide-y divide-neutral-200">
          <LineItem
            name="Basic single-quantity item"
            image={demoImage}
            unitPrice={29}
            currency="USD"
            quantity={1}
          />
          <LineItem
            name="Multi-quantity (shows line total)"
            image={demoImage}
            unitPrice={49.5}
            currency="USD"
            quantity={3}
          />
          <LineItem
            name="With remove action"
            image={demoImage}
            unitPrice={79}
            currency="USD"
            quantity={1}
            onRemove={() => {}}
          />
          <LineItem
            name="With quantity stepper"
            image={demoImage}
            unitPrice={79}
            currency="USD"
            quantity={qty}
            quantityControl={
              <div className="inline-flex items-center gap-2">
                <Button size="sm" variant="secondary" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                  −
                </Button>
                <span className="text-sm tabular-nums w-6 text-center">{qty}</span>
                <Button size="sm" variant="secondary" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
                  +
                </Button>
              </div>
            }
            onRemove={() => {}}
          />
          <LineItem
            name="Missing price"
            image={demoImage}
            unitPrice={null}
            currency="USD"
            quantity={1}
          />
        </div>
      );
    }
    return <Inner />;
  },
};
