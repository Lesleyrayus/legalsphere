"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sun, Moon, Laptop } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function SettingsForm() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  const [communicationEmails, setCommunicationEmails] = React.useState(true);
  const [marketingEmails, setMarketingEmails] = React.useState(false);
  const [language, setLanguage] = React.useState("en");
  const [timezone, setTimezone] = React.useState("est");

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleSave = () => {
    // In a real app, you would save these settings to a backend.
    console.log({
      theme,
      communicationEmails,
      marketingEmails,
      language,
      timezone,
    })
    toast({
      title: "Settings Saved",
      description: "Your new settings have been successfully applied.",
    })
  }

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-4 w-4/5" />
        </CardHeader>
        <CardContent>
          <div className="grid w-full grid-cols-3 gap-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
          </div>
          <div className="mt-6 space-y-4">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="grid max-w-md grid-cols-2 gap-4 pt-2 md:grid-cols-3">
                  <Skeleton className="h-24 rounded-md" />
                  <Skeleton className="h-24 rounded-md" />
                  <Skeleton className="h-24 rounded-md" />
              </div>
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-28" />
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Manage your account settings and set e-mail preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="language">Language & Region</TabsTrigger>
            </TabsList>
            <TabsContent value="appearance" className="py-6">
                <div className="space-y-2">
                    <Label>Theme</Label>
                    <p className="text-sm text-muted-foreground">
                      Select the visual theme for your dashboard.
                    </p>
                    <RadioGroup
                      value={theme}
                      onValueChange={setTheme}
                      className="grid max-w-md grid-cols-2 gap-4 pt-2 md:grid-cols-3"
                    >
                      <Label
                        htmlFor="light"
                        className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                      >
                        <RadioGroupItem value="light" id="light" className="sr-only" />
                        <Sun className="h-6 w-6 mb-2" />
                        <span className="block w-full text-center font-normal">
                          Light
                        </span>
                      </Label>
                      <Label
                        htmlFor="dark"
                        className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                      >
                        <RadioGroupItem value="dark" id="dark" className="sr-only" />
                        <Moon className="h-6 w-6 mb-2" />
                        <span className="block w-full text-center font-normal">
                          Dark
                        </span>
                      </Label>
                      <Label
                        htmlFor="system"
                        className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                      >
                        <RadioGroupItem value="system" id="system" className="sr-only" />
                        <Laptop className="h-6 w-6 mb-2" />
                        <span className="block w-full text-center font-normal">
                          System
                        </span>
                      </Label>
                    </RadioGroup>
                </div>
            </TabsContent>
            <TabsContent value="notifications" className="py-6">
                 <div className="space-y-4">
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label className="text-base">Communication Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about new messages, and case updates.
                        </p>
                      </div>
                      <Switch
                        checked={communicationEmails}
                        onCheckedChange={setCommunicationEmails}
                      />
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label className="text-base">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about new products, features, and promotions.
                        </p>
                      </div>
                      <Switch
                        checked={marketingEmails}
                        onCheckedChange={setMarketingEmails}
                      />
                    </div>
                  </div>
            </TabsContent>
            <TabsContent value="language" className="py-6">
                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English (United States)</SelectItem>
                          <SelectItem value="es">Español (España)</SelectItem>
                          <SelectItem value="fr">Français (France)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
            </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save Changes</Button>
      </CardFooter>
    </Card>
  )
}
