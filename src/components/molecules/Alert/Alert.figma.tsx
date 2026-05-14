import figma from '@figma/code-connect';
import { Alert } from './Alert';

// TODO: replace node-id once the Alert Figma frame exists.
figma.connect(Alert, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=0-0', {
  props: {
    variant: figma.enum('variant', {
      info: 'info',
      success: 'success',
      warning: 'warning',
      error: 'error',
    }),
    title: figma.string('title'),
    body: figma.string('body'),
    dismissible: figma.boolean('dismissible'),
  },
  example: ({ variant, title, body, dismissible }) => (
    <Alert variant={variant} title={title} onDismiss={dismissible ? () => {} : undefined}>
      {body}
    </Alert>
  ),
});
