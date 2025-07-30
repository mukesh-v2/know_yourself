import React from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  data: string
  onClose: () => void
}

const ErrorModal = ({ data, onClose }: Props) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center transition-opacity duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-md md:max-w-xl rounded-2xl shadow-xl p-8 relative animate-fadeIn"
      >
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-16 w-16 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-center text-red-600 mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-700 text-center mb-4">{data}</p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorModal
