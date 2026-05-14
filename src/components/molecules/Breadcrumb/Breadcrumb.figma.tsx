import figma from '@figma/code-connect';
import { Breadcrumb } from './Breadcrumb';

// TODO: replace node-id once the Breadcrumb Figma frame exists.
figma.connect(Breadcrumb, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=0-0', {
  props: {
    separator: figma.enum('separator', { chevron: 'chevron', slash: 'slash' }),
  },
  example: () => (
    <Breadcrumb
      items={[
        { label: 'Dashboard', href: '#' },
        { label: 'Orders', href: '#' },
        { label: 'Order #1024' },
      ]}
    />
  ),
});
