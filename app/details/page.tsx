'use client'

import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'
import {
  getGroupName,
  classifyMBTI,
  transformToChartData,
  getPersonalityType,
  getFullPersonalityDetails,
} from '@/lib/utils'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Loader2, Download } from 'lucide-react'
import { AnswerProps } from '../components/AnswerModal'
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'
import Image from 'next/image'

const DetailsPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [data, setData] = useState<AnswerProps | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)
  const reportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/byid?id=${id}`)
        const result = await res.json()
        if (!res.ok || !result.answer)
          throw new Error(result.error || 'Failed to fetch data')
        setData(result.answer)
      } catch (err: unknown) {
        if(err instanceof Error)
        {
          setError(err.message)
        }
        setError('Unexpected error')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchData()
  }, [id])

 const handleDownload = async () => {
  if (!reportRef.current) return

  try {
    setDownloading(true)

    // Save original styles
    const originalWidth = reportRef.current.style.width
    const originalPadding = reportRef.current.style.padding

    // Temporarily set width for better PDF rendering
    reportRef.current.style.width = '800px'
    reportRef.current.style.padding = '24px'
    reportRef.current.style.backgroundColor = '#ffffff'

    // Scroll to top to ensure full content renders
    window.scrollTo(0, 0)

    const canvas = await html2canvas(reportRef.current, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      allowTaint: true,
      scrollY: 0,
    })

    // Reset styles
    reportRef.current.style.width = originalWidth
    reportRef.current.style.padding = originalPadding

    const imgHeight = canvas.height
    const imgWidth = canvas.width

    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    const margin = 10
    const pdfWidth = pageWidth - margin * 2
    const pdfHeight = pageHeight - margin * 2

    const ratio = pdfWidth / imgWidth
    const scaledHeight = imgHeight * ratio
    const pages = Math.ceil(scaledHeight / pdfHeight)

    for (let i = 0; i < pages; i++) {
      const sliceCanvas = document.createElement('canvas')
      const sliceHeight = pdfHeight / ratio
      sliceCanvas.width = imgWidth
      sliceCanvas.height = sliceHeight

      const ctx = sliceCanvas.getContext('2d')
      if (!ctx) continue

      ctx.drawImage(
        canvas,
        0,
        i * sliceHeight,
        imgWidth,
        sliceHeight,
        0,
        0,
        imgWidth,
        sliceHeight
      )

      const imgData = sliceCanvas.toDataURL('image/png')
      if (i !== 0) pdf.addPage()
      pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth, pdfHeight)
    }

    pdf.save(`${data?.name || 'personality'}-report.pdf`)
  } catch (e) {
    console.error('Download failed:', e)
  } finally {
    setDownloading(false)
  }
}


if (loading) {
  return (
    <div className="flex flex-col min-h-screen bg-white px-4 py-10 items-center">
      {/* Logo centered at the top */}
      <div className="w-full flex justify-center mb-8">
        <Image
          src="/company_logo.png"
          alt="Company Logo"
          className="w-48 h-auto object-contain"
          width={200}
          height={100}
        />
      </div>

      {/* Centered loader and message */}
      <div className="flex flex-col items-center space-y-4 mt-10">
        <Loader2 className="w-10 h-10 animate-spin text-[#16a34a]" />
        <p className="text-gray-700 text-lg font-medium text-center">
          Preparing your report...
        </p>
      </div>
    </div>
  )
}



  if (error || !data) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold text-xl">
        {error || 'Data not found'}
      </div>
    )
  }

  const traits = classifyMBTI(data)
  const chartData = transformToChartData(traits)
  const personalityType = getPersonalityType(data)
  const personality = getFullPersonalityDetails(personalityType?.typeCode)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 text-sm sm:text-base leading-relaxed">
      <div ref={reportRef} className="space-y-12" style={{ width: '100%' }}>
        {/* Logo Header */}
        <div className="w-full flex justify-center border-b pb-4 avoid-break">
          <Image
            src="/company_logo.png"
            alt="Logo"
            width={300}
            height={100}
            className="h-20 object-contain"
          />
        </div>

        {/* Download Button */}
        <div className="flex justify-end">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 bg-[#16a34a] text-white px-4 py-2 rounded-md shadow hover:bg-[#15803d] disabled:opacity-50"
          >
            {downloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {downloading ? 'Generating...' : 'Download Report'}
          </button>
        </div>

        {/* Header */}
        <div className="text-center space-y-2 avoid-break">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#15803d]">
            {data.name}&apos;s Report
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            A deep dive into your personality and how it aligns with company values
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-800 avoid-break">
          <div><span className="font-semibold">Email:</span> {data.email}</div>
          <div><span className="font-semibold">Employee ID:</span> {data.empId}</div>
          <div><span className="font-semibold">Designation:</span> {data.designation2}</div>
          <div><span className="font-semibold">Department:</span> {data.designation}</div>
        </div>

        {/* Traits */}
        <section className="avoid-break">
          <h2 className="text-lg sm:text-2xl font-semibold text-[#15803d] mb-2">Personality Traits</h2>
          <div className="flex flex-wrap gap-2">
            {traits.map((trait, index) => {
              const groupName = getGroupName(trait.group)
              const percent = chartData.find(c => c.name === groupName)?.percentage ?? 0
              return (
                <span
                  key={index}
                  className="bg-[#dcfce7] text-[#15803d] px-3 py-1.5 rounded-full text-sm font-medium shadow"
                >
                  {trait.trait} ({percent}%)
                </span>
              )
            })}
          </div>
        </section>

        {personalityType?.alignedValues && (
          <div className="avoid-break">
            <h2 className="text-lg sm:text-2xl font-semibold  mb-2 text-green-700 ">Company Values Aligned</h2>
            <div className="flex flex-wrap gap-2">
              {personalityType.alignedValues.map((val, idx) => (
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

        {/* Chart */}
        <section className="avoid-break">
          <h2 className="text-lg sm:text-2xl font-semibold text-[#15803d] mb-3">Trait Score Chart</h2>
          <div className="w-full h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(val: number) => [`${val}/20`, 'Score']} />
                <Bar dataKey="score" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Personality Details */}
        {personality && (
          <section className="space-y-6">
            <div className="avoid-break">
              <h2 className="text-2xl sm:text-2xl font-semibold text-[#15803d] mb-5 ">
                About {personalityType?.typeCode}
              </h2>
              <p className="text-gray-800 whitespace-pre-line text-xl">{personality.intro}</p>
            </div>

            <div className="avoid-break">
              <h2 className="text-xl font-semibold text-[#166534]">Strengths</h2>
              <ul className="text-[18px] list-inside text-gray-800 mt-3 space-y-1">
                {personality.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>

            <div className="avoid-break">
              <h2 className="text-xl font-semibold text-[#b91c1c]">Weaknesses</h2>
              <ul className="text-[18px] list-inside text-gray-800 mt-2 space-y-1">
                {personality.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>

            <div className="avoid-break">
              <h2 className="text-xl font-semibold text-[#1e3a8a]">Workplace Habits</h2>
              <p className="mt-1 text-[18px] md:text-[18px] text-gray-800 whitespace-pre-line">
                {personality.workplaceHabits}
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default DetailsPage
