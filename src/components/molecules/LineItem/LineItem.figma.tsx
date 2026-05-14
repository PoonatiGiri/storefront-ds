import figma from '@figma/code-connect';
import { LineItem } from './LineItem';

// TODO: replace node-id once the LineItem Figma frame exists.
figma.connect(LineItem, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=0-0', {
  props: {
    size: figma.enum('size', { sm: 'sm', md: 'md' }),
    name: figma.string('name'),
    variant: figma.string('variant'),
    quantity: figma.string('quantity'),
    showLineTotal: figma.boolean('showLineTotal'),
  },
  example: ({ size, name, variant, quantity, showLineTotal }) => (
    <LineItem
      size={size}
      name={name}
      variant={variant}
      unitPrice={79}
      currency="USD"
      quantity={Number(quantity) || 1}
      showLineTotal={showLineTotal}
    />
  ),
});
