import figma from '@figma/code-connect';
import { OrderCard } from './OrderCard';

figma.connect(OrderCard, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=34-132', {
  props: {
    status: figma.enum('status', {
      pending: 'pending',
      processing: 'processing',
      completed: 'completed',
      failed: 'failed',
      cancelled: 'cancelled',
    }),
  },
  example: ({ status }) => (
    <OrderCard
      status={status}
      orderId="#ORD-1001"
      customerName="Sarah Johnson"
      customerInitials="SJ"
      total="$134.96"
      orderDate="Dec 18, 2024"
      items={[{ name: 'Product', quantity: 1, price: '$134.96' }]}
    />
  ),
});
