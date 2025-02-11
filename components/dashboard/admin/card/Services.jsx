import { Ellipsis, HandPlatter } from "lucide-react";
import { connectToDatabase } from "@/lib/mongoose";
import Service from "@/models/service";


export default async function ServicesCard() {
    let services = 0;
    let errorOccurred = false;
    try {
        await connectToDatabase();
        services = await Service.countDocuments().exec();
    } catch (error) {
        errorOccurred = true;
    }
    return (
        <div className="col-span-1 bg-white border-2 p-4 shadow-md rounded-xl flex justify-between items-start gap-3 text-gray-600">
            <div className="flex items-center gap-5">
                <HandPlatter size={62} className="text-[#966f5d]"/>
                <div>
                    <h3 className="text-lg font-medium">Services</h3>
                    {errorOccurred? (
                        <p className="text-red-500">Failed to load services.</p>
                    ) : (
                        <h1 className="text-xl font-bold">{services}</h1>
                    )}
                </div>
            </div>
            <Ellipsis size={24}/>
        </div>
    )
}