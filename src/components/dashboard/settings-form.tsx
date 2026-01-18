"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export function SettingsForm() {
  const { theme, setTheme } = useTheme()

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="workspace">Workspace</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Make changes to your public information here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea id="bio" placeholder="Tell us about yourself" defaultValue="A seasoned lawyer with a passion for justice."/>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="workspace">
        <Card>
          <CardHeader>
            <CardTitle>Workspace</CardTitle>
            <CardDescription>
              Manage your workspace settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firm-name">Firm Name</Label>
              <Input id="firm-name" defaultValue="J. Doe & Associates" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                  <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                  <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                  <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="appearance">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize the look and feel of your dashboard. Your changes are saved automatically.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <RadioGroup 
                value={theme} 
                onValueChange={setTheme} 
                className="flex gap-4"
              >
                  <Label htmlFor="r1" className="flex flex-col items-center gap-2 rounded-md border-2 border-muted p-1 hover:border-accent [&:has([data-state=checked])]:border-primary">
                      <RadioGroupItem value="light" id="r1" className="sr-only" />
                      <div className="w-20 h-12 rounded-sm bg-gray-100" />
                      <span>Light</span>
                  </Label>
                  <Label htmlFor="r2" className="flex flex-col items-center gap-2 rounded-md border-2 border-muted bg-popover p-1 hover:border-accent [&:has([data-state=checked])]:border-primary">
                      <RadioGroupItem value="dark" id="r2" className="sr-only" />
                      <div className="w-20 h-12 rounded-sm bg-slate-900" />
                      <span>Dark</span>
                  </Label>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
