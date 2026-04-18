import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email address',
    placeholder: 'Placeholder text',
    helperText: 'We will never share your email.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8" style={{ width: 320 }}>
      <FormField
        label="Default"
        placeholder="Placeholder text"
        helperText="We will never share your email."
      />
      <FormField
        label="Focused"
        placeholder="Placeholder text"
        helperText="We will never share your email."
        autoFocus
      />
      <FormField
        label="Error"
        defaultValue="Placeholder text"
        errorMessage="This field is required."
      />
      <FormField
        label="Disabled"
        placeholder="Placeholder text"
        helperText="We will never share your email."
        disabled
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <FormField
        label="Email address"
        placeholder="Placeholder text"
        helperText="Standard size — no size variants for FormField."
      />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-8" style={{ width: 320 }}>
      <FormField
        label="Default"
        placeholder="Placeholder text"
        helperText="Helper text goes here."
      />
      <FormField
        label="Error"
        defaultValue="Invalid value"
        errorMessage="This field is required."
      />
      <FormField
        label="Disabled"
        placeholder="Placeholder text"
        helperText="Helper text goes here."
        disabled
      />
      <FormField
        label="Required"
        placeholder="Placeholder text"
        required
        helperText="This field is required."
      />
    </div>
  ),
};

export const WithRequired: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    required: true,
    helperText: 'We will never share your email.',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Email address',
    defaultValue: 'not-an-email',
    errorMessage: 'Please enter a valid email address.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email address',
    placeholder: 'Placeholder text',
    helperText: 'We will never share your email.',
    disabled: true,
  },
};
