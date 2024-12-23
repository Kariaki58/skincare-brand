import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function AlertDialogDemo() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="ml-2 block text-sm border-none outline-none shadow-none hover:border-none hover:outline-none hover:shadow-none hover:bg-transparent underline text-blue-700" variant="outline">terms and conditions</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Terms and Condition display</AlertDialogTitle>
                    <AlertDialogDescription>
                    we accept payment before service
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>I Agreed</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}


export default function Page() {
    return (
        <section className="min-h-screen">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Confirm Your Booking</h1>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <h2 className="text-lg text-gray-600">Service:</h2>
                        <span className="font-medium text-gray-800">Haircut</span>
                    </div>
                    <div className="flex justify-between">
                        <h3 className="text-lg text-gray-600">Duration:</h3>
                        <span className="font-medium text-gray-800">30 minutes</span>
                    </div>
                    <div className="flex justify-between">
                        <h4 className="text-lg text-gray-600">Price:</h4>
                        <span className="font-medium text-gray-800">$50</span>
                    </div>
                    <div className="flex justify-between">
                        <h5 className="text-lg text-gray-600">Date:</h5>
                        <span className="font-medium text-gray-800">2022-12-12</span>
                    </div>
                    <div className="flex justify-between">
                        <h5 className="text-lg text-gray-600">Time:</h5>
                        <span className="font-medium text-gray-800">12:00 PM</span>
                    </div>
                </div>
                <form className="space-y-6 mt-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name:
                        </label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email:
                        </label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone:
                        </label>
                        <Input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="terms"
                            name="terms"
                            required
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label
                            htmlFor="terms"
                            className="ml-2 text-sm text-gray-700"
                        >
                            I agree to the
                        </label>
                        <AlertDialogDemo />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Confirm Booking
                    </Button>
                </form>
            </div>
        </section>
    );
}
