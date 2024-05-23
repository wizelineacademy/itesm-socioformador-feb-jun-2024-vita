'use client';
import * as z from 'zod';
import { FaComments } from 'react-icons/fa';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { formSchema } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ChatCompletionMessage } from 'openai/resources/index.mjs';
import axios from 'axios';
import { Form, FormControl, FormField, FormItem } from '@/components/form';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Chat = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const { transcript, resetTranscript } = useSpeechRecognition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ''
    }
  });

  useEffect(() => {
    form.setValue('prompt', transcript);
  }, [transcript, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const userMessage = {
        role: 'user',
        content: values.prompt
      };

      const newMessages = [...messages, userMessage];
      const response = await axios.post('/api/conversation', {
        messages: newMessages
      });

      setMessages([...newMessages, response.data]);
      form.reset();
      resetTranscript();
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  useEffect(() => {
    const chatContainer = document.getElementById('chatContainer');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      
      SpeechRecognition.startListening({ continuous: true, language: 'es-ES' });
      setIsListening(true);
    }
  };

  return (
    <div className='overflow-y-visible md:overflow-y-hidden'>
      <div className="flex text-white px-5 py-0 md:py-4 lg:py-4 text-3xl md:text-5xl font-bold lg:justify-start md:justify-start justify-center">
        <h1 className="mr-2">Chat</h1>
        <FaComments className="pl-2" />
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full md:p-4 px-4 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 mt-4 md:mt-12 flex-col"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-8 flex items-center">
                  <FormControl className="m-0 p-0 w-full">
                    <Input
                      className="pl-2 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent bg-search-color w-full"
                      disabled={isLoading}
                      placeholder="¿Dime qué nutrientes contiene la papa?"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`ml-2 bg-speech-button text-white p-3 rounded-full shadow-lg transition-transform duration-300 ${isListening ? 'scale-125' : 'scale-100'}`}
                  >
                    {isListening ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
                  </button>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 bg-question-color text-white w-full z-10 text-2xl pt-2 lg:mt-2"
              disabled={isLoading}
            >
              Preguntar
            </Button>
          </form>
        </Form>
        <div className="space-y-4 mt-4 px-5 text-white">
          <div
            id="chatContainer"
            className="flex flex-col gap-y-4 overflow-y-auto max-h-96"
          >
            {messages.length === 0 && !isLoading && (
              <div className="text-white font-bold text-3xl">
                Todavía no hay preguntas registradas
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-1/2 p-3 rounded-lg ${
                  message.role === 'assistant'
                    ? 'bg-answer-color text-white lg:mr-16 self-start'
                    : 'bg-ask-color text-white lg:mr-16 self-end'
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
