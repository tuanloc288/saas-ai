'use client'

import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import TypewriterComponent from 'typewriter-effect'

import { Button } from '@/components/ui/button'

const LandingHero = () => {
    const { isSignedIn } = useAuth()

    return (
        <div className='text-white font-bold pt-36 pb-[100px] text-center space-y-5'>
            <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold'>
                <h1> The best AI tools for</h1>
                <div className='
                        text-transparent 
                        bg-clip-text 
                        bg-gradient-to-r 
                        from-orange-600 
                        to-blue-600
                    '
                >
                    <TypewriterComponent
                        options={{
                            strings: [
                                "Chatbot",
                                "Photo generation",
                                "Code generation",
                                "Music generation",
                                "Video generation",
                            ],
                            autoStart: true,
                            loop: true
                        }}
                    />
                </div>
            </div>
            <div className='text-sm md:text-xl font-light text-gray-400'>
                Create content using AI to improve your work life.
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant='gradient' className='md:text-lg mt-4 md:mt-6 rounded-full font-semibold'>
                        Start Generating For Free
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default LandingHero