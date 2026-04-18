import figma from '@figma/code-connect';
import { DataTable } from './DataTable';

figma.connect(DataTable, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=43-721', {
  props: {
    variant: figma.enum('variant', {
      default: 'default',
      'loading-skeleton': 'loading-skeleton',
      'empty-state': 'empty-state',
      'row-selected': 'row-selected',
      'row-hover': 'row-hover',
    }),
  },
  example: ({ variant }) => (
    <DataTable
      variant={variant}
      rows={[
        {
          id: '1',
          orderId: '#ORD-1001',
          customerName: 'Sarah Johnson',
          customerInitials: 'SJ',
          status: 'completed',
          amount: '$134.96',
          date: 'Dec 18, 2024',
        },
      ]}
    />
  ),
});
