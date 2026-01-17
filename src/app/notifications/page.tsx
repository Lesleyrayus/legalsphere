import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { Notifications } from '@/components/dashboard/notifications';

export default function NotificationsPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      {/* SidebarInset handles the margin automatically */}
      <SidebarInset className="bg-slate-50/50">
        <DashboardHeader page="Notifications" />
        <main className="p-4 lg:p-8">
          <Notifications />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
