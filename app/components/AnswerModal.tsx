'use client'

import React, { useState } from 'react'
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  classifyMBTI,
  transformToChartData,
  getGroupName,
  getPersonalityType,
} from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

export interface AnswerProps {
  _id?: string
  name: string
  designation: string
  answerOne: number
  answerTwo: number
  answerThree: number
  answerFour: number
  answerFive: number
  answerSix: number
  answerSeven: number
  answerEight: number
  answerNine: number
  answerTen: number
  answerEleven: number
  answerTwelve: number
  answerThirteen: number
  answerFourteen: number
  answerFifteen: number
  answerSixteen: number
  email: string
  empId: string
  designation2: string
  timeTaken: string
}

interface Props {
  data: AnswerProps
  onClose: () => void
  onDelete: () => void
}

const AnswerModal: React.FC<Props> = ({ data, onClose, onDelete }) => {
  const traits = classifyMBTI(data)
  const chartData = transformToChartData(traits)
  const personality = getPersonalityType(data)
  const router = useRouter()

  const [isDeleting, setIsDeleting] = useState(false)
  const pathname = usePathname()
  const isThanksPage = pathname.includes('/thanks')
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)

  const handleDelete = async () => {
    const confirmDelete = confirm(`Are you sure you want to delete ${data.name}'s response?`)
    if (!confirmDelete) return

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/delete?id=${data._id}`, {
        method: 'DELETE',
      })

      const result = await res.json()
      if (result.success) {
        alert('Deleted successfully!')
        onDelete()
      } else {
        alert('Delete failed: ' + result.message)
      }
    } catch (err: unknown) {
      console.error(err)
      alert('Something went wrong while deleting.')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDetails = () => {
    if (data._id) {
      setIsLoadingDetails(true)
      router.push(`/details?id=${data._id}`)
    }
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-4xl h-[92vh] rounded-xl shadow-2xl p-6 overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-3xl font-bold"
        >
          ×
        </button>

        <div className="mb-6 border-b pb-4">
          <h1 className="text-3xl font-bold text-green-700">{data.name}</h1>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
            <div><strong>Email:</strong> {data.email}</div>
            <div><strong>Employee ID:</strong> {data.empId}</div>
            <div><strong>Designation:</strong> {data.designation2}</div>
            <div><strong>Department:</strong> {data.designation}</div>
            {data.timeTaken && (() => {
              const [minStr] = data.timeTaken.split('m');
              const minutes = parseInt(minStr || '0', 10);
              const timeColor = minutes >= 5 ? 'text-red-800' : 'text-green-800';
              return (
                <div className={`col-span-2 mt-1 ${timeColor} text-sm font-medium`}>
                  <strong>Time Taken:</strong> {data.timeTaken}
                </div>
              );
            })()}
          </div>
        </div>

        {personality && (
          <div className="mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold text-green-800 mb-2">Personality Type</h2>
            <p className="text-gray-800">
              <strong>{personality.type}</strong> – <strong>{personality.title}</strong>
              <br />
              <span className="text-sm text-gray-600">{personality.description}</span>
              <br />
              <span className="text-sm italic text-gray-500">
                {personality.category} ({personality.value})
              </span>
            </p>
          </div>
        )}

        {personality?.alignedValues && (
          <div className="mb-6">
            <h3 className="text-md font-semibold text-green-700">Company Values Aligned</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {personality.alignedValues.map((val, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-3 py-1 text-sm rounded-full font-medium shadow"
                >
                  {val}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-green-800 mb-3">Personality Traits</h2>
          <div className="flex flex-wrap gap-3">
            {traits.map((trait, index) => {
              const groupName = getGroupName(trait.group)
              const percent = chartData.find(c => c.name === groupName)?.percentage ?? 0
              return (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium shadow"
                >
                  {trait.trait} ({percent}%)
                </span>
              )
            })}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-green-800 mb-3">Personality Trait Scores</h2>
          <div className="w-full overflow-x-auto">
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ fontSize: '12px' }}
                    formatter={(value: number) =>
                      [`${value} (${Math.round((value / 20) * 100)}%)`, 'Score']
                    }
                  />
                  <Bar dataKey="score" fill="#34D399" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {!isThanksPage && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow flex items-center gap-2 disabled:opacity-50"
            >
              {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isDeleting ? 'Deleting...' : 'Delete Response'}
            </button>
          )}
          <button
            onClick={handleDetails}
            disabled={isLoadingDetails}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow flex items-center gap-2 disabled:opacity-50"
          >
            {isLoadingDetails && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoadingDetails ? 'Opening...' : 'Full Personality Report'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AnswerModal
