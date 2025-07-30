// components/AnswerCard.tsx
import React from 'react'
import { AnswerProps } from './AnswerModal'



interface AnswerCardProps {
  data: AnswerProps
  onClick:()=>void
}

const AnswerCard: React.FC<AnswerCardProps> = ({ data,onClick }) => {
   return (
    <div 
    onClick={onClick}
    className="bg-green-50 border border-brand rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 hover:bg-green-100">
      <h2 className="text-xl font-semibold text-green-800">{data.name}</h2>
      <p className="text-sm text-green-600 mt-1">{data.designation}</p>
    </div>
  )
}

export default AnswerCard
