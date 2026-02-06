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
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function SettingsForm() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleSave = () => {
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
          <div className="space-y-4">
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
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize the look and feel of your dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
       <CardFooter>
        <Button onClick={handleSave}>Save Changes</Button>
      </CardFooter>
    </Card>
  )
}
