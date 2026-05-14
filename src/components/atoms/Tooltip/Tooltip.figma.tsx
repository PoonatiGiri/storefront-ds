import figma from '@figma/code-connect';
import { Tooltip } from './Tooltip';

// TODO: replace node-id once the Tooltip Figma frame exists.
figma.connect(Tooltip, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=0-0', {
  props: {
    placement: figma.enum('placement', {
      top: 'top',
      bottom: 'bottom',
      left: 'left',
      right: 'right',
    }),
    size: figma.enum('size', { sm: 'sm', md: 'md' }),
    content: figma.string('content'),
  },
  example: ({ placement, size, content }) => (
    <Tooltip placement={placement} size={size} content={content} open>
      <button>Trigger</button>
    </Tooltip>
  ),
});
