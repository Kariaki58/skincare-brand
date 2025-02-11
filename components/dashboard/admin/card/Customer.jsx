import customer from "@/models/customer";
import { connectToDatabase } from "@/lib/mongoose";
import { Ellipsis, CircleUserRound } from "lucide-react";


export default async function CustomerCard() {
    let customers = 0;
    let errorOccurred = false;
    try {
        await connectToDatabase();
        customers = await customer.countDocuments().exec();
    } catch (error){
        errorOccurred = true;
    }

    console.log(customers)
    return (
        <div className="col-span-1 bg-white border-2 p-4 shadow-md rounded-xl flex justify-between items-start gap-3 text-gray-600">
            <div className="flex items-center gap-5">
                <CircleUserRound size={62} className="text-[#966f5d]"/>
                <div>
                    <h3 className="text-lg font-medium">Customers</h3>
                    {errorOccurred? (
                        <p className="text-red-500">Failed to load customers.</p>
                    ) : (
                        <h1 className="text-xl font-bold">{customers}</h1>
                    )}
                </div>
            </div>
            <Ellipsis size={24}/>
        </div>
    )
}