
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

const Chat= () => {
  const form = useForm<z.infer<typeof formSchema>>  ({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  })

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async(values: z.infer< typeof formSchema>) => {

  }
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
                          <Input className='border-0 outline-none focus-visible:ring-0
                          focus-visible:ring-transparent' disabled={isLoading}
                          placeholder='¿Qué es paracetamol?'
                          {...field}></Input>
                        </FormControl>
                      </FormItem>
                    )} 
                  /> 
                  <Button className='col-span-12 lg:col-span-2 bg-zinc-800 text-white w-full'
                  disabled={isLoading}>
                    Preguntar
                  </Button>
                </form>
            </Form>
          </div>
          <div className='space-y-4 mt-4 px-5 text-white'>
            Contenido
          </div>
      </div>
    </>
  );
};

export default Chat;
