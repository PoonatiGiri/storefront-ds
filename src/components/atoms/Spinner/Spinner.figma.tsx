import figma from '@figma/code-connect';
import { Spinner } from './Spinner';

// TODO: replace node-id once the Spinner Figma frame exists.
figma.connect(Spinner, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=0-0', {
  props: {
    size: figma.enum('size', {
      xs: 'xs',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
    }),
    tone: figma.enum('tone', {
      brand: 'brand',
      neutral: 'neutral',
      inverse: 'inverse',
    }),
  },
  example: ({ size, tone }) => <Spinner size={size} tone={tone} />,
});
