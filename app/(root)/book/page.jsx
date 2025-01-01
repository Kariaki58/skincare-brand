import { Input } from "@/components/ui/input";
import ServiceDisplay from "@/components/app-ui/booking/services/service-display";
import { Suspense } from 'react';


export default function page() {

    return (
        <section className="w-full">
            <div className="flex flex-col gap-10 bg-gray-50">
                <div className="w-full bg-white p-6 shadow rounded-lg">
                    <h1 className="text-lg font-semibold mb-6">Choose a Service</h1>
                    <form className="my-10">
                        <Input className="py-8" name="service" type="text" placeholder="search any services" />
                    </form>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ServiceDisplay />
                    </Suspense>
                </div>
            </div>
        </section>
    );
}
