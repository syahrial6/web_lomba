import React from 'react'
import { BookOpen, GraduationCap, PenTool } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full  p-8 rounded-xl">
    {/* Main spinning circle with icons */}
    <div className="relative w-24 h-24">
      {/* Circular track */}
      <div className="absolute inset-0 border-4 border-blue-100 rounded-full" />
      
      {/* Rotating icons */}
      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2s' }}>
        <BookOpen className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-500" />
        <GraduationCap className="absolute top-1/2 right-0 translate-y-1/2 translate-x-1/2 w-6 h-6 text-purple-500" />
        <PenTool className="absolute bottom-0 right-1/2 -translate-x-1/2 translate-y-1/2 w-6 h-6 text-indigo-500" />
      </div>

      {/* Center circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>

    {/* Loading text */}
    <div className="mt-8 text-center">
      <h3 className="text-xl font-bold text-blue-700 mb-2">Memuat Data</h3>
      <div className="flex items-center justify-center space-x-2">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: `${index * 0.2}s` }}
          />
        ))}
      </div>
    </div>

   

   
  </div>
  )
}

export default Loading
