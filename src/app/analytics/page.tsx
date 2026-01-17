import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { AnalyticsCharts } from '@/components/dashboard/analytics-charts';

export default function AnalyticsPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="bg-slate-50/50">
        <DashboardHeader page="Analytics" />
        <main className="p-4 lg:p-8">
          <AnalyticsCharts />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
