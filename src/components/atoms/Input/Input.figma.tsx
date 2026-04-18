import figma from '@figma/code-connect';
import { Input } from './Input';

figma.connect(Input, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=15-35', {
  props: {
    variant: figma.enum('variant', {
      default: 'default',
      error: 'error',
    }),
    disabled: figma.enum('variant', {
      disabled: true,
    }),
    placeholder: figma.string('Value'),
  },
  example: ({ variant, disabled, placeholder }) => (
    <Input variant={variant} disabled={disabled} placeholder={placeholder} />
  ),
});
