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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { Sun, Moon, Laptop, User, Building, Palette } from "lucide-react"

export function SettingsForm() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast();

  const handleSaveChanges = (section: string) => {
      toast({
          title: "Settings Saved",
          description: `Your ${section} settings have been updated.`
      })
  }

  return (
    <div className="space-y-8">
        <Card>
          <CardHeader>
              <div className="flex items-center gap-3">
                  <User className="h-6 w-6" />
                  <CardTitle>Profile</CardTitle>
              </div>
            <CardDescription>
              This is how others will see you on the site.
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
          <Separator />
          <CardFooter className="py-4">
            <Button onClick={() => handleSaveChanges('Profile')}>Save Changes</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
                <Building className="h-6 w-6" />
                <CardTitle>Workspace</CardTitle>
            </div>
            <CardDescription>
              Manage your firm and workspace settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firm-name">Firm Name</Label>
              <Input id="firm-name" defaultValue="J. Doe & Associates" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="est">
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
          <Separator />
          <CardFooter className="py-4">
            <Button onClick={() => handleSaveChanges('Workspace')}>Save Changes</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
                <Palette className="h-6 w-6" />
                <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>
              Customize the look and feel of your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label>Theme</Label>
               <RadioGroup 
                value={theme} 
                onValueChange={setTheme} 
                className="grid max-w-md grid-cols-2 gap-8 pt-2 md:grid-cols-3"
              >
                  <Label htmlFor="light" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                      <RadioGroupItem value="light" id="light" className="sr-only" />
                      <Sun className="h-6 w-6" />
                      <span className="block w-full p-2 text-center font-normal">Light</span>
                  </Label>
                  <Label htmlFor="dark" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                      <RadioGroupItem value="dark" id="dark" className="sr-only" />
                      <Moon className="h-6 w-6" />
                       <span className="block w-full p-2 text-center font-normal">Dark</span>
                  </Label>
                  <Label htmlFor="system" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                      <RadioGroupItem value="system" id="system" className="sr-only" />
                      <Laptop className="h-6 w-6" />
                      <span className="block w-full p-2 text-center font-normal">System</span>
                  </Label>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
    </div>
  )
}
