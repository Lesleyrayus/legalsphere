"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Search, Paperclip, X, File as FileIcon } from "lucide-react";
import { chatData, type ChatUser, type Message } from "./data";
import { cn } from "./lib/utils";
import { ScrollArea } from "./components/ui/scroll-area";
import { Badge } from "./components/ui/badge";

export function ChatView() {
  const [users] = useState<ChatUser[]>(chatData);
  const [activeChat, setActiveChat] = useState<ChatUser>(users[0]);
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachmentPreview, setAttachmentPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat.messages]);

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAttachment(file);
      if (file.type.startsWith("image/")) {
        setAttachmentPreview(URL.createObjectURL(file));
      } else {
        setAttachmentPreview(null);
      }
    }
  };

  const handleSendMessage = () => {
    if (message.trim() === "" && !attachment) return;

    let newAttachment: Message["attachment"];

    if (attachment) {
      newAttachment = {
        type: attachment.type.startsWith("image/") ? "image" : "file",
        name: attachment.name,
        // In a real app, you would upload the file and get a URL
        url: URL.createObjectURL(attachment),
      };
    }

    const newMessage: Message = {
      from: "me",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      attachment: newAttachment,
    };
    
    setActiveChat((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));

    setMessage("");
    setAttachment(null);
    setAttachmentPreview(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
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
                  <AvatarImage
                    src={user.avatar}
                    alt={user.name}
                    data-ai-hint="person face"
                  />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="font-semibold truncate">{user.name}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {user.lastMessage}
                  </p>
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
              <AvatarImage
                src={activeChat.avatar}
                alt={activeChat.name}
                data-ai-hint="person face"
              />
              <AvatarFallback>
                {activeChat.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <p className="font-semibold">{activeChat.name}</p>
          </div>

          <ScrollArea className="flex-1 p-4 bg-background/90">
            <div className="space-y-4">
              {activeChat.messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex",
                    msg.from === "me" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-xs lg:max-w-md rounded-lg p-3 text-sm",
                      msg.from === "me"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border"
                    )}
                  >
                    {msg.attachment && (
                      <div className="mb-2">
                        {msg.attachment.type === "image" ? (
                          <img
                            src={msg.attachment.url}
                            alt={msg.attachment.name}
                            className="rounded-lg max-w-full h-auto"
                          />
                        ) : (
                          <a
                            href={msg.attachment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn("flex items-center gap-2 p-2 rounded-md", 
                                msg.from === 'me' ? 'bg-primary-foreground/10 hover:bg-primary-foreground/20' : 'bg-muted hover:bg-muted/80'
                            )}
                          >
                            <FileIcon className="h-6 w-6" />
                            <div className="text-sm">
                              <p className="font-medium truncate">
                                {msg.attachment.name}
                              </p>
                            </div>
                          </a>
                        )}
                      </div>
                    )}
                    {msg.text && <p>{msg.text}</p>}
                    <p
                      className={cn(
                        "text-xs mt-1",
                        msg.from === "me"
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      )}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
               <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
           {attachment && (
            <div className="p-2 border-t flex items-center justify-between bg-muted/50">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    {attachmentPreview ? (
                        <img src={attachmentPreview} alt="Preview" className="h-10 w-10 object-cover rounded-md" />
                    ) : (
                        <FileIcon className="h-8 w-8" />
                    )}
                    <span className="truncate max-w-xs">{attachment.name}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => { setAttachment(null); setAttachmentPreview(null); }}>
                    <X className="h-4 w-4" />
                </Button>
            </div>
          )}

          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="h-5 w-5" />
                <span className="sr-only">Attach file</span>
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAttachment}
                className="hidden"
              />
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <Button type="submit" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086L2.279 16.76a.75.75 0 00.95.826l14.5-5.25a.75.75 0 000-1.452l-14.5-5.25z" />
                </svg>
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
