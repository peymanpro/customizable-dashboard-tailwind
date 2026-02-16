// src/pages/index.tsx
import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui';
import ThemeCustomizer from '@/components/theme/ThemeCustomizer';
import StatsCard from '@/components/dashboard/StatsCard';
import RecentOrdersTable from '@/components/dashboard/RecentOrdersTable';
import RevenueChart from '@/components/dashboard/RevenueChart';
import { Stat, Order } from '@/types';

export default function Dashboard() {
  const { theme, isDarkMode } = useTheme();
  const [stats, setStats] = useState<Stat[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          fetch('/api/stats'),
          fetch('/api/recent-orders')
        ]);
        
        const statsData = await statsRes.json();
        const ordersData = await ordersRes.json();
        
        setStats(statsData.stats || statsData);
        setOrders(ordersData.orders || ordersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* هدر */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="secondary" size="sm">
              <span className="mr-2">🔔</span>
              Notifications
            </Button>
          </div>
        </div>

        {/* کارت‌های آمار */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading ? (
            // skeleton loading
            [...Array(4)].map((_, i) => (
              <div key={i} className="card h-32 animate-pulse bg-gray-200 dark:bg-gray-700" />
            ))
          ) : (
            stats.map((stat) => (
              <StatsCard key={stat.id} stat={stat} />
            ))
          )}
        </div>

        {/* نمودار و جدول */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div className="lg:col-span-1">
            <div className="card h-full">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="primary" className="w-full">New Report</Button>
                <Button variant="outline" className="w-full">Export Data</Button>
                <Button variant="outline" className="w-full">Settings</Button>
              </div>
            </div>
          </div>
        </div>

        {/* جدول سفارشات اخیر */}
        <RecentOrdersTable orders={orders} loading={loading} />

        {/* فوتر ساده */}
        <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2024 Customizable Dashboard. Built with Next.js and Tailwind CSS.</p>
        </footer>
      </div>

      {/* کامپوننت شخصی‌ساز تم */}
      <ThemeCustomizer />
    </div>
  );
}