import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { ChatView } from '@shared/chat/chat-view';

export default function ChatPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="bg-slate-50/50">
        <DashboardHeader page="Chat" />
        <main className="p-4 lg:p-8">
          <ChatView />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
