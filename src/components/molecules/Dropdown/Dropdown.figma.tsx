import figma from '@figma/code-connect';
import { Dropdown } from './Dropdown';

figma.connect(Dropdown, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=25-89', {
  props: {
    state: figma.enum('state', {
      closed: 'closed',
      open: 'open',
      'item-hovered': 'item-hovered',
      'item-selected': 'item-selected',
    }),
  },
  example: () => (
    <Dropdown
      placeholder="Select an option"
      options={[
        { value: 'option-1', label: 'Option 1' },
        { value: 'option-2', label: 'Option 2' },
        { value: 'option-3', label: 'Option 3' },
      ]}
    />
  ),
});
