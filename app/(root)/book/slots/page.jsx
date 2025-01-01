"use client";

import { useState } from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import TimeSlotPicker from "@/components/app-ui/timePicker/time-slot-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ProceedLink from "@/components/app-ui/booking/ProceedLink";

export default function Page() {
    const [selectedDate, setSelectedDate] = useState(null); // State for the selected date
    const [timeSlots, setTimeSlots] = useState([
        { start: "09:00 AM", end: "10:00 AM", booked: false },
        { start: "10:00 AM", end: "11:00 AM", booked: false },
        { start: "11:00 AM", end: "12:00 PM", booked: false },
        { start: "12:00 PM", end: "01:00 PM", booked: false },
        { start: "01:00 PM", end: "02:00 PM", booked: false },
        { start: "02:00 PM", end: "03:00 PM", booked: false },
        { start: "03:00 PM", end: "04:00 PM", booked: false },
        { start: "04:00 PM", end: "05:00 PM", booked: false },
    ]);

    const handleSlotToggle = (index) => {
        setTimeSlots((prevSlots) =>
            prevSlots.map((slot, i) =>
                i === index ? { ...slot, booked: !slot.booked } : slot
            )
        );
    };

    const columns = 2;

    const timeSlotDisplayArray = timeSlots.reduce((result, slot, index) => {
        const columnIndex = index % columns;
        if (!result[columnIndex]) result[columnIndex] = [];
        result[columnIndex].push(slot);
        return result;
    }, []);

    return (
        <section className="bg-white p-4 space-y-10">
            <h3 className="text-xl text-gray-700 font-bold text-center">
                Available Date and Time Slots
            </h3>
            <div className="flex justify-center">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-[240px] justify-start text-left font-normal",
                                !selectedDate && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon />
                            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        align="start"
                        className="flex w-auto flex-col space-y-2 p-2"
                    >
                        <Select
                            onValueChange={(value) =>
                                setSelectedDate(addDays(new Date(), parseInt(value)))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="0">Today</SelectItem>
                                <SelectItem value="1">Tomorrow</SelectItem>
                                <SelectItem value="3">In 3 days</SelectItem>
                                <SelectItem value="7">In a week</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="rounded-md border">
                            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <TimeSlotPicker timeSlots={timeSlotDisplayArray} onSlotToggle={handleSlotToggle} />
            <ProceedLink nextLink="/book/confirm" />
        </section>
    );
}
