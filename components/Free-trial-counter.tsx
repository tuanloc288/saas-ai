'use client'

import { FC, useEffect, useState } from "react"
import { Zap } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { MAX_FREE_COUNTS } from "@/constants"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { usePreModal } from "@/hooks/Use-pre-modal"

interface FreeTrialCounterProps {
    apiLimitCount: number
    isPre: boolean
}

const FreeTrialCounter: FC<FreeTrialCounterProps> = ({
    apiLimitCount = 0,
    isPre = false
}) => {
    const preModal = usePreModal()
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
        
    },[])

    if(!hasMounted){
        return null
    }

    if(isPre){
        return null
    }

    return (
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>
                            {apiLimitCount} / {MAX_FREE_COUNTS} free generations
                        </p>
                        <Progress 
                            className="h-3"
                            value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
                        />
                    </div>
                    <Button className="w-full" variant='gradient' onClick={preModal.onOpen}>
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white "/>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default FreeTrialCounter