import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { SettingsForm } from '@/components/dashboard/settings-form';

export default function SettingsPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="bg-slate-50/50">
        <DashboardHeader page="Settings" />
        <main className="p-4 lg:p-8">
          <div className="max-w-2xl mx-auto">
            <SettingsForm />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
