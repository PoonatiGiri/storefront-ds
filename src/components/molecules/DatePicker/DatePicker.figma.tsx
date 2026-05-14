import figma from '@figma/code-connect';
import { DatePicker } from './DatePicker';

// TODO: replace node-id once the DatePicker Figma frame exists.
figma.connect(DatePicker, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=0-0', {
  props: {
    mode: figma.enum('mode', { single: 'single', range: 'range' }),
    size: figma.enum('size', { sm: 'sm', md: 'md' }),
    error: figma.boolean('error'),
    disabled: figma.boolean('disabled'),
    label: figma.string('label'),
  },
  example: ({ mode, size, error, disabled, label }) =>
    mode === 'range' ? (
      <DatePicker mode="range" size={size} error={error} disabled={disabled} label={label} />
    ) : (
      <DatePicker mode="single" size={size} error={error} disabled={disabled} label={label} />
    ),
});
