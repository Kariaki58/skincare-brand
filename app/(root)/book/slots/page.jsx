import SlotTimeDisplay from "./slot-time-display";


export default function Page() {
    return (
        <section className="bg-white p-4 space-y-10 rounded-md">
            <h3 className="text-xl text-gray-700 font-bold text-center">
                Available Date and Time Slots
            </h3>
            <SlotTimeDisplay />
        </section>
    );
}
