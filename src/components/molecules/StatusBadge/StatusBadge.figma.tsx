import figma from '@figma/code-connect';
import { StatusBadge } from './StatusBadge';

// TODO: replace node-id once the StatusBadge Figma frame exists.
figma.connect(StatusBadge, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=0-0', {
  props: {
    status: figma.enum('status', {
      pending: 'pending',
      processing: 'processing',
      completed: 'completed',
      failed: 'failed',
      cancelled: 'cancelled',
    }),
    size: figma.enum('size', { sm: 'sm', md: 'md' }),
  },
  example: ({ status, size }) => <StatusBadge status={status} size={size} />,
});
