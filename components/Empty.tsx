import Image from "next/image"
import { FC } from "react"

interface EmptyProps {
    label?: string
}

export const Empty: FC<EmptyProps> = ({
    label
}) => {
    return (
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <div className="relative h-72 w-72">
                <Image
                    alt="Empty"
                    fill
                    src='/emptyContent.png'
                />
            </div>
            {label && (
                <p className="text-gray-500 text-sm text-center">
                    {label}
                </p>
            )}
        </div>
    )
}