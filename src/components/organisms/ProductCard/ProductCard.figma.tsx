import figma from '@figma/code-connect';
import { ProductCard } from './ProductCard';

// TODO: replace node-id once the ProductCard Figma frame exists.
figma.connect(ProductCard, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=0-0', {
  props: {
    orientation: figma.enum('orientation', {
      vertical: 'vertical',
      horizontal: 'horizontal',
    }),
    stockStatus: figma.enum('stockStatus', {
      'in-stock': 'in-stock',
      low: 'low',
      'out-of-stock': 'out-of-stock',
    }),
    name: figma.string('name'),
    meta: figma.string('meta'),
    hasOriginal: figma.boolean('hasOriginalPrice'),
  },
  example: ({ orientation, stockStatus, name, meta, hasOriginal }) => (
    <ProductCard
      orientation={orientation}
      stockStatus={stockStatus}
      name={name}
      meta={meta}
      price={79}
      originalPrice={hasOriginal ? 129 : undefined}
      currency="USD"
    />
  ),
});
