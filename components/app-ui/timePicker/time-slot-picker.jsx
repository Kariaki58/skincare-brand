import { cn } from "@/lib/utils";

export default function TimeSlotPicker({ timeSlots, onSlotToggle }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {timeSlots.flat().map((slot, index) => (
                <button
                    key={index}
                    className={cn(
                        "p-2 border rounded text-center",
                        slot.booked ? "bg-[#7E5A4B] text-white" : "border border-[#7E5A4B] text-black"
                    )}
                    onClick={() => onSlotToggle(index)}
                >
                    {slot.start} - {slot.end}
                    {slot.booked && <span> (Booked)</span>}
                </button>
            ))}
        </div>
    );
}
