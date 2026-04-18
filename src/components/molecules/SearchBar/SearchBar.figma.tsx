import figma from '@figma/code-connect';
import { SearchBar } from './SearchBar';

figma.connect(SearchBar, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=20-62', {
  props: {
    placeholder: figma.string('SearchQuery'),
  },
  example: ({ placeholder }) => (
    <SearchBar placeholder={placeholder} />
  ),
});
