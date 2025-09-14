import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from '../components/molecules/DataDisplay';

const meta: Meta<typeof Table> = {
  title: 'Molecules/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A responsive table component for displaying tabular data.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicTable: Story = {
  render: () => (
    <Table style={{ maxWidth: '600px' }}>
      <TableCaption>A list of recent transactions</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>2024-01-15</TableCell>
          <TableCell>Grocery Store</TableCell>
          <TableCell className="text-right">-$45.67</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2024-01-14</TableCell>
          <TableCell>Salary Deposit</TableCell>
          <TableCell className="text-right">+$2,500.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2024-01-13</TableCell>
          <TableCell>Electric Bill</TableCell>
          <TableCell className="text-right">-$89.23</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const TableWithFooter: Story = {
  render: () => (
    <Table style={{ maxWidth: '600px' }}>
      <TableCaption>Monthly budget breakdown</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Budgeted</TableHead>
          <TableHead>Spent</TableHead>
          <TableHead>Remaining</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Food</TableCell>
          <TableCell>$600</TableCell>
          <TableCell>$423</TableCell>
          <TableCell>$177</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Transportation</TableCell>
          <TableCell>$300</TableCell>
          <TableCell>$156</TableCell>
          <TableCell>$144</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Entertainment</TableCell>
          <TableCell>$200</TableCell>
          <TableCell>$89</TableCell>
          <TableCell>$111</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>$1,100</TableCell>
          <TableCell>$668</TableCell>
          <TableCell>$432</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const StripedTable: Story = {
  render: () => (
    <Table style={{ maxWidth: '700px' }}>
      <TableCaption>Employee directory</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow style={{ backgroundColor: '#f9fafb' }}>
          <TableCell>Alice Johnson</TableCell>
          <TableCell>Senior Developer</TableCell>
          <TableCell>Engineering</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Smith</TableCell>
          <TableCell>Product Manager</TableCell>
          <TableCell>Product</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow style={{ backgroundColor: '#f9fafb' }}>
          <TableCell>Carol Williams</TableCell>
          <TableCell>Designer</TableCell>
          <TableCell>Design</TableCell>
          <TableCell>On Leave</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>David Brown</TableCell>
          <TableCell>QA Engineer</TableCell>
          <TableCell>Engineering</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
