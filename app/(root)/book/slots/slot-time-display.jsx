"use client";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { AnimatePresence, motion } from "framer-motion";


export default function SlotTimeDisplay() {
    const [selectedDate, setSelectedDate] = useState(null); // State for the selected date
        const timeSlots = [
            { start: "08:00 AM", booked: false },
            { start: "8:15AM", booked: false },
            { start: "8:30AM", booking: false },
            { start: "8:45AM", booking: false },
            { start: "09:00 AM", booked: false },
            { start: "9:15AM", booked: false },
            { start: "9:30AM", booked: true },
            { start: "9:45AM", booked: true },
            { start: "10:00 AM", booked: true },
            { start: "10:15 AM", booked: true },
            { start: "10:30 AM", booked: true },
            { start: "10:45 AM", booked: false },
            { start: "11:00 AM", booked: false },
            { start: "11:15 AM", booked: false },
            { start: "11:30 AM", booked: false },
            { start: "11:45 AM", booked: false },
            { start: "12:00 PM", booked: false },
            { start: "12:15 PM", booked: false },
            { start: "12:30 PM", booked: false },
            { start: "12:45 PM", booked: false },
            { start: "01:00 PM", booked: false },
            { start: "01:15 PM", booked: false },
            { start: "01:30 PM", booked: false },
            { start: "01:45 PM", booked: false },
            { start: "02:00 PM", booked: false },
            { start: "02:15 PM", booked: false },
            { start: "02:30 PM", booked: false },
            { start: "02:45 PM", booked: false },
            { start: "03:00 PM", booked: false },
            { start: "03:15 PM", booked: false },
            { start: "03:30 PM", booked: false },
            { start: "03:45 PM", booked: false },
            { start: "04:00 PM", booked: false },
            { start: "04:15 PM", booked: false },
        ]
    
        const [selectedSlotIndex, setSelectedSlotIndex] = useState(null); // State for selected slot index
    
        const handleSlotToggle = (index) => {
            setSelectedSlotIndex((prevIndex) => (prevIndex === index ? null : index));
        };
    
    return (
        <section>
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
                        <div className="rounded-md border pb-5 p-5 w-full max-w-lg">
                            <Calendar 
                                mode="single" 
                                selected={selectedDate} 
                                onSelect={setSelectedDate} 
                                className="text-[30px] [&_.day]:text-2xl [&_.day]:font-bold" 
                            />
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <AnimatePresence>
                {selectedDate && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="pt-10 px-5"
                    >
                        <div className="flex flex-wrap">
                            {timeSlots.map((slot, index) => (
                                <button
                                    key={index}
                                    className={cn(
                                        "p-3 border bg-transparent m-1 rounded-full transition-colors duration-300",
                                        index === selectedSlotIndex
                                            ? "bg-[#7E5A4B] text-white"
                                            : slot.booked
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "hover:bg-gray-100"
                                    )}
                                    disabled={slot.booked}
                                    onClick={() => handleSlotToggle(index)}
                                >
                                    {slot.start}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {selectedSlotIndex !== null && (
                <ProceedLink nextLink="/book/confirm" />
            )}
        </section>
        
    )
}