'use client'

import axios from "axios"
import { Zap } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"

import { Button } from "@/components/ui/button"

interface SubscriptionButtonProps {
    isPre: boolean
}

const SubscriptionButton = ({
    isPre = false
}: SubscriptionButtonProps) => {
    const [isLoading, setIsLoading] = useState(false)

    const onClick = async () => {
        try {
            setIsLoading(true)
            const response = await axios('/api/stripe')

            window.location.href = response.data.url
        } catch(error){
            toast.error("Something went wrong.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button disabled={isLoading} variant={isPre ? "default" : "gradient"} onClick={onClick}>
            {isPre ? "Manage your subscriptions" : "Upgrade"}
            {!isPre && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
    )
}

export default SubscriptionButton