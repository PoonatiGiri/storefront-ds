import figma from '@figma/code-connect';
import { FormField } from './FormField';

figma.connect(FormField, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=20-37', {
  props: {
    label: figma.string('FieldLabel'),
    helperText: figma.string('HelperText'),
    required: figma.boolean('Required'),
    disabled: figma.enum('state', {
      disabled: true,
    }),
  },
  example: ({ label, helperText, required, disabled }) => (
    <FormField
      label={label}
      helperText={helperText}
      required={required}
      disabled={disabled}
      placeholder="Enter value…"
    />
  ),
});
