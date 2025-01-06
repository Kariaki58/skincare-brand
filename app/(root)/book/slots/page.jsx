"use client";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";


export default function page() {
    const [date, setDate] = React.useState(new Date())
    console.log(date);
    return (
        <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow"
        />
    )
}
