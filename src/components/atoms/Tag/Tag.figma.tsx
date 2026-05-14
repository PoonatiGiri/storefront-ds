import figma from '@figma/code-connect';
import { Tag } from './Tag';

// TODO: replace node-id once the Tag Figma frame exists.
figma.connect(Tag, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=0-0', {
  props: {
    variant: figma.enum('variant', {
      neutral: 'neutral',
      brand: 'brand',
      success: 'success',
      warning: 'warning',
      error: 'error',
      info: 'info',
    }),
    size: figma.enum('size', { sm: 'sm', md: 'md' }),
  },
  example: ({ variant, size }) => (
    <Tag variant={variant} size={size}>
      Label
    </Tag>
  ),
});
