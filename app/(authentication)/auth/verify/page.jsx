import VerifyLoader from "@/components/app-ui/authentication/verify-loader"
import { Suspense } from "react"

export default async function Page() {
    return (
        <div className="bg-gradient-to-br from-[rgb(2,248,1)] to-[rgb(248,248,0)] flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex items-center justify-center p-4 shadow-md">
                <div>
                    <h1 className="text-2xl text-gray-700 font-medium text-center">Verifying Email</h1>
                    <div className="flex justify-center">
                        <Suspense fallback={<div className="text-gray-500 text-sm">Loading...</div>}>
                            <VerifyLoader />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    )
}
