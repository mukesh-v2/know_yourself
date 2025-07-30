'use client'

import React, { useEffect, useState } from 'react'
import { AnswerProps } from '@/app/components/AnswerModal'
import { getPersonalityType, getFullPersonalityDetails } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface PersonalitySummary {
  type: string
  people: AnswerProps[]
}

const COLORS = [
  '#FF6384', '#36A2EB', '#FFCE56', '#8A2BE2',
  '#00C49F', '#FF8042', '#A569BD', '#5DADE2',
  '#58D68D', '#F5B041', '#DC7633', '#AF7AC5',
  '#F1948A', '#45B39D', '#E59866', '#5499C7'
]


const PersonalitySummaryPage: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [summaries, setSummaries] = useState<PersonalitySummary[]>([])
  const values=new Set<string>()
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        const json = await res.json()
        const data: AnswerProps[] = json.data || []

        const grouped: Record<string, AnswerProps[]> = {}

        data.forEach((answer) => {
          const personality = getPersonalityType(answer)
          values.add(personality.type)
          if (personality?.typeCode) {
            if (!grouped[personality.typeCode]) {
              grouped[personality.typeCode] = []
            }
            grouped[personality.typeCode].push(answer)
          }
        })

        const sortedSummaries = Object.entries(grouped)
          .map(([type, people]) => ({ type, people }))
          .sort((a, b) => b.people.length - a.people.length)

        setSummaries(sortedSummaries)
        console.log(values)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  },)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    )
  }

  const pieData = summaries.map(({ type, people }) => {
  const personality = getPersonalityType(people[0]) // Use the first person in the group
  return {
    name: personality?.title || type, // fallback to type if title missing
    value: people.length
  }
})

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-12">Personality Summary</h1>

      <div className="w-full h-96 mb-12">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-12">
        {summaries.map(({ type, people }) => {
          const profile = getFullPersonalityDetails(type)
          const primary = getPersonalityType(people[0])

          return (
            <div
              key={type}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-green-700 mb-2">{primary?.title}</h2>
              <p className="text-sm text-gray-500 italic mb-3">
                Category: {primary?.category} • Core Value: {primary?.value}
              </p>
              <p className="text-gray-800 mb-4">{primary?.description}</p>

              {primary?.alignedValues?.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-md font-semibold text-green-700 mb-1">Aligned Company Values</h3>
                  <div className="flex flex-wrap gap-2">
                    {primary.alignedValues.map((val, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-800 px-3 py-1 text-sm rounded-full font-medium"
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-md font-semibold text-green-700 mb-1">Names</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-800">
                  {people.map((person, i) => (
                    <li key={i}>{person.name} ({person.designation})</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-1">Strengths</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
                    {profile.strengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-red-700 mb-1">Weaknesses</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
                    {profile.weaknesses.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-green-700 mb-1">Workplace Habits</h4>
                  <p className="text-sm text-gray-800 whitespace-pre-line">
                    {profile.workplaceHabits}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
     
    </div>
  )
}

export default PersonalitySummaryPage
