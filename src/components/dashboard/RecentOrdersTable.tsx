// src/components/dashboard/RecentOrdersTable.tsx
import { Order } from '@/types';
import { cn } from '@/lib/utils';

interface RecentOrdersTableProps {
  orders: Order[];
  loading: boolean;
}

const statusColors = {
  completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
};

export default function RecentOrdersTable({ orders, loading }: RecentOrdersTableProps) {
  if (loading) {
    return (
      <div className="card">
        <div className="h-64 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No orders found</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
        <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 transition-colors">
          View All →
        </button>
      </div>
      
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Customer</th>
              <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Date</th>
              <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Total</th>
              <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr 
                key={order.id} 
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="py-3 text-sm text-gray-900 dark:text-white">{order.customer}</td>
                <td className="py-3 text-sm text-gray-600 dark:text-gray-400">{order.date}</td>
                <td className="py-3 text-sm font-medium text-gray-900 dark:text-white">
                  ${order.total.toFixed(2)}
                </td>
                <td className="py-3">
                  <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', statusColors[order.status])}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}