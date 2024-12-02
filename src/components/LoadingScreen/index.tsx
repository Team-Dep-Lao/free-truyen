import { Loader } from 'lucide-react';
import * as React from 'react'

export default function LoadingScreen () {
  return (
    <div className='flex min-h-screen w-screen justify-center bg-white items-center'>
      <Loader className='animate-spin'/>
    </div>
  )
}