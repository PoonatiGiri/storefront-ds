import figma from '@figma/code-connect';
import { FilterPanel } from './FilterPanel';

figma.connect(FilterPanel, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=40-167', {
  props: {
    variant: figma.enum('variant', {
      'sidebar-panel': 'sidebar-panel',
      'modal-panel': 'modal-panel',
    }),
  },
  example: ({ variant }) => (
    <FilterPanel variant={variant} />
  ),
});
