'use client'

import * as z from 'zod'
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Download, ImageIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from '@hookform/resolvers/zod'

import { amountOptions, formSchema, resolutionOptions } from "./constants"
import Heading from "@/components/Heading"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Empty } from "@/components/Empty"
import { Loader } from "@/components/Loader"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardFooter } from "@/components/ui/card"
import { usePreModal } from "@/hooks/Use-pre-modal"

// some images if u want to test
// just replace messsages.map to testImg.map 
// and messages.length === 0 to testImg.length === 0  
const testImg = [
  "https://res.cloudinary.com/dbiliw2ja/image/upload/v1689919078/snowMnt2_mkycow.webp",
  "https://res.cloudinary.com/dbiliw2ja/image/upload/v1688891514/bpoa2zmdafilea0gpvjf.jpg",
  "https://res.cloudinary.com/dbiliw2ja/image/upload/v1689919078/snowMnt_beyrvj.jpg",
  "https://res.cloudinary.com/dbiliw2ja/image/upload/v1689919077/snowMnt1_gdq5ya.webp"
]

const ImagePage = () => {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const preModal = usePreModal()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "256x256"
    }
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([])
      const response = await axios.post('/api/image', values)

      const urls = response.data.map((image: { url: string }) => image.url)

      setImages(urls)
      form.reset()
    } catch (error: any) {
      if(error?.response?.status === 403){
        preModal.onOpen()
      } else {
        toast.error("Something went wrong!")
      }
    } finally {
      router.refresh()
    }
  }

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Turn your prompt into an image."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                    rounded-lg
                    border
                    w-full
                    p-4
                    px-3
                    md:px-6
                    focus-within:shadow-sm
                    grid
                    grid-cols-12
                    gap-2
                  "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="
                              border-0 
                              outline-none 
                              focus-visible:ring-0 
                              focus-visible:ring-transparent
                            "
                        disabled={isLoading}
                        placeholder="A beautiful scene of the Switzerland snow mountain"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full bg-pink-700" disabled={isLoading}>
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <Empty />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-8">
            {images.map((src) => (
              <Card className="rounded-lg overflow-hidden" key={src}>
                <div className="relative aspect-square">
                  <Image
                    alt="Image"
                    src={src}
                    fill
                  />
                </div>
                <CardFooter className="p-2">
                  <Button variant='secondary' className="w-full" onClick={() => window.open(src)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImagePage