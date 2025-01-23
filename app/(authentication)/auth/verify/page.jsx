import VerifyLoader from "@/components/app-ui/authentication/verify-loader"


export default async function Page() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex items-center justify-center p-4 shadow-md">
                <div>
                    <h1 className="text-2xl text-gray-700 font-medium text-center">Verifying Email</h1>
                    <div className="flex justify-center">
                        <VerifyLoader />
                    </div>
                </div>
            </div>
        </div>
    )
}
