'use client'

import {
    Code,
    ImageIcon,
    MessageSquare,
    Music,
    Video,
    Zap
} from "lucide-react"
import axios from "axios"
import { useState } from "react"
import { toast } from "react-hot-toast"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { usePreModal } from "@/hooks/Use-pre-modal"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const tools = [
    {
        label: 'Conversation',
        icon: MessageSquare,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10"
    },
    {
        label: 'Music Generation',
        icon: Music,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10"
    },
    {
        label: 'Image Generation',
        icon: ImageIcon,
        color: "text-pink-700",
        bgColor: "bg-pink-700/10"
    },
    {
        label: 'Video Generation',
        icon: Video,
        color: "text-orange-700",
        bgColor: "bg-orange-700/10"
    },
    {
        label: 'Code Generation',
        icon: Code,
        color: "text-green-700",
        bgColor: "bg-green-700/10"
    },
]

const PreModal = () => {
    const preModal = usePreModal()
    const [isLoading, setIsLoading] = useState(false)

    const onSubscribe = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get('/api/stripe')

            window.location.href = response.data.url
        } catch(error){ 
            toast.error("Something went wrong.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={preModal.isOpen} onOpenChange={preModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold py-1">
                            Upgrade to Premium
                            <Badge className="uppercase text-sm py-1" variant='gradient'>
                                Pre
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-gray-900 font-medium">
                        {tools.map((tool) => (
                            <Card
                                key={tool.label}
                                className="p-3 border-black/10 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6", tool.color)} />
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                <span
                                    className="
                                        text-transparent 
                                        bg-clip-text
                                        bg-gradient-to-r
                                        from-orange-600  
                                        to-blue-600 
                                        text-lg
                                    "
                                >
                                    ✔
                                </span>
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        disabled={isLoading}
                        onClick={onSubscribe}
                        size='lg'
                        variant='gradient'
                        className="w-full"
                    >
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white"/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default PreModal