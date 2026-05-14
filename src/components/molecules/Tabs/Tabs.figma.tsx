import figma from '@figma/code-connect';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';

// TODO: replace node-id once the Tabs Figma frame exists.
figma.connect(Tabs, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=0-0', {
  props: {
    variant: figma.enum('variant', { line: 'line', pill: 'pill' }),
    size: figma.enum('size', { sm: 'sm', md: 'md' }),
  },
  example: ({ variant, size }) => (
    <Tabs defaultValue="a" variant={variant} size={size}>
      <TabList>
        <Tab value="a">Tab A</Tab>
        <Tab value="b">Tab B</Tab>
      </TabList>
      <TabPanel value="a">Panel A</TabPanel>
      <TabPanel value="b">Panel B</TabPanel>
    </Tabs>
  ),
});
