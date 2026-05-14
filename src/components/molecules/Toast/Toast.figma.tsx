import figma from '@figma/code-connect';
import { Toast } from './Toast';

// TODO: replace node-id once the Toast Figma frame exists.
figma.connect(Toast, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=0-0', {
  props: {
    variant: figma.enum('variant', {
      info: 'info',
      success: 'success',
      warning: 'warning',
      error: 'error',
    }),
    title: figma.string('title'),
    body: figma.string('body'),
  },
  example: ({ variant, title, body }) => (
    <Toast variant={variant} title={title} onDismiss={() => {}}>
      {body}
    </Toast>
  ),
});
