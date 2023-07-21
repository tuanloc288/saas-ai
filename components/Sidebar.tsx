'use client'

import Image from "next/image"
import Link from "next/link"
import { FC } from "react"
import { Montserrat } from "next/font/google"
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { cn } from "@/lib/utils"
import FreeTrialCounter from "@/components/Free-trial-counter"

const montserrat = Montserrat({
    weight: "700",
    subsets: ["latin"]
})

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500"
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500"
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700"
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-700"
    },
    {
        label: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-emerald-500"
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-green-700"
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    },
]

interface SidebarProps { 
    apiLimitCount: number
    isPre: boolean
}

const Sidebar: FC<SidebarProps> = ({
    apiLimitCount = 0,
    isPre = false
}) => {
    const pathname = usePathname()

    return (
        <div className="space-y-4 flex flex-col h-full text-white bg-gray-900">
            <div className="px-3 py-2 flex-1">
                <Link href='/dashboard' className="flex items-center justify-center p-3 my-7">
                    <div className="relative w-8 h-8 mr-4">
                        <Image
                            fill
                            alt="Wisdom logo"
                            src="/logo.png"
                        />
                    </div>
                    <h1 className={cn("text-2xl font-bold", montserrat.className)}>
                        Wisdom
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link href={route.href} key={route.href}
                            className={cn(`
                                text-sm 
                                group 
                                flex 
                                p-3 
                                w-full 
                                justify-start 
                                font-medium 
                                rounded-lg 
                                transition
                                cursor-pointer 
                                hover:text-white 
                                hover:bg-white/10 
                            `, 
                                pathname === route.href ? 'text-white bg-white/10' : 'text-gray-400'
                            )}>
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <FreeTrialCounter
                isPre={isPre}
                apiLimitCount={apiLimitCount}
            />
        </div>
    )
}

export default Sidebar
