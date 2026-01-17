import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { Bookings } from '@/components/dashboard/bookings';

export default function BookingsPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      
        <SidebarInset className="bg-slate-50/50">
          <DashboardHeader page="Bookings" />
          <main className="p-4 lg:p-8">
            <Bookings />
          </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
