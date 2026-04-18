import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import type { AvatarSize, AvatarType } from './Avatar';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: [],
  parameters: { layout: 'centered' },
  argTypes: {
    type: {
      control: 'select',
      options: ['initials', 'image'] satisfies AvatarType[],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'] satisfies AvatarSize[],
    },
    showStatus: { control: 'boolean' },
    initials: { control: 'text' },
    src: { control: 'text' },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { type: 'initials', size: 'md', initials: 'JD' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Avatar type="initials" size="md" initials="JD" />
      <Avatar type="image" size="md" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-end">
        {(['xs', 'sm', 'md', 'lg'] satisfies AvatarSize[]).map((size) => (
          <Avatar key={size} type="initials" size={size} initials="JD" />
        ))}
      </div>
      <div className="flex gap-4 items-end">
        {(['xs', 'sm', 'md', 'lg'] satisfies AvatarSize[]).map((size) => (
          <Avatar key={size} type="image" size={size} />
        ))}
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Avatar type="initials" size="md" initials="JD" />
      <Avatar type="initials" size="md" initials="JD" showStatus />
      <Avatar type="image" size="md" />
      <Avatar type="image" size="md" showStatus />
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div className="flex gap-4 items-end">
      {(['xs', 'sm', 'md', 'lg'] satisfies AvatarSize[]).map((size) => (
        <Avatar key={size} type="initials" size={size} initials="AB" showStatus />
      ))}
    </div>
  ),
};
