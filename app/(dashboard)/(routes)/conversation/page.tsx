'use client'

import axios from "axios"
import { useState } from "react"
import { toast } from 'react-hot-toast'
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { MessageSquare } from "lucide-react"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChatCompletionRequestMessage } from 'openai'

import { cn } from "@/lib/utils"
import { formSchema } from "./constants"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import Heading from "@/components/Heading"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Empty } from "@/components/Empty"
import { Loader } from "@/components/Loader"
import UserAvatar from "@/components/User-avatar"
import BotAvatar from "@/components/Bot-avatar"
import { usePreModal } from "@/hooks/Use-pre-modal"

// some conversations if u want to test
// just replace messsages.map to testMsg.map 
// and messages.length === 0 to testMsg.length === 0  
const testMsg = [
  {
    content: "generate a lorem ipsum",
    role: "user"
  },
  {
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pellentesque nisl eu aliquam ornare. Vestibulum hendrerit sed lacus a mollis. Cras quis aliquam neque, nec pellentesque nulla. Integer vitae condimentum ante. Cras iaculis, lectus eget ultricies fringilla, lorem nibh mattis arcu, eget gravida nunc tellus a orci. Mauris eget efficitur lacus. Nulla non est aliquam, consectetur mi ac, tempor ex. Cras sollicitudin viverra tellus. Etiam blandit sapien mauris, nec pulvinar sem sodales et. Quisque ut dolor varius, luctus lectus nec, vulputate nunc. Nunc tristique dui vitae facilisis consectetur.",
    role: "else"
  },
  {
    content: "how do i calculate the area of a triangle",
    role: "user"
  },
  {
    content: "The area of a triangle can be calculated as (base * height) / 2.",
    role: "else"
  },
]

const ConversationPage = () => {
  const router = useRouter()
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])
  const preModal = usePreModal()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: 'user',
        content: values.prompt
      }
      const newMessages = [...messages, userMessage]

      const response = await axios.post('/api/conversation', {
        messages: newMessages
      })

      setMessages((current) => [...current, userMessage, response.data])

      form.reset()
    } catch (error: any) {
      // different type of error status, but as we did in all routes
      // 403 will be the code for free trial expired case
      if(error?.response?.status === 403){
        preModal.onOpen()
      } else {
        toast.error("Something went wrong!")
      }
    } finally {
      router.refresh() 
      // this will rehydrate all server components to fetching the newest data 
      // which mean every time client generate a conversation, image or what so ever
      // the data will be up to date e.g. FreeTrialCount
    }
  }

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
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
                  // this field variable will automatically handle value, onChange,..
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="
                              border-0 
                              outline-none 
                              focus-visible:ring-0 
                              focus-visible:ring-transparent
                            "
                        disabled={isLoading}
                        placeholder="How do i calculate the area of a triangle?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 bg-violet-500" disabled={isLoading}>
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(`
                        p-8 w-full flex items-center gap-x-8 rounded-lg
                      `, message.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted')}
              >
                {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">
                  {message.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConversationPage