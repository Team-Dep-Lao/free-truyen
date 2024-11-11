import * as React from 'react'

export default function LoadingScreen () {
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 flex min-h-[400px] justify-center bg-white items-center'>
      <div className='size-36 border-2 border-blue-500 border-r-0 animate-spin rounded-full'></div>
    </div>
  )
}