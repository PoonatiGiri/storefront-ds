import figma from '@figma/code-connect';
import { Pagination } from './Pagination';

figma.connect(Pagination, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=24-42', {
  props: {
    size: figma.enum('size', {
      sm: 'sm',
      md: 'md',
    }),
  },
  example: ({ size }) => (
    <Pagination size={size} currentPage={2} totalPages={10} onPageChange={() => {}} />
  ),
});
