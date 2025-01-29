import { Ellipsis, CircleUserRound, ClockArrowUp, CalendarRange, HandPlatter, Star } from "lucide-react";


export default function CardDisplay() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
            {/* Small Cards */}
            <div className="col-span-1 bg-white border-2 p-4 shadow-md rounded-xl flex justify-between items-start gap-3 text-gray-600">
                <div className="flex items-center gap-5">
                    <CircleUserRound size={62} className="text-[#966f5d]"/>
                    <div>
                        <h3 className="text-lg font-medium">Customers</h3>
                        <h1 className="text-xl font-bold">1000</h1>
                    </div>
                </div>
                <Ellipsis size={24}/>
            </div>

            <div className="col-span-1 bg-white border-2 p-4 shadow-md rounded-xl flex justify-between items-start gap-3 text-gray-600">
                <div className="flex items-center gap-5">
                    <CalendarRange size={62} className="text-[#966f5d]"/>
                    <div>
                        <h3 className="text-lg font-medium">AppointMent</h3>
                        <h1 className="text-xl font-bold">900</h1>
                    </div>
                </div>
                <Ellipsis size={24}/>
            </div>

            {/* Small Cards */}
            <div className="col-span-1 bg-white border-2 p-4 shadow-md rounded-xl flex justify-between items-start gap-3 text-gray-600">
                <div className="flex items-center gap-5">
                    <HandPlatter size={62} className="text-[#966f5d]"/>
                    <div>
                        <h3 className="text-lg font-medium">Services</h3>
                        <h1 className="text-xl font-bold">20</h1>
                    </div>
                </div>
                <Ellipsis size={24}/>
            </div>

            <div className="col-span-1 bg-white border-2 p-4 shadow-md rounded-xl flex justify-between items-start gap-3 text-gray-600">
                <div className="flex items-center gap-5">
                    <ClockArrowUp size={62} className="text-[#966f5d]"/>
                    <div>
                        <h3 className="text-lg font-medium">Orders</h3>
                        <h1 className="text-xl font-bold">1200</h1>
                    </div>
                </div>
                <Ellipsis size={24}/>
            </div>
        </section>
    );
}
