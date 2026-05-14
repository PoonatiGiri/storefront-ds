import figma from '@figma/code-connect';
import { Stepper } from './Stepper';

// TODO: replace node-id once the Stepper Figma frame exists.
figma.connect(Stepper, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=0-0', {
  props: {
    orientation: figma.enum('orientation', {
      horizontal: 'horizontal',
      vertical: 'vertical',
    }),
  },
  example: ({ orientation }) => (
    <Stepper
      orientation={orientation}
      currentStep={1}
      steps={[
        { label: 'Cart' },
        { label: 'Shipping' },
        { label: 'Payment' },
        { label: 'Confirm' },
      ]}
    />
  ),
});
