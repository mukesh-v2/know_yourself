'use client'
import React, { useState } from 'react'
import InputComponent from '../components/InputComponent'
import { Button } from '@/components/ui/button'
import Loader from '../components/Loader'
import { useRouter } from 'next/navigation'
import Image from 'next/image'


const Page = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()
  const router = useRouter()

  const handleClick = async () => {
    if (!username) {
      setError('Please enter the username')
      return
    }
    if (!password) {
      setError('Please enter the password')
      return
    }
    try {
      setLoading(true)
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()
      if (data.success) {
        localStorage.setItem(
          'authUser123',
          JSON.stringify({
            username,
            loginTime: Date.now(),
          })
        )
        router.push('/dashboard')
      }
    } catch (error: unknown) {
      if(error instanceof Error)
      {
        console.log(error.message)
      setError(error.message)
      }
      else setError('Unable to login')
    } finally {
      setLoading(false)
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="w-full max-w-md shadow-lg rounded-xl overflow-hidden">
        {/* ✅ Green logo bar */}
        <div className="w-full bg-brand-100 h-20 flex items-center justify-center rounded-t-xl">
          <Image
            src="/company_logo.png"
            alt="Logo" width={200}
            height={50}
            className="transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* ✅ Card content */}
        <div className="bg-white p-6 sm:p-8">
          <div className="text-center text-brand text-3xl sm:text-4xl font-semibold mb-6">
            Admin Login
          </div>

          <div className="flex flex-col gap-4">
            <InputComponent
              label="Username"
              placeholder="Please enter the username"
              value={username}
              setValue={setUsername}
              setError={setError}
            />
            <InputComponent
              label="Password"
              placeholder="Please enter the password"
              value={password}
              setValue={setPassword}
              secure={true}
              setError={setError}
            />
          </div>

          <Button
            className="w-full mt-6 bg-brand text-white text-lg h-12 hover:bg-green-800"
            onClick={handleClick}
          >
            {!isLoading ? 'Login' : <Loader />}
          </Button>

          {error && (
            <div className="text-center text-red-600 mt-4 text-sm">{error}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
