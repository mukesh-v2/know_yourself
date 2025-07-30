'use client'
import React from 'react'

interface QuestionItemProps {
  questionNumber: number
  questionText: string
  selectedValue: number
  onChange: (value: number) => void
  setError?: (val: string | undefined) => void
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  questionNumber,
  questionText,
  selectedValue,
  onChange,
  setError,
}) => {
  return (
    <li className="mb-16 w-full px-4">
      {/* Question Text */}
      <div className="text-center mb-8">
        <p className="text-xl md:text-2xl font-semibold text-gray-800">
          {`Q${questionNumber})`} {questionText}
        </p>
      </div>

      {/* Label + Slider Section */}
      <div className="relative flex flex-col items-center w-full max-w-2xl mx-auto">
        {/* Top row: labels left/right */}
        <div className="w-full flex justify-between items-center px-2 mb-3">
          <span className="text-xs sm:text-sm text-gray-600 font-medium">
            Strongly Disagree
          </span>
          <span className="text-xs sm:text-sm text-gray-600 font-medium">
            Strongly Agree
          </span>
        </div>

        {/* Number scale */}
        <div className="flex justify-between w-full max-w-[20rem] sm:max-w-[24rem] mb-2 text-xs sm:text-sm font-medium text-gray-600 select-none">
          {[1, 2, 3, 4, 5].map((num) => (
            <span key={num}>{num}</span>
          ))}
        </div>

        {/* Slider */}
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={selectedValue}
          onChange={(e) => {
            const val = Number(e.target.value)
            onChange(val)
            setError?.(undefined)
          }}
          className="
            w-full max-w-[20rem] sm:max-w-[24rem] appearance-none bg-transparent
            focus:outline-none transition-all duration-300 ease-in-out

            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:bg-green-600
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:mt-[-6px] 
            [&::-webkit-slider-thumb]:shadow

            [&::-webkit-slider-runnable-track]:h-[6px]
            [&::-webkit-slider-runnable-track]:bg-gray-300
            [&::-webkit-slider-runnable-track]:rounded-full

            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:bg-green-600
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:cursor-pointer

            [&::-moz-range-track]:h-[6px]
            [&::-moz-range-track]:bg-gray-300
            [&::-moz-range-track]:rounded-full
          "
        />
      </div>
    </li>
  )
}

export default QuestionItem
