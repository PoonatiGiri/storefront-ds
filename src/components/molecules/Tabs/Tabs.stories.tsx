import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';
import type { TabsVariant, TabsSize } from './Tabs';
import { Badge } from '../../atoms/Badge';

const meta = {
  title: 'Molecules/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['line', 'pill'] satisfies TabsVariant[] },
    size: { control: 'select', options: ['sm', 'md'] satisfies TabsSize[] },
  },
  decorators: [(Story) => <div className="w-full max-w-2xl"><Story /></div>],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: 'orders', variant: 'line', size: 'md', children: null },
  render: (args) => (
    <Tabs {...args}>
      <TabList ariaLabel="Account sections">
        <Tab value="orders">Orders</Tab>
        <Tab value="customers">Customers</Tab>
        <Tab value="products">Products</Tab>
      </TabList>
      <TabPanel value="orders">Orders panel content.</TabPanel>
      <TabPanel value="customers">Customers panel content.</TabPanel>
      <TabPanel value="products">Products panel content.</TabPanel>
    </Tabs>
  ),
};

export const AllVariants: Story = {
  args: { children: null },
  render: () => (
    <div className="flex flex-col gap-8">
      <Tabs defaultValue="a" variant="line">
        <TabList ariaLabel="Line variant">
          <Tab value="a">All</Tab>
          <Tab value="b">Active</Tab>
          <Tab value="c">Archived</Tab>
        </TabList>
        <TabPanel value="a">All items</TabPanel>
        <TabPanel value="b">Active items</TabPanel>
        <TabPanel value="c">Archived items</TabPanel>
      </Tabs>

      <Tabs defaultValue="a" variant="pill">
        <TabList ariaLabel="Pill variant">
          <Tab value="a">All</Tab>
          <Tab value="b">Active</Tab>
          <Tab value="c">Archived</Tab>
        </TabList>
        <TabPanel value="a">All items</TabPanel>
        <TabPanel value="b">Active items</TabPanel>
        <TabPanel value="c">Archived items</TabPanel>
      </Tabs>
    </div>
  ),
};

export const AllSizes: Story = {
  args: { children: null },
  render: () => (
    <div className="flex flex-col gap-8">
      <Tabs defaultValue="a" size="sm">
        <TabList>
          <Tab value="a">Small A</Tab>
          <Tab value="b">Small B</Tab>
        </TabList>
        <TabPanel value="a">Small panel A</TabPanel>
        <TabPanel value="b">Small panel B</TabPanel>
      </Tabs>
      <Tabs defaultValue="a" size="md">
        <TabList>
          <Tab value="a">Medium A</Tab>
          <Tab value="b">Medium B</Tab>
        </TabList>
        <TabPanel value="a">Medium panel A</TabPanel>
        <TabPanel value="b">Medium panel B</TabPanel>
      </Tabs>
    </div>
  ),
};

export const AllStates: Story = {
  args: { children: null },
  render: () => (
    <Tabs defaultValue="orders">
      <TabList>
        <Tab value="orders" badge={<Badge label="12" />}>Orders</Tab>
        <Tab value="customers">Customers</Tab>
        <Tab value="archived" disabled>Archived</Tab>
      </TabList>
      <TabPanel value="orders">Orders panel with badge.</TabPanel>
      <TabPanel value="customers">Customers panel.</TabPanel>
      <TabPanel value="archived">Archived panel.</TabPanel>
    </Tabs>
  ),
};
