import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { OverviewCards } from '@/components/dashboard/overview-cards';
import { RecentActivities } from '@/components/dashboard/organization-activity-overview';
import { UpcomingAppointments } from '@/components/dashboard/upcoming-appointments';
import { Tasks } from '@/components/dashboard/tasks';
import { Bookings } from '@/components/dashboard/bookings';


export default function DashboardPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="md:ml-[--sidebar-width-icon] lg:ml-0">
        <SidebarInset>
          <DashboardHeader page="Dashboard"/>
          <div className="p-4 lg:p-8 space-y-8">
            <OverviewCards />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <UpcomingAppointments />
                <Tasks />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <RecentActivities />
              <Bookings />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
