'use client'
import * as z from 'zod'
import { FaComments } from 'react-icons/fa'
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { formSchema } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/src/components/ui/input'
import { Button } from '@/src/components/ui/button'
import { useRouter } from 'next/navigation'
import { ChatCompletionMessage } from 'openai/resources/index.mjs'
import axios from 'axios'
import { Form, FormControl, FormField, FormItem } from '@/src/components/form'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'

const Chat = () => {
  const router = useRouter()
  const [messages, setMessages] = useState<ChatCompletionMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const { transcript, resetTranscript } = useSpeechRecognition()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  })

  useEffect(() => {
    form.setValue('prompt', transcript)
  }, [transcript, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      const userMessage = {
        role: 'user',
        content: values.prompt,
      }

      const newMessages = [...messages, userMessage]
      const response = await axios.post('/api/conversation', {
        messages: newMessages,
      })

      //add record
      const usageRecords = [
        {
          name: 'chat_message',
          detail: 'web',
        },
      ]
      await axios.post('/api/feature_usage', { usageRecords })

      setMessages([...newMessages, response.data])
      form.reset()
      resetTranscript()
    } catch (error: any) {
      console.log(error)
    } finally {
      setIsLoading(false)
      router.refresh()
    }
  }

  useEffect(() => {
    const chatContainer = document.getElementById('chatContainer')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [messages])

  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening()
      setIsListening(false)
    } else {
      SpeechRecognition.startListening({ continuous: true, language: 'es-ES' })
      setIsListening(true)
    }
  }

  return (
    <div className='overflow-y-visible md:overflow-y-hidden'>
      <div className='flex justify-center px-5 py-0 text-3xl font-bold text-white md:justify-start md:py-4 md:text-5xl lg:justify-start lg:py-4'>
        <h1 className='mr-2'>Chat</h1>
        <FaComments className='pl-2' />
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='mt-4 grid w-full grid-cols-12 flex-col gap-2 rounded-lg border px-4 focus-within:shadow-sm md:mt-12 md:p-4 md:px-6'
          >
            <FormField
              name='prompt'
              render={({ field }) => (
                <FormItem className='col-span-12 flex items-center lg:col-span-8'>
                  <FormControl className='m-0 w-full p-0'>
                    <Input
                      className='bg-search-color w-full border-0 pl-2 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                      disabled={isLoading}
                      placeholder='¿Dime qué nutrientes contiene la papa?'
                      {...field}
                    />
                  </FormControl>
                  <button
                    type='button'
                    onClick={toggleListening}
                    className={`ml-2 rounded-full bg-speech-button p-3 text-white shadow-lg transition-transform duration-300 ${isListening ? 'scale-125' : 'scale-100'}`}
                  >
                    {isListening ? (
                      <FaMicrophoneSlash size={20} />
                    ) : (
                      <FaMicrophone size={20} />
                    )}
                  </button>
                </FormItem>
              )}
            />
            <Button
              className='z-10 col-span-12 w-full bg-question-color pt-2 text-2xl text-white lg:col-span-2 lg:mt-2'
              disabled={isLoading}
            >
              Preguntar
            </Button>
          </form>
        </Form>
        <div className='mt-4 space-y-4 px-5 text-white'>
          <div
            id='chatContainer'
            className='flex max-h-96 flex-col gap-y-4 overflow-y-auto'
          >
            {messages.length === 0 && !isLoading && (
              <div className='text-3xl font-bold text-white'>
                Todavía no hay preguntas registradas
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-1/2 rounded-lg p-3 ${
                  message.role === 'assistant'
                    ? 'self-start bg-answer-color text-white lg:mr-16'
                    : 'self-end bg-ask-color text-white lg:mr-16'
                }`}
              >
                <p className='text-sm'>{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
