import figma from '@figma/code-connect';
import { EmptyState } from './EmptyState';

// TODO: replace node-id once the EmptyState Figma frame exists.
figma.connect(EmptyState, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=0-0', {
  props: {
    size: figma.enum('size', { sm: 'sm', md: 'md', lg: 'lg' }),
    title: figma.string('title'),
    description: figma.string('description'),
  },
  example: ({ size, title, description }) => (
    <EmptyState size={size} title={title} description={description} />
  ),
});
