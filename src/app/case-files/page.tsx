import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { CaseFiles } from '@/components/dashboard/case-files';

export default function CaseFilesPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="bg-slate-50/50">
        <DashboardHeader page="Case  Files" />
        <main className="p-4 lg:p-8">
          <CaseFiles />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
