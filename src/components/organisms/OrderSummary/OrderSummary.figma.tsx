import figma from '@figma/code-connect';
import { OrderSummary } from './OrderSummary';

// TODO: replace node-id once the OrderSummary Figma frame exists.
figma.connect(OrderSummary, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=0-0', {
  props: {
    title: figma.string('title'),
    totalLabel: figma.string('totalLabel'),
  },
  example: ({ title, totalLabel }) => (
    <OrderSummary
      title={title}
      totalLabel={totalLabel}
      currency="USD"
      total={207.5}
      lines={[
        { label: 'Subtotal', amount: 199 },
        { label: 'Tax', amount: 8.5 },
      ]}
    />
  ),
});
