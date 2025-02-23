"use client"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";


export function Component() {
    const [chartData, setChartData] = useState([]);
    const { data: session } = useSession();


    const fetchData = async () => {
        const response = await fetch(`/api/bookings/analytics?userId=${session?.user?.id}`, {
            method: "GET"
        });
        if (!response.ok) {
            return (
                <p className="text-red-500">Failed to fetch booking analytics.</p>
            )
        }
        const data = await response.json();
        setChartData(data);
    }

    useEffect(() => {
        if (session?.user?.id) {
            fetchData();
        }
    }, [session]);
    
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
