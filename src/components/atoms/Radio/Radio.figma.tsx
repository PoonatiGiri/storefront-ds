import figma from '@figma/code-connect';
import { Radio } from './Radio';

// TODO: replace node-id once the Radio Figma frame exists.
figma.connect(Radio, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=0-0', {
  props: {
    size: figma.enum('size', { sm: 'sm', md: 'md' }),
    checked: figma.enum('state', { checked: true }),
    disabled: figma.enum('state', { disabled: true }),
    error: figma.enum('state', { error: true }),
    label: figma.string('label'),
  },
  example: ({ size, checked, disabled, error, label }) => (
    <Radio
      name="demo"
      value="a"
      size={size}
      defaultChecked={checked}
      disabled={disabled}
      error={error}
      label={label}
    />
  ),
});
