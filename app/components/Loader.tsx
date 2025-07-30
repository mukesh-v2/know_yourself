// components/Loader.tsx
'use client'
import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-20 w-full">
      <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

export default Loader
