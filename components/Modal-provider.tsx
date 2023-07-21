'use client'

import { useEffect, useState } from "react"
import PreModal from "@/components/Premium-modal"


const ModalProvider = () => {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    },[])

    if(!hasMounted){
        return null
    }

    return (
        <>
            <PreModal/>
        </>
    )
}

export default ModalProvider