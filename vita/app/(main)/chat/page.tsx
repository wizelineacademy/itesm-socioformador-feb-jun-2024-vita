
'use client';
import * as z from 'zod'
import { FaComments  } from 'react-icons/fa';
import React, { useState } from "react";
import {  useForm } from 'react-hook-form';
import { formSchema } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ChatCompletionMessage } from "openai/resources/index.mjs";
import axios from 'axios';
import { cn } from "@/lib/utils";

const Chat= () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>  ({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  })

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    try {
        const userMessage = {
            role: "user",
            content: values.prompt
        }

        const newMessages = [...messages, userMessage];
        console.log(newMessages)
        const response = await axios.post("/api/conversation", {
            messages: newMessages
        })

        setMessages((current) => [...current, userMessage, response.data]);
        form.reset();
    } catch(error: any){
        //TODO: Open pro modal
        console.log(error);
    } finally {
        router.refresh();
    }
};

  return (
    <>
  
      <div className="flex text-white px-5 py-4 text-5xl font-bold 
        lg:justify-start md:justify-start justify-center">
        <h1 className="mr-2">Chat</h1>
        <FaComments className='pl-2'/>
      </div>
      <div className=''>
          <div>
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className='rounded-lg border w-full p-4 px-4 md:px-6 focus-within:shadow-sm
                grid grid-cols-12 gap-2 mt-12  flex-col'>
                   <FormField 
                    name='prompt'
                    render = {({field})=> (
                      <FormItem className='col-span-12 lg:col-span-9'>
                        <FormControl className='m-0 p-0'>
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          disabled={isLoading}
                          placeholder="How do I calculate the radius of a circle?"
                          {...field}
                        />
                        </FormControl>
                      </FormItem>
                    )} 
                  /> 
                  <Button className='col-span-12 lg:col-span-2 bg-zinc-800 text-white w-full z-10'
                  disabled={isLoading}>
                    Preguntar
                  </Button>
                </form>
            </Form>
          </div>
          <div className='space-y-4 mt-4 px-5 text-white'>
             <div className="flex flex-col-reverse gap-y-4">

                        {isLoading && (
                            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                                
                            </div>
                        )}

                        {messages.length === 0 && !isLoading && (
                            <div>
                               
                            </div>
                        )}

                        {messages.map(message => (
                            <div 
                                key={message.content}
                                
                            >
                                <p className="text-sm text-white" >
                                    {message.content}
                                </p>
                            </div>
                        ))}

                    </div>
          </div>
      </div>
    </>
  );
};

export default Chat;

