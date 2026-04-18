import figma from '@figma/code-connect';
import { Badge } from './Badge';

figma.connect(Badge, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=14-32', {
  props: {
    type: figma.enum('type', {
      default: 'default',
      success: 'success',
      warning: 'warning',
      error: 'error',
      info: 'info',
    }),
    size: figma.enum('size', {
      sm: 'sm',
      md: 'md',
    }),
    label: figma.string('Label'),
  },
  example: ({ type, size, label }) => (
    <Badge type={type} size={size} label={label} />
  ),
});
