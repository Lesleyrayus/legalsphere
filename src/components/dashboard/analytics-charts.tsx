
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Pie, PieChart, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { analyticsData } from "@/lib/data"

const chartConfig: ChartConfig = {
  cases: {
    label: "Cases",
    color: "hsl(var(--chart-1))",
  },
  hours: {
    label: "Hours",
    color: "hsl(var(--chart-2))",
  },
}

const revenueChartConfig = {
  revenue: {
    label: "Revenue",
  },
  Consultation: {
    label: "Consultation",
    color: "hsl(var(--chart-1))",
  },
  Litigation: {
    label: "Litigation",
    color: "hsl(var(--chart-2))",
  },
  Contracts: {
    label: "Contracts",
    color: "hsl(var(--chart-3))",
  },
  'Real Estate': {
    label: "Real Estate",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      <Card className="lg:col-span-2 xl:col-span-1">
        <CardHeader>
          <CardTitle>Case Volume</CardTitle>
          <CardDescription>Last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <LineChart data={analyticsData.caseVolume} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line dataKey="cases" type="monotone" stroke="var(--color-cases)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2 xl:col-span-1">
        <CardHeader>
          <CardTitle>Billable Hours</CardTitle>
          <CardDescription>Last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart data={analyticsData.billableHours}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
              <YAxis />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <Bar dataKey="hours" fill="var(--color-hours)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
       <Card className="flex flex-col lg:col-span-2 xl:col-span-1">
        <CardHeader className="items-center pb-0">
          <CardTitle>Revenue by Practice Area</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={revenueChartConfig}
            className="mx-auto aspect-square h-full max-h-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={analyticsData.revenue}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                  {analyticsData.revenue.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
