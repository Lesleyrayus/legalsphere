
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, MessageSquare, Calendar, ShieldCheck } from 'lucide-react';
import type { ReactElement } from "react";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'message' | 'event' | 'system';
  unread: boolean;
}

const notifications: NotificationItem[] = [
  {
    id: '1',
    title: 'New Task Assigned by Admin',
    description: 'Admin has assigned you to "Review contract for Stark Industries".',
    time: '2 mins ago',
    type: 'system',
    unread: true,
  },
  {
    id: '2',
    title: 'Case Re-assignment',
    description: 'Admin has re-assigned "Case #2024-031" to you.',
    time: '1 hour ago',
    type: 'system',
    unread: false,
  },
  {
    id: '3',
    title: 'New Policy Update from Admin',
    description: 'Admin has published a new firm-wide document retention policy.',
    time: '5 hours ago',
    type: 'system',
    unread: false,
  },
  {
    id: '4',
    title: 'New Case Message',
    description: 'Alice Johnson sent a document regarding the Case Consultation.',
    time: '1 day ago',
    type: 'message',
    unread: false,
  },
  {
    id: '5',
    title: 'Appointment Confirmed',
    description: 'Your meeting with Bob Williams is set for July 8th.',
    time: '2 days ago',
    type: 'event',
    unread: false,
  },
];

const iconMap: Record<NotificationItem['type'], ReactElement> = {
  message: <MessageSquare className="w-5 h-5 text-primary" />,
  event: <Calendar className="w-5 h-5 text-green-600" />,
  system: <ShieldCheck className="w-5 h-5 text-muted-foreground" />,
}

export function Notifications() {
  const unreadCount = notifications.filter(n => n.unread).length;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              {unreadCount > 0 ? `You have ${unreadCount} unread messages.` : 'You are all caught up.'}
            </CardDescription>
        </div>
        <Bell className="w-6 h-6 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {notifications.map((item) => (
            <div key={item.id} className={`p-4 flex gap-4 hover:bg-muted/50 transition-colors ${item.unread ? 'bg-accent/50' : ''}`}>
              <div className="mt-1">
                {iconMap[item.type]}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`text-sm font-medium ${item.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {item.title}
                  </h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <Button variant="ghost" className="w-full rounded-t-none">
          View All Notifications
        </Button>
      </CardFooter>
    </Card>
  );
}
