
'use client';
import * as z from 'zod'
import { FaComments  } from 'react-icons/fa';
import React, { useState } from "react";
import { Form, useForm } from 'react-hook-form';
import { formSchema } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '@/components/ui/form';

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
      <div className='px-4 lg:px-8'>
          <div>
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm
                grid grid-cols-12 gap-2'>
                  {/* <FormField 
                    name='prompt'
                  /> */}

                </form>
            </Form>
          </div>
      </div>
    </>
  );
};

export default Chat;
