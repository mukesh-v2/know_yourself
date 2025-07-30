'use client'

import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface InputComponentProps {
  label: string
  placeholder: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  secure?: boolean
  readOnly?: boolean
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
}

const InputComponent: React.FC<InputComponentProps> = ({
  label,
  placeholder,
  value,
  setValue,
  secure = false,
  readOnly = false,
  setError
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full mb-5">
      <label className="ml-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-100"
          placeholder={placeholder}
          type={secure && !showPassword ? 'password' : 'text'}
          value={value}
          readOnly={readOnly}
          disabled={readOnly}
          onChange={(e) => {
            setValue(e.target.value)
            setError(undefined)
          }}
        />
        {secure && !readOnly && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  )
}

export default InputComponent
