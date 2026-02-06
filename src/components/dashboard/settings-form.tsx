"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sun, Moon, Laptop } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function SettingsForm() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of your dashboard by selecting a theme.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid max-w-md grid-cols-2 gap-8 pt-2 md:grid-cols-3">
            <Skeleton className="h-[98px] rounded-md" />
            <Skeleton className="h-[98px] rounded-md" />
            <Skeleton className="h-[98px] rounded-md" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize the look and feel of your dashboard by selecting a theme.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={theme}
          onValueChange={setTheme}
          className="grid max-w-md grid-cols-2 gap-8 pt-2 md:grid-cols-3"
        >
          <Label
            htmlFor="light"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
          >
            <RadioGroupItem value="light" id="light" className="sr-only" />
            <Sun className="h-6 w-6" />
            <span className="block w-full p-2 text-center font-normal">
              Light
            </span>
          </Label>
          <Label
            htmlFor="dark"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
          >
            <RadioGroupItem value="dark" id="dark" className="sr-only" />
            <Moon className="h-6 w-6" />
            <span className="block w-full p-2 text-center font-normal">
              Dark
            </span>
          </Label>
          <Label
            htmlFor="system"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
          >
            <RadioGroupItem value="system" id="system" className="sr-only" />
            <Laptop className="h-6 w-6" />
            <span className="block w-full p-2 text-center font-normal">
              System
            </span>
          </Label>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
