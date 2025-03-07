"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const chartVariants = cva("w-full h-full")

const Chart = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof chartVariants>
>(({ className, ...props }, ref) => <div ref={ref} className={cn(chartVariants(), className)} {...props} />)
Chart.displayName = "Chart"

const ChartArea = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div ref={ref} className="h-full" {...props} />
))
ChartArea.displayName = "ChartArea"

const ChartAxisOptions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div ref={ref} {...props} />
))
ChartAxisOptions.displayName = "ChartAxisOptions"

const ChartBar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div ref={ref} {...props} />
))
ChartBar.displayName = "ChartBar"

const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div ref={ref} {...props} />
))
ChartContainer.displayName = "ChartContainer"

const ChartGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div ref={ref} {...props} />
))
ChartGrid.displayName = "ChartGrid"

const ChartLine = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div ref={ref} {...props} />
))
ChartLine.displayName = "ChartLine"

const ChartPie = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div ref={ref} {...props} />
))
ChartPie.displayName = "ChartPie"

const ChartTooltip = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div ref={ref} {...props} />
))
ChartTooltip.displayName = "ChartTooltip"

const ChartXAxis = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div ref={ref} {...props} />
))
ChartXAxis.displayName = "ChartXAxis"

const ChartYAxis = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div ref={ref} {...props} />
))
ChartYAxis.displayName = "ChartYAxis"

export {
  Chart,
  ChartArea,
  ChartAxisOptions,
  ChartBar,
  ChartContainer,
  ChartGrid,
  ChartLine,
  ChartPie,
  ChartTooltip,
  ChartXAxis,
  ChartYAxis,
}

