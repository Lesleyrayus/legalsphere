import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { Profile } from '@/components/dashboard/profile';

export default function ProfilePage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="bg-slate-50/50">
        <DashboardHeader page="Profile" />
        <main className="p-4 lg:p-8">
          <div className="max-w-2xl mx-auto">
            <Profile />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
