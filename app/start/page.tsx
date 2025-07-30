'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import InputComponent from '../components/InputComponent'
import Loader from '../components/Loader'

const StartPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [empId, setEmpId] = useState('')
  const [designation, setDesignation] = useState('')
  const [department, setDepartment] = useState('')
  const [error, setError] = useState<string | undefined>()
  const [isLoading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const handleStart = async () => {
    if (!name || !email || !empId || !designation || !department) {
      setError('Please fill out all fields')
      return
    }

    try {
      setLoading(true)
      const res = await fetch(`/api/email?email=${encodeURIComponent(email)}`)
      const data = await res.json()

      if (res.ok && data.success && data.answer.length > 0) {
        const latest = data.answer[0]
        router.push(`/thanks?id=${latest._id}`)
        return
      }

      const query = new URLSearchParams({
        name,
        email,
        empId,
        designation,
        department
      }).toString()

      router.push(`/testPage?${query}`)

    } catch (error) {
      console.error('Error checking email:', error)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-start justify-center min-h-[calc(100vh-4rem)] bg-white px-4 pt-4">
      <div className="w-full max-w-lg space-y-4">
        <h1 className="text-2xl font-bold text-center text-green-700">
          Enter Your Details
        </h1>

        <InputComponent
          label="Name"
          placeholder="Please enter your name"
          value={name}
          setValue={setName}
          setError={setError}
        />

        {/* Department Dropdown */}
        <div>
          <label className="text-sm font-medium text-gray-700">Department</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full mt-1">
                {department || 'Select...'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuLabel>Department</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={department} onValueChange={setDepartment}>
                {[
                  'Sales', 'Sample Management Cell', 'Enviroment Lab',
                  'Instrumentation Lab', 'Microbiology Lab', 'Molecular biology Lab',
                  'Food Lab', 'HR', 'Quality', 'Lab Operations', 'Marketing',
                  'IT', 'Accounts', 'Sampling'
                ].map(dept => (
                  <DropdownMenuRadioItem key={dept} value={dept}>
                    {dept}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <InputComponent
          label="Email"
          placeholder="Please enter your email"
          value={email}
          setValue={setEmail}
          setError={setError}
        />
        <InputComponent
          label="Employee ID"
          placeholder="Please enter your employee code"
          value={empId}
          setValue={setEmpId}
          setError={setError}
        />
        <InputComponent
          label="Designation"
          placeholder="Please enter your designation"
          value={designation}
          setValue={setDesignation}
          setError={setError}
        />

        {error && (
          <div className="text-center text-red-700 mt-2 text-sm font-medium">
            {error}
          </div>
        )}

        <Button
          onClick={handleStart}
          disabled={isLoading}
          className="w-full px-6 py-3 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-brand to-brand-100 hover:from-brand-100 hover:to-brand-100 shadow-xl rounded-full transition-all duration-300 flex justify-center items-center gap-3 h-12 mt-4"
        >
          {isLoading ? <Loader /> : 'Take Test'}
        </Button>
      </div>
    </div>
  )
}

export default StartPage
