import figma from '@figma/code-connect';
import { Avatar } from './Avatar';

figma.connect(Avatar, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=16-26', {
  props: {
    type: figma.enum('type', {
      initials: 'initials',
      image: 'image',
    }),
    size: figma.enum('size', {
      xs: 'xs',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
    }),
    showStatus: figma.boolean('ShowStatus'),
  },
  example: ({ type, size, showStatus }) => (
    <Avatar type={type} size={size} showStatus={showStatus} initials="AB" />
  ),
});
