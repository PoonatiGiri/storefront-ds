import figma from '@figma/code-connect';
import { Skeleton } from './Skeleton';

// TODO: replace node-id once the Skeleton Figma frame exists.
figma.connect(Skeleton, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=0-0', {
  props: {
    shape: figma.enum('shape', {
      rect: 'rect',
      circle: 'circle',
      text: 'text',
    }),
  },
  example: ({ shape }) => <Skeleton shape={shape} width={240} height={16} />,
});
