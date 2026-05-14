import figma from '@figma/code-connect';
import { Checkbox } from './Checkbox';

// TODO: replace node-id once the Checkbox Figma frame exists.
figma.connect(Checkbox, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=0-0', {
  props: {
    size: figma.enum('size', { sm: 'sm', md: 'md' }),
    checked: figma.enum('state', { checked: true }),
    indeterminate: figma.enum('state', { indeterminate: true }),
    disabled: figma.enum('state', { disabled: true }),
    error: figma.enum('state', { error: true }),
    label: figma.string('label'),
  },
  example: ({ size, checked, indeterminate, disabled, error, label }) => (
    <Checkbox
      size={size}
      defaultChecked={checked}
      indeterminate={indeterminate}
      disabled={disabled}
      error={error}
      label={label}
    />
  ),
});
