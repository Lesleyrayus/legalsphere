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
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { Sun, Moon, Laptop, Building, Palette } from "lucide-react"

export function SettingsForm() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast();

  const handleSaveChanges = () => {
      toast({
          title: "Settings Saved",
          description: `Your settings have been updated.`
      })
  }

  return (
    <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Manage your workspace and appearance settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Workspace Section */}
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Workspace
                </h3>
                <p className="text-sm text-muted-foreground">
                  Customize your firm-wide settings.
                </p>
              </div>
              <Separator />
              <div className="grid md:grid-cols-2 gap-4 pt-2">
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
              </div>
            </div>

            {/* Appearance Section */}
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance
                </h3>
                <p className="text-sm text-muted-foreground">
                  Customize the look and feel of your dashboard.
                </p>
              </div>
              <Separator />
              <div className="space-y-2 pt-4">
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
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </CardFooter>
        </Card>
    </div>
  )
}
