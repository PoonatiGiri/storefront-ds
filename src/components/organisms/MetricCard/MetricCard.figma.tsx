import figma from '@figma/code-connect';
import { MetricCard } from './MetricCard';

figma.connect(MetricCard, 'https://www.figma.com/design/2P3ina6EjiCFUORJtD56hE?node-id=28-92', {
  props: {
    trend: figma.enum('trend', {
      up: 'up',
      neutral: 'neutral',
      down: 'down',
    }),
    size: figma.enum('size', {
      sm: 'sm',
      md: 'md',
      lg: 'lg',
    }),
  },
  example: ({ trend, size }) => (
    <MetricCard
      title="Total Revenue"
      value="$48,295"
      trend={trend}
      trendValue="+12.5%"
      size={size}
    />
  ),
});
