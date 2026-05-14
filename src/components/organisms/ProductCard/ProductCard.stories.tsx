import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './ProductCard';
import type { ProductCardOrientation, ProductCardStockStatus } from './ProductCard';
import { Button } from '../../atoms/Button/Button';
import { Tag } from '../../atoms/Tag/Tag';

const meta = {
  title: 'Organisms/ProductCard',
  component: ProductCard,
  tags: [],
  parameters: { layout: 'padded' },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['vertical', 'horizontal'] satisfies ProductCardOrientation[],
    },
    stockStatus: {
      control: 'select',
      options: ['in-stock', 'low', 'out-of-stock'] satisfies ProductCardStockStatus[],
    },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const demoImage =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23E2E8F0"/><path d="M80 320l80-100 60 80 40-60 80 80z" fill="%2394A3B8"/><circle cx="280" cy="120" r="36" fill="%2394A3B8"/></svg>';

export const Default: Story = {
  args: {
    name: 'Linen Tailored Shirt',
    meta: 'Apparel',
    image: demoImage,
    price: 79,
    originalPrice: 129,
    currency: 'USD',
    stockStatus: 'in-stock',
    action: <Button size="sm" className="w-full">Add to cart</Button>,
  },
  render: (args) => (
    <div className="w-72">
      <ProductCard {...args} />
    </div>
  ),
};

export const AllVariants: Story = {
  args: { name: '', price: 0, currency: 'USD' },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ProductCard
        name="Vertical card"
        meta="Apparel"
        image={demoImage}
        price={79}
        currency="USD"
        stockStatus="in-stock"
        action={<Button size="sm" className="w-full">Add to cart</Button>}
      />
      <ProductCard
        name="With sale price + badge"
        meta="Apparel"
        image={demoImage}
        price={79}
        originalPrice={129}
        currency="USD"
        badge={<Tag size="sm" variant="brand">New</Tag>}
        stockStatus="low"
        action={<Button size="sm" className="w-full">Add to cart</Button>}
      />
      <ProductCard
        name="Horizontal list style"
        meta="Apparel"
        image={demoImage}
        price={49.5}
        currency="USD"
        orientation="horizontal"
        stockStatus="in-stock"
        action={<Button size="sm">Quick view</Button>}
      />
    </div>
  ),
};

export const AllSizes: Story = {
  args: { name: '', price: 0, currency: 'USD' },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
      <ProductCard
        name="Standard card"
        meta="Apparel"
        image={demoImage}
        price={79}
        currency="USD"
        stockStatus="in-stock"
      />
      <ProductCard
        name="Horizontal compact"
        meta="Apparel"
        image={demoImage}
        price={79}
        currency="USD"
        orientation="horizontal"
      />
    </div>
  ),
};

export const AllStates: Story = {
  args: { name: '', price: 0, currency: 'USD' },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <ProductCard
        name="Default"
        meta="Apparel"
        image={demoImage}
        price={79}
        currency="USD"
        stockStatus="in-stock"
      />
      <ProductCard
        name="On sale"
        meta="Apparel"
        image={demoImage}
        price={59}
        originalPrice={99}
        currency="USD"
        badge={<Tag size="sm" variant="error">−40%</Tag>}
        stockStatus="in-stock"
      />
      <ProductCard
        name="Low stock"
        meta="Apparel"
        image={demoImage}
        price={79}
        currency="USD"
        stockStatus="low"
      />
      <ProductCard
        name="Out of stock"
        meta="Apparel"
        image={demoImage}
        price={79}
        currency="USD"
        stockStatus="out-of-stock"
      />
    </div>
  ),
};
