
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import AnswerModal, { AnswerProps } from '../components/AnswerModal'
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Engine } from '@tsparticles/engine'


const ThankYouPage = () => {
  const [, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);


  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [answer, setAnswer] = useState<AnswerProps | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  const handleCheckResult = async () => {
    const actualId = id || localStorage.getItem('userId');
    if (!actualId) return;

    try {
      setLoading(true)
      const res = await fetch(`/api/byid?id=${actualId}`)
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch result')
      }

      setAnswer(data.answer)
      setError(null)
      setShowModal(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => setShowModal(false)

  const handleDelete = () => {
    setShowModal(false)
    router.push('/')
  }

  return (
    <div className="relative min-h-screen">
      <div className="w-full flex justify-center">
                <div className="bg-brand-100 w-full shadow-md py-4 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/company_logo.png"
                    alt="Logo"
                    width={300}
                    height={50}
                    className="h-16 object-contain"
                  />
        </div>
        </div>

      {/* Foreground content */}
      <div className="z-10 flex flex-col items-center justify-center min-h-screen  px-6 py-10 text-center">
        <CheckCircle className="text-green-600 w-16 h-16 sm:w-20 sm:h-20 mb-6 animate-pulse" />

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Thank You!</h1>

        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-sm">
          We appreciate you taking the time to complete the personality test. Your responses have been recorded successfully.
        </p>

        <Button
          onClick={() => router.push('/')}
          className="mt-8 px-5 py-3 text-base sm:text-lg rounded-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white shadow-md transition-all"
        >
          Go to Home
        </Button>

        <Button
          onClick={handleCheckResult}
          className="mt-4 px-5 py-3 text-base sm:text-lg rounded-full bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600 text-white shadow-md transition-all"
        >
          {loading ? 'Loading...' : 'Check Result'}
        </Button>

        {error && <p className="mt-4 text-red-600 font-medium text-sm">{error}</p>}
      </div>

      {showModal && answer && (
        <AnswerModal data={answer} onClose={handleClose} onDelete={handleDelete} />
      )}
    </div>
  )
}

export default ThankYouPage
