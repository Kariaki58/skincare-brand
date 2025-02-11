import CountrySelector from "./address-form";
import AppointMentService from "./appiontment-service";
import AppointMentForm from "./appointment-form";
import { Button } from "@/components/ui/button";

export default function Page() {
    return (
        <div className="max-w-screen-lg mx-auto bg-[#214207] p-4 my-20">
            <AppointMentForm />
            <CountrySelector />
            <AppointMentService />
            <div className="flex justify-center my-5">
                <Button className="bg-green-950 hover:bg-green-900 px-20 py-4 text-xl font-bold">Submit</Button>
            </div>
        </div>
    )
}