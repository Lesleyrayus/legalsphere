"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Palette } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function SettingsForm() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderContent = () => {
    if (!mounted) {
      return <Skeleton className="w-[180px] h-10" />;
    }

    return (
      <Select value={theme} onValueChange={(value) => setTheme(value)}>
        <SelectTrigger className="w-[180px]" id="theme-select">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Manage your workspace appearance.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                {renderContent()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
