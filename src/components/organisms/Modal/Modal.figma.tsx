import figma from '@figma/code-connect';
import { Modal } from './Modal';

// TODO: replace node-id once the Modal Figma frame exists.
figma.connect(Modal, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=0-0', {
  props: {
    size: figma.enum('size', { sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }),
    title: figma.string('title'),
  },
  example: ({ size, title }) => (
    <Modal open size={size} onClose={() => {}} title={title}>
      Modal body content.
    </Modal>
  ),
});
