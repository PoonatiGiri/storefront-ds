import figma from '@figma/code-connect';
import { PriceDisplay } from './PriceDisplay';

// TODO: replace node-id once the PriceDisplay Figma frame exists.
figma.connect(PriceDisplay, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=0-0', {
  props: {
    size: figma.enum('size', { sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }),
    layout: figma.enum('layout', { inline: 'inline', stacked: 'stacked' }),
    showDiscount: figma.boolean('showDiscount'),
    hasOriginal: figma.boolean('hasOriginal'),
  },
  example: ({ size, layout, showDiscount, hasOriginal }) => (
    <PriceDisplay
      amount={79}
      originalAmount={hasOriginal ? 129 : undefined}
      currency="USD"
      size={size}
      layout={layout}
      showDiscount={showDiscount}
    />
  ),
});
