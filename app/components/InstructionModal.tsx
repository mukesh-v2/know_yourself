'use client'
import React from 'react'


interface Props{
    onClose:()=>void
}

const InstructionModal = ({onClose}:Props) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8 overflow-y-auto max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-3xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Instructions Before You Start
        </h2>

        <ul className="list-disc pl-6 space-y-3 text-gray-700 text-base">   
          <li className='font-semibold'>The entire test should take around 5 minutes.</li>
          <li>Please ensure that your personal information is pre-filled and correct.</li>
          <li>This test contains 16 multiple choice questions based on your preferences and behavior.</li>
          <li>Each question has options ranging from Strongly Disagree to Strongly Agree.</li>
          <li>There are no right or wrong answers — answer honestly for the best result.</li>
          <li>Once submitted, you will be redirected to a final form to confirm your participation.</li>
          <li>Do not refresh the page during the test.</li>
          <li>Please note that the results of this test are indicative and may not be 100% accurate. They are designed to offer insights based on your responses, but should not be considered a definitive measure of personality.</li>

        </ul>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Click anywhere outside this box to close and begin.</p>
        </div>
      </div>
    </div>
  )
}

export default InstructionModal
