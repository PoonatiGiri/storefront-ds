import figma from '@figma/code-connect';
import { TopBar } from './TopBar';

figma.connect(TopBar, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=36-69', {
  props: {
    variant: figma.enum('variant', {
      default: 'default',
      'with-back-button': 'with-back-button',
    }),
  },
  example: ({ variant }) => (
    <TopBar variant={variant} />
  ),
});
