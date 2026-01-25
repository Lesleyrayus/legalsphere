"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { SendHorizonal, Search } from "lucide-react";
import { chatData, type ChatUser, type Message } from "./data";
import { cn } from "./lib/utils";
import { ScrollArea } from "./components/ui/scroll-area";
import { Badge } from "./components/ui/badge";

export function ChatView() {
  const [users] = useState<ChatUser[]>(chatData);
  const [activeChat, setActiveChat] = useState<ChatUser>(users[0]);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    const newMessage: Message = {
      from: "me",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    // This would in a real app be sent to a server
    setActiveChat(prev => ({ ...prev, messages: [...prev.messages, newMessage] }));
    setMessage("");
  };

  return (
    <Card className="h-[70vh] flex flex-col">
      <CardHeader>
        <CardTitle>Client Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-0 overflow-hidden">
        {/* User List */}
        <div className="md:col-span-1 lg:col-span-1 border-r flex flex-col">
            <div className="p-4 border-b">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search clients..." className="pl-9" />
                </div>
            </div>
          <ScrollArea className="flex-1">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => setActiveChat(user)}
                className={cn(
                  "flex items-center gap-3 p-4 cursor-pointer hover:bg-secondary/50",
                  activeChat.id === user.id && "bg-secondary"
                )}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person face"/>
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="font-semibold truncate">{user.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{user.lastMessage}</p>
                </div>
                {user.unreadCount > 0 && <Badge>{user.unreadCount}</Badge>}
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Window */}
        <div className="md:col-span-2 lg:col-span-3 flex flex-col h-full">
          <div className="flex items-center gap-3 p-4 border-b">
            <Avatar className="h-10 w-10">
              <AvatarImage src={activeChat.avatar} alt={activeChat.name} data-ai-hint="person face" />
              <AvatarFallback>{activeChat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <p className="font-semibold">{activeChat.name}</p>
          </div>

          <ScrollArea className="flex-1 p-4 bg-muted/20">
            <div className="space-y-4">
              {activeChat.messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn("flex", msg.from === "me" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-xs lg:max-w-md rounded-lg p-3 text-sm",
                      msg.from === "me"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card"
                    )}
                  >
                    <p>{msg.text}</p>
                    <p className={cn("text-xs mt-1", msg.from === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
                        {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <Button type="submit" size="icon">
                <SendHorizonal className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
