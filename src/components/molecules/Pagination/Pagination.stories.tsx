import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    currentPage: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
    size: { control: 'select', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

function Interactive(props: { size?: 'sm' | 'md'; totalPages?: number }) {
  const [page, setPage] = useState(2);
  return (
    <Pagination
      currentPage={page}
      totalPages={props.totalPages ?? 10}
      onPageChange={setPage}
      size={props.size}
    />
  );
}

export const Default: Story = {
  render: () => <Interactive />,
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-start">
      <Interactive size="sm" />
      <Interactive size="md" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-start">
      <div className="flex flex-col gap-2 items-start">
        <span className="text-label-sm text-[var(--storefront-color-neutral-400)]">sm</span>
        <Interactive size="sm" />
      </div>
      <div className="flex flex-col gap-2 items-start">
        <span className="text-label-sm text-[var(--storefront-color-neutral-400)]">md</span>
        <Interactive size="md" />
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-start">
      <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} size="sm" />
      <Pagination currentPage={5} totalPages={10} onPageChange={() => {}} size="sm" />
      <Pagination currentPage={10} totalPages={10} onPageChange={() => {}} size="sm" />
      <Pagination currentPage={1} totalPages={3} onPageChange={() => {}} size="sm" />
    </div>
  ),
};
