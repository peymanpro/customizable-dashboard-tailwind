// src/components/dashboard/RecentOrdersTable.tsx
import { Order } from '@/types';
import { Card, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge, Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface RecentOrdersTableProps {
  orders: Order[];
  loading: boolean;
}

const statusColors = {
  completed: 'success',
  pending: 'warning',
  cancelled: 'error',
  processing: 'info',
} as const;

export default function RecentOrdersTable({ orders, loading }: RecentOrdersTableProps) {
  if (loading) {
    return (
      <Card>
        <div className="h-64 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
      </Card>
    );
  }

  if (!orders.length) {
    return (
      <Card className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No orders found</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
        <Button variant="ghost" size="sm">
          View All →
        </Button>
      </div>
      
      <div className="overflow-x-auto -mx-6 px-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="font-medium">
                  ${order.total.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge variant={statusColors[order.status]}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}