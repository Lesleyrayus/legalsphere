import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { Tasks } from '@/components/dashboard/tasks';

export default function TasksPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="bg-slate-50/50">
        <DashboardHeader page="Tasks" />
        <main className="p-4 lg:p-8">
          <Tasks />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
