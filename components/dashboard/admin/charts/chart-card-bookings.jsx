"use client"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"


const chartData = [
    { month: "January", bookings: 500, cancellations: 50 },
    { month: "February", bookings: 420, cancellations: 30 },
    { month: "March", bookings: 380, cancellations: 40 },
    { month: "April", bookings: 300, cancellations: 25 },
    { month: "May", bookings: 450, cancellations: 60 },
    { month: "June", bookings: 520, cancellations: 70 },
    { month: "July", bookings: 480, cancellations: 55 },
    { month: "August", bookings: 600, cancellations: 80 },
    { month: "September", bookings: 550, cancellations: 65 },
]

const chartConfig = {
    bookings: {
        label: "Bookings",
        color: "hsl(var(--chart-1))",
    },
    cancellations: {
        label: "Cancellations",
        color: "hsl(var(--chart-2))",
    },
}

export function Component() {
    return (
        <ChartContainer config={chartConfig} className="bg-white border-2 p-4 shadow-md rounded-xl flex justify-between items-start gap-3 text-gray-600 h-96 w-full">
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    width={40} // Adjust width for spacing
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                    dataKey="bookings"
                    type="natural"
                    fill="var(--color-bookings)"
                    fillOpacity={0.4}
                    stroke="var(--color-bookings)"
                    stackId="a"
                />
                <Area
                    dataKey="cancellations"
                    type="natural"
                    fill="var(--color-cancellations)"
                    fillOpacity={0.4}
                    stroke="var(--color-cancellations)"
                    stackId="a"
                />
            </AreaChart>
        </ChartContainer>
    )
}
