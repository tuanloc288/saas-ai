'use client'

import { Crisp } from "crisp-sdk-web"
import { useEffect } from "react"

const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("bdc407f8-28dd-4285-bd22-74d8826af482")
    },[])

    return null
}

export default CrispChat