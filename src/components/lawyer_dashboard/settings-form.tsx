"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Globe, Palette, Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function SettingsForm() {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    theme: "system",
    notifications: {
      newMessages: true,
      caseUpdates: true,
      appointmentReminders: false,
    },
    language: "en",
    timezone: "gmt-5",
  });

  const handleSave = () => {
    // In a real app, you'd save these settings to a backend or localStorage.
    console.log("Saving settings:", settings);
    toast({
      title: "Settings Saved",
      description: "Your new settings have been successfully applied.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Manage your account and workspace settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Appearance Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <Palette className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Appearance</h3>
          </div>
          <div className="grid gap-4 rounded-md border p-4">
             <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="theme-select" className="font-semibold">Theme</Label>
                  <p className="text-sm text-muted-foreground">Select the visual theme for your dashboard.</p>
                </div>
                <Select
                  value={settings.theme}
                  onValueChange={(value) => setSettings(prev => ({...prev, theme: value}))}
                >
                  <SelectTrigger className="w-[180px]" id="theme-select">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
            </div>
          </div>
        </div>

        <Separator />
        
        {/* Notification Settings */}
        <div className="space-y-4">
           <div className="flex items-center gap-3">
             <Bell className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Notifications</h3>
          </div>
          <div className="grid gap-4 rounded-md border p-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="new-messages">New Messages</Label>
              <Switch 
                id="new-messages" 
                checked={settings.notifications.newMessages}
                onCheckedChange={(checked) => setSettings(prev => ({...prev, notifications: {...prev.notifications, newMessages: checked}}))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="case-updates">Case Updates</Label>
              <Switch 
                id="case-updates" 
                checked={settings.notifications.caseUpdates}
                onCheckedChange={(checked) => setSettings(prev => ({...prev, notifications: {...prev.notifications, caseUpdates: checked}}))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="appointment-reminders">Appointment Reminders</Label>
              <Switch 
                id="appointment-reminders"
                checked={settings.notifications.appointmentReminders}
                onCheckedChange={(checked) => setSettings(prev => ({...prev, notifications: {...prev.notifications, appointmentReminders: checked}}))}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Language & Region Settings */}
        <div className="space-y-4">
           <div className="flex items-center gap-3">
             <Globe className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Language & Region</h3>
          </div>
          <div className="grid gap-6 rounded-md border p-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={settings.language}
                onValueChange={(value) => setSettings(prev => ({...prev, language: value}))}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={settings.timezone}
                onValueChange={(value) => setSettings(prev => ({...prev, timezone: value}))}
              >
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gmt-5">Eastern Time (GMT-5)</SelectItem>
                  <SelectItem value="gmt-6">Central Time (GMT-6)</SelectItem>
                  <SelectItem value="gmt-7">Mountain Time (GMT-7)</SelectItem>
                  <SelectItem value="gmt-8">Pacific Time (GMT-8)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
