'use client'

import React, { useEffect, useState, useRef } from 'react'
import { MaxWidthWrapper } from '../components/MaxWidthWrapper'
import InputComponent from '../components/InputComponent'
import QuestionItem from '../components/MCQComponent'
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
import { useRouter, useSearchParams } from 'next/navigation'
import { AnswerProps } from '../components/AnswerModal'
import InstructionModal from '../components/InstructionModal'
import { formatTime } from '@/lib/utils'

const Page = () => {
  const [name, setName] = useState('')
  const [designationVal, setDesignationVal] = useState('')
  const [email, setEmail] = useState('')
  const [empId, setEmpId] = useState('')
  const [des, setDes] = useState('')
  const [instruct, setInstruct] = useState<boolean>(true)
  const router=useRouter();

  const [q1, setQ1] = useState<number>(3)
  const [q2, setQ2] = useState(3)
  const [q3, setQ3] = useState(3)
  const [q4, setQ4] = useState(3)
  const [q5, setQ5] = useState(3)
  const [q6, setQ6] = useState(3)
  const [q7, setQ7] = useState(3)
  const [q8, setQ8] = useState(3)
  const [q9, setQ9] = useState(3)
  const [q10, setQ10] = useState(3)
  const [q11, setQ11] = useState(3)
  const [q12, setQ12] = useState(3)
  const [q13, setQ13] = useState(3)
  const [q14, setQ14] = useState(3)
  const [q15, setQ15] = useState(3)
  const [q16, setQ16] = useState(3)

  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)

  const searchParams = useSearchParams()

  // TIMER state + ref
  const [timer, setTimer] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)
  }

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const handleInstructionClose = () => {
    setInstruct(false)
    startTimer()
  }

  useEffect(() => {
    setName(searchParams.get('name') || '')
    setEmail(searchParams.get('email') || '')
    setEmpId(searchParams.get('empId') || '')
    setDes(searchParams.get('designation') || '')
    setDesignationVal(searchParams.get('department') || '')
  }, [searchParams])

  // Open confirm modal on submit click
  const onSubmitClick = () => {
    setError(undefined)
    if (
      !name ||
      !designationVal ||
      !des ||
      !email ||
      !empId
    ) {
      setError('Please fill out all the fields')
      return
    }
    setIsModalOpen(true)
  }

  // Actual submit handler after confirmation
  const handleConfirmSubmit = async () => {
    setLoading(true)
    const formattedTime = formatTime(timer)
    stopTimer()

    const payload: AnswerProps = {
      name,
      designation: designationVal,
      answerOne: q1,
      answerTwo: q2,
      answerThree: q3,
      answerFour: q4,
      answerFive: q5,
      answerSix: q6,
      answerSeven: q7,
      answerEight: q8,
      answerNine: q9,
      answerTen: q10,
      answerEleven: q11,
      answerTwelve: q12,
      answerThirteen: q13,
      answerFourteen: q14,
      answerFifteen: q15,
      answerSixteen: q16,
      designation2: des,
      empId: empId,
      email: email,
      timeTaken: formattedTime
    }

    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Something went wrong')

      setName('')
      setDesignationVal('')
      setQ1(3)
      setQ2(3)
      setQ3(3)
      setQ4(3)
      setQ5(3)
      setQ6(3)
      setQ7(3)
      setQ8(3)
      setQ9(3)
      setQ10(3)
      setQ11(3)
      setQ12(3)
      setQ13(3)
      setQ14(3)
      setQ15(3)
      setQ16(3)
      localStorage.setItem('userId', result.answer._id)
      setIsModalOpen(false)
      //window.location.href = 'https://forms.gle/hrxNhGzUtXYMwyA39'
      router.replace("/thanks")
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`)
      } else alert('Error: Unable to submit')
    } finally {
      setLoading(false)
    }
  }

  // Modal JSX
  const Modal = () => {
    if (!isModalOpen) return null
    return (
      <div
        className="fixed inset-0 border-2 border-black bg-gray-50/70 bg-blur bg-opacity-70 flex items-center justify-center z-50"
        onClick={() => {
          if (!isLoading) setIsModalOpen(false)
        }}
      >
        <div
          className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
        >
          <h3
            id="modal-title"
            className="text-lg font-semibold text-gray-900"
          >
            Confirm Submission
          </h3>
          <p id="modal-desc" className="mt-2 text-gray-600">
            Are you sure you want to submit your answers? This action cannot be
            undone.
          </p>
          <div className="mt-4 flex justify-end gap-4">
            <button
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
              onClick={() => !isLoading && setIsModalOpen(false)}
              disabled={isLoading}
              type="button"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-md bg-green-700 text-white hover:bg-green-800 disabled:opacity-50 flex items-center gap-2"
              onClick={handleConfirmSubmit}
              disabled={isLoading}
              type="button"
            >
              {isLoading ? (
                <>
                  <div className="flex justify-center items-center h-5 w-full">
              <div className="w-8 h-8 border-4 border-white   border-t-transparent rounded-full animate-spin"></div>
                </div>
                </>
              ) : (
                'Confirm'
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <MaxWidthWrapper className="mt-10 lg:mt-10 w-full min-h-screen px-4 ">
      <div className="flex flex-col space-y-4 w-full">
        <InputComponent
          label="Name"
          placeholder="Please enter your name"
          value={name}
          setValue={() => {}}
          setError={setError}
          readOnly
        />

        <InputComponent
          label="Designation"
          placeholder="Please enter your designation"
          value={des}
          setValue={() => {}}
          setError={setError}
          readOnly
        />

        <InputComponent
          label="Employee Code"
          placeholder="Please enter your employee code"
          value={empId}
          setValue={() => {}}
          setError={setError}
          readOnly
        />

        <InputComponent
          label="Email"
          placeholder="Please enter your email"
          value={email}
          setValue={() => {}}
          setError={setError}
          readOnly
        />

        {/* Department Label */}
        <label className="text-sm font-medium text-gray-700">
          Please select your department
        </label>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full" disabled>
              {designationVal || 'Select...'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            <DropdownMenuLabel>Department</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={designationVal}>
              {[
                'Sales',
                'Sample Management Cell',
                'Enviroment Lab',
                'Instrumentation Lab',
                'Microbiology Lab',
                'Molecular biology Lab',
                'Food Lab',
                'HR',
                'Quality',
                'Lab Operations',
                'Marketing',
                'IT',
                'Accounts',
                'Sampling'
              ].map((dept) => (
                <DropdownMenuRadioItem key={dept} value={dept} disabled>
                  {dept}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Questions */}
        <ol className="mt-5 space-y-6">
          <QuestionItem
            questionNumber={1}
            questionText="I find the idea of networking or promoting yourself to strangers very interesting."
            selectedValue={q1}
            onChange={setQ1}
            setError={setError}
          />
          <QuestionItem
            questionNumber={2}
            questionText="People's stories and emotions speak louder to you than numbers or data."
            selectedValue={q2}
            onChange={setQ2}
            setError={setError}
          />
          <QuestionItem
            questionNumber={3}
            questionText="You are interested in discussions and various interpretation of creative works."
            selectedValue={q3}
            onChange={setQ3}
            setError={setError}
          />
          <QuestionItem
            questionNumber={4}
            questionText="You enjoy discussions about abstract ideas."
            selectedValue={q4}
            onChange={setQ4}
            setError={setError}
          />
          <QuestionItem
            questionNumber={5}
            questionText="I often find myself focusing on current details rather than thinking about future possibilities."
            selectedValue={q5}
            onChange={setQ5}
            setError={setError}
          />
          <QuestionItem
            questionNumber={6}
            questionText="I trust theoretical explanation more than experience."
            selectedValue={q6}
            onChange={setQ6}
            setError={setError}
          />
          <QuestionItem
            questionNumber={7}
            questionText="I'm more interested in what could be than what is."
            selectedValue={q7}
            onChange={setQ7}
            setError={setError}
          />
          <QuestionItem
            questionNumber={8}
            questionText="I like to imagine future scenarios and possibilities"
            selectedValue={q8}
            onChange={setQ8}
            setError={setError}
          />
          <QuestionItem
            questionNumber={9}
            questionText="You cannot imagine yourself writing fictional stories for a living"
            selectedValue={q9}
            onChange={setQ9}
            setError={setError}
          />
          <QuestionItem
            questionNumber={10}
            questionText="You rarely second-guess your choices."
            selectedValue={q10}
            onChange={setQ10}
            setError={setError}
          />
          <QuestionItem
            questionNumber={11}
            questionText="I believe fairness means considering individual needs."
            selectedValue={q11}
            onChange={setQ11}
            setError={setError}
          />
          <QuestionItem
            questionNumber={12}
            questionText="I often adjust behavior to maintain harmony."
            selectedValue={q12}
            onChange={setQ12}
            setError={setError}
          />
          <QuestionItem
            questionNumber={13}
            questionText="I like to keep my options open."
            selectedValue={q13}
            onChange={setQ13}
            setError={setError}
          />
          <QuestionItem
            questionNumber={14}
            questionText="I sometimes leave things unfinished if I lose interest."
            selectedValue={q14}
            onChange={setQ14}
            setError={setError}
          />
          <QuestionItem
            questionNumber={15}
            questionText="I find last-minute changes exciting."
            selectedValue={q15}
            onChange={setQ15}
            setError={setError}
          />
          <QuestionItem
            questionNumber={16}
            questionText="I like to leave room for improvisation in my day."
            selectedValue={q16}
            onChange={setQ16}
            setError={setError}
          />
        </ol>

        {error && (
          <div className="text-center text-red-700 mt-2 text-lg">{error}</div>
        )}

        <Button
          className="mt-4 bg-green-700 text-white lg:h-12 h-10 hover:bg-green-800 w-full"
          onClick={onSubmitClick}
        >
          Submit
        </Button>

        {instruct && (
          <InstructionModal onClose={handleInstructionClose} />
        )}

        {/* Custom Modal */}
        <Modal />
      </div>
    </MaxWidthWrapper>
  )
}

export default Page
