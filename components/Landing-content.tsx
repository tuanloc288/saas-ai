'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const testimonials = [
    {
        name: 'Tuan Loc',
        avatar: "TL",
        title: "Web developer",
        description: `This is the best ai tool i've ever used.`
    },
    {
        name: 'Alowf',
        avatar: "A",
        title: "UI/UX designer",
        description: "Best thing don't come free, so maybe a little charge still worth it!"
    },
    {
        name: 'Loc Tuan',
        avatar: "LT",
        title: "Content creator",
        description: "Can't even imagine working without this!!"
    },
    {
        name: 'Fwola',
        avatar: "F",
        title: "Blogger",
        description: "This tool is the best in class,now i can write 10 times faster for my blog!"
    },
]

const LandingContent = () => {
    return (
        <div className="px-10 pb-10">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((item) => (
                    <Card key={item.description} className="bg-gray-800 border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg"> {item.name} </p>
                                    <p className="text-gray-400 text-sm"> {item.title} </p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default LandingContent