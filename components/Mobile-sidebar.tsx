'use client'

import { FC, useEffect, useState } from "react"
import { Menu } from "lucide-react"
// lucide-react from shadcn ui (default style not new york style)

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Sidebar from "@/components/Sidebar"

interface MobileSidebarProps {
    apiLimitCount: number
    isPre: boolean
}

const MobileSidebar: FC<MobileSidebarProps> = ({
    apiLimitCount = 0,
    isPre = false
}) => {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    },[])

    if(!hasMounted){
        return null
    }

    return (
        <Sheet>
            <SheetTrigger>
                <Button variant='ghost' size='icon' className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className="p-0">
                <Sidebar isPre={isPre} apiLimitCount={apiLimitCount}/>
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar