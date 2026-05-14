import figma from '@figma/code-connect';
import { AmountDisplay } from './AmountDisplay';

// TODO: replace node-id once the AmountDisplay Figma frame exists.
figma.connect(AmountDisplay, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=0-0', {
  props: {
    size: figma.enum('size', { sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }),
    strikethrough: figma.boolean('strikethrough'),
    muted: figma.boolean('muted'),
  },
  example: ({ size, strikethrough, muted }) => (
    <AmountDisplay
      amount={1249.99}
      currency="USD"
      size={size}
      strikethrough={strikethrough}
      muted={muted}
    />
  ),
});
