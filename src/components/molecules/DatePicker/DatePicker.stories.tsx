import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from './DatePicker';
import type { DateRange, DatePickerSize, DatePickerProps } from './DatePicker';

const meta: Meta<DatePickerProps> = {
  title: 'Molecules/DatePicker',
  component: DatePicker as React.ComponentType<DatePickerProps>,
  tags: [],
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] satisfies DatePickerSize[] },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  decorators: [(Story) => <div className="w-full max-w-sm pb-[420px]"><Story /></div>],
};

export default meta;
type Story = StoryObj<DatePickerProps>;

export const Default: Story = {
  args: { mode: 'single', label: 'Order date', placeholder: 'Pick a date' },
};

export const AllVariants: Story = {
  args: { mode: 'single' },
  render: () => {
    function Inner() {
      const [single, setSingle] = useState<Date | null>(new Date());
      const [range, setRange] = useState<DateRange>({ start: null, end: null });
      return (
        <div className="flex flex-col gap-6">
          <DatePicker
            mode="single"
            label="Single date"
            value={single}
            onChange={setSingle}
          />
          <DatePicker
            mode="range"
            label="Date range"
            value={range}
            onChange={setRange}
          />
        </div>
      );
    }
    return <Inner />;
  },
};

export const AllSizes: Story = {
  args: { mode: 'single' },
  render: () => (
    <div className="flex flex-col gap-4">
      <DatePicker mode="single" size="sm" label="Small" placeholder="Pick a date" />
      <DatePicker mode="single" size="md" label="Medium" placeholder="Pick a date" />
    </div>
  ),
};

export const AllStates: Story = {
  args: { mode: 'single' },
  render: () => (
    <div className="flex flex-col gap-4">
      <DatePicker mode="single" label="Default" placeholder="Pick a date" />
      <DatePicker
        mode="single"
        label="With helper"
        helperText="We'll bill on this day each month."
        placeholder="Pick a date"
      />
      <DatePicker mode="single" label="Error" error helperText="A date is required." placeholder="Pick a date" />
      <DatePicker mode="single" label="Disabled" disabled defaultValue={new Date()} />
      <DatePicker
        mode="single"
        label="With min/max (this month only)"
        minDate={new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
        maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)}
      />
    </div>
  ),
};
