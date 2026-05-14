import figma from '@figma/code-connect';
import { ProgressBar } from './ProgressBar';

// TODO: replace node-id once the ProgressBar Figma frame exists.
figma.connect(ProgressBar, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=0-0', {
  props: {
    variant: figma.enum('variant', {
      brand: 'brand',
      success: 'success',
      warning: 'warning',
      error: 'error',
    }),
    size: figma.enum('size', { sm: 'sm', md: 'md', lg: 'lg' }),
    label: figma.string('label'),
  },
  example: ({ variant, size, label }) => (
    <ProgressBar value={60} variant={variant} size={size} label={label} showValue />
  ),
});
