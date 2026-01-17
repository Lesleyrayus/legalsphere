import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { Clients } from '@/components/dashboard/clients';

export default function ClientsPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="bg-slate-50/50">
        <DashboardHeader page="Clients" />
        <main className="p-4 lg:p-8">
          <Clients />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
