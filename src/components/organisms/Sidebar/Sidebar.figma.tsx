import figma from '@figma/code-connect';
import { Sidebar } from './Sidebar';

figma.connect(Sidebar, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=38-129', {
  props: {
    variant: figma.enum('variant', {
      expanded: 'expanded',
      collapsed: 'collapsed',
    }),
  },
  example: ({ variant }) => (
    <Sidebar variant={variant} />
  ),
});
