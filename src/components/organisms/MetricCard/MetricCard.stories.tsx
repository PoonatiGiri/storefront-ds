import type { Meta, StoryObj } from '@storybook/react';
import { MetricCard } from './MetricCard';
import type { MetricTrend, MetricSize } from './MetricCard';

const meta = {
  title: 'Organisms/MetricCard',
  component: MetricCard,
  tags: [],
  parameters: { layout: 'centered' },
  argTypes: {
    trend: { control: 'select', options: ['up', 'neutral', 'down'] satisfies MetricTrend[] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] satisfies MetricSize[] },
  },
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Total Revenue',
    value: '$24,530',
    trend: 'up',
    trendValue: '12.5%',
    period: 'vs last month',
    size: 'sm',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 items-start">
      {(['up', 'neutral', 'down'] satisfies MetricTrend[]).map((trend) => (
        <MetricCard
          key={trend}
          title="Total Revenue"
          value="$24,530"
          trend={trend}
          trendValue={trend === 'up' ? '12.5%' : trend === 'down' ? '3.2%' : '0.0%'}
          period="vs last month"
          size="md"
        />
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 items-start">
      {(['sm', 'md', 'lg'] satisfies MetricSize[]).map((size) => (
        <MetricCard
          key={size}
          title="Total Revenue"
          value="$24,530"
          trend="up"
          trendValue="12.5%"
          period="vs last month"
          size={size}
        />
      ))}
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 items-start">
      {(['sm', 'md', 'lg'] satisfies MetricSize[]).flatMap((size) =>
        (['up', 'neutral', 'down'] satisfies MetricTrend[]).map((trend) => (
          <MetricCard
            key={`${size}-${trend}`}
            title="Total Revenue"
            value="$24,530"
            trend={trend}
            trendValue={trend === 'up' ? '12.5%' : trend === 'down' ? '3.2%' : '0.0%'}
            period="vs last month"
            size={size}
          />
        )),
      )}
    </div>
  ),
};
