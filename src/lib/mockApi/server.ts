// src/lib/mockApi/server.ts
import { createServer, Model, Factory, Response } from 'miragejs';
import { Stat, Order } from '@/types';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      stat: Model.extend<Partial<Stat>>({}),
      order: Model.extend<Partial<Order>>({}),
    },

    factories: {
      stat: Factory.extend({
        label(i: number) {
          const labels = ['Total Users', 'Revenue', 'Conversion Rate', 'Active Sessions', 'Bounce Rate'];
          return labels[i % labels.length];
        },
        value(i: number) {
          const values = [15234, '$89,234', '3.24%', 2345, '42.5%'];
          return values[i % values.length];
        },
        change(i: number) {
          const changes = [12, 8.2, -2, 5.3, -1.5];
          return changes[i % changes.length];
        },
      }),

      order: Factory.extend({
        customer() {
          const customers = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Wilson'];
          return customers[Math.floor(Math.random() * customers.length)];
        },
        total() {
          return Number((Math.random() * 500 + 20).toFixed(2));
        },
        status() {
          const statuses: Order['status'][] = ['completed', 'pending', 'processing', 'cancelled'];
          return statuses[Math.floor(Math.random() * statuses.length)];
        },
        date() {
          const dates = [
            '2024-01-15',
            '2024-01-14',
            '2024-01-13',
            '2024-01-12',
            '2024-01-11',
          ];
          return dates[Math.floor(Math.random() * dates.length)];
        },
      }),
    },

    seeds(server) {
      // ایجاد 5 آمار
      server.createList('stat', 5);
      
      // ایجاد 10 سفارش
      server.createList('order', 10);
    },

    routes() {
      this.namespace = 'api';

      // تاخیر شبیه‌سازی شده برای نمایش لودینگ
      this.timing = 500;

      // دریافت آمار
      this.get('/stats', (schema) => {
        return schema.all('stat');
      });

      // دریافت سفارشات اخیر
      this.get('/recent-orders', (schema) => {
        const orders = schema.all('order').models;
        
        // مرتب‌سازی بر اساس تاریخ (جدیدترین اول)
        const sorted = orders.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        return {
          orders: sorted.slice(0, 5),
          total: orders.length,
        };
      });

      // دریافت داده‌های نمودار
      this.get('/chart-data', () => {
        return {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Revenue 2024',
              data: [30, 45, 58, 72, 89, 105],
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
            },
            {
              label: 'Revenue 2023',
              data: [25, 38, 49, 63, 78, 92],
              borderColor: 'rgb(156, 163, 175)',
              backgroundColor: 'rgba(156, 163, 175, 0.1)',
            },
          ],
        };
      });

      // خطای ۴۰۰ برای تست
      this.get('/error-test', () => {
        return new Response(400, {}, { error: 'This is a test error' });
      });
    },
  });
}