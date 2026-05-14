import figma from '@figma/code-connect';
import { Switch } from './Switch';

// TODO: replace node-id once the Switch Figma frame exists.
figma.connect(Switch, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=0-0', {
  props: {
    size: figma.enum('size', { sm: 'sm', md: 'md' }),
    checked: figma.enum('state', { on: true, off: false }),
    disabled: figma.enum('state', { disabled: true }),
    label: figma.string('label'),
  },
  example: ({ size, checked, disabled, label }) => (
    <Switch size={size} defaultChecked={checked} disabled={disabled} label={label} />
  ),
});
