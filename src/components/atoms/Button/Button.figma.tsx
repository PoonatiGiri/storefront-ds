import figma from '@figma/code-connect';
import { Button } from './Button';

figma.connect(Button, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=13-134', {
  props: {
    variant: figma.enum('variant', {
      primary: 'primary',
      secondary: 'secondary',
      ghost: 'ghost',
      destructive: 'destructive',
    }),
    size: figma.enum('size', {
      sm: 'sm',
      md: 'md',
      lg: 'lg',
    }),
    disabled: figma.enum('state', {
      disabled: true,
    }),
    loading: figma.enum('state', {
      loading: true,
    }),
  },
  example: ({ variant, size, disabled, loading }) => (
    <Button variant={variant} size={size} disabled={disabled} loading={loading}>
      Button
    </Button>
  ),
});
