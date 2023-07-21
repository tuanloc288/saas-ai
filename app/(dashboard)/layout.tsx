import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { getApiLimitCount } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"

const DashboardLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    const apiLimitCount = await getApiLimitCount() 
    // get count here cuz this one is a server component
    // and only server component have access to prisma 
    // then just simply pass this as a prop to client component
    const isPre = await checkSubscription()

    return (
        <div className="h-full relative">
            <div
                className="
                    hidden 
                    h-full 
                    md:w-72
                    md:flex 
                    md:flex-col 
                    md:fixed 
                    md:inset-y-0
                    bg-gray-900
                "
            >
                <Sidebar isPre={isPre} apiLimitCount={apiLimitCount}/>
            </div>
            <main className="md:pl-72">
                <Navbar />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout