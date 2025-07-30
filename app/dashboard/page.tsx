'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AnswerCard from '../components/AnswerCard'
import { MaxWidthWrapper } from '../components/MaxWidthWrapper'
import AnswerModal from '../components/AnswerModal'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { Search, LogOut } from 'lucide-react'
import ErrorModal from '../components/ErrorModal'
import InfoModal from '../components/InfoModal'


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
  timeTaken:string
}

const Page = () => {
  const router = useRouter()
  const [authLoading, setAuthLoading] = useState(true)
  const [answers, setAnswers] = useState<AnswerProps[]>([])
  const [searchResults, setSearchResults] = useState<AnswerProps[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerProps | null>(null)
  const [designationVal, setDesignationVal] = useState<string>('All')
  const [searchVal, setSearchVal] = useState<string>('')
  const [error, setError] = useState<string | undefined>(undefined)
  const [visibleInfo, setVisibleInfo] = useState<boolean>(false)
  const [refreshFlag, setRefreshFag] = useState<boolean>(false)
  const [logoutState, setLogoutState] = useState<boolean>(false)

  useEffect(() => {
    const checkAndFetch = async () => {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('authUser123') : null
      if (!stored) {
        router.replace('/adminlogin')
        return
      }

      try {
        setAuthLoading(true)
        const res = await fetch(
          designationVal === 'All'
            ? '/api/data'
            : `/api/data?designation=${designationVal}`
        )
        const result = await res.json()
        setAnswers(result.data || [])
      } catch (error) {
        console.error('❌ Failed to fetch:', error)
        alert('Failed to fetch the data')
      } finally {
        setAuthLoading(false)
      }
    }

    checkAndFetch()
  }, [designationVal, router, refreshFlag])

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchVal.trim() === '') {
        setSearchResults([])
        setShowDropdown(false)
        return
      }

      try {
        const res = await fetch(`/api/data?name=${encodeURIComponent(searchVal)}`)
        const result = await res.json()
        setSearchResults(result.data || [])
      } catch (err) {
        console.error(err)
        setSearchResults([])
      } finally {
        setShowDropdown(true)
      }
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [searchVal])

  const handleLogout = () => {
    setLogoutState(true)
    localStorage.removeItem('authUser123')
    router.replace('/adminlogin')
  }

  if (authLoading) {
    return (
      <MaxWidthWrapper>
        <div className="min-h-screen bg-white w-full flex justify-center items-center flex-col py-10">
          <div className="w-14 h-14 border-4 border-brand border-t-transparent rounded-full animate-spin" />
          <div className="text-center text-2xl text-brand mt-5 font-semibold">
            Fetching data...
          </div>
        </div>
      </MaxWidthWrapper>
    )
  }

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col min-h-screen w-full px-4 py-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <div className="relative w-full md:w-2/3">
            <input
              placeholder="Search..."
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
              onChange={(e) => setSearchVal(e.target.value)}
              value={searchVal}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchResults.length > 0) {
                  setSelectedAnswer(searchResults[0])
                  setSearchVal(searchResults[0].name)
                  setShowDropdown(false)
                  setSearchResults([])
                }
              }}
              onFocus={() => {
                if (searchResults.length > 0) setShowDropdown(true)
              }}
              onBlur={() => {
                setTimeout(() => setShowDropdown(false), 150)
              }}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search className="text-gray-400 hover:text-black cursor-pointer" size={20} />
            </div>

            {showDropdown && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-md border border-gray-200 rounded-md mt-1 z-10 max-h-60 overflow-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedAnswer(result)
                        setSearchVal(result.name)
                        setShowDropdown(false)
                        setSearchResults([])
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                    >
                      {result.name} — <span className="text-gray-500">{result.designation}</span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500 text-sm">No results found</div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-between md:justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{designationVal}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-full">
                <DropdownMenuLabel>Department</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={designationVal} onValueChange={setDesignationVal}>
                  <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Sales">Sales</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Sample Management Cell">Sample Management Cell (SMC)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Enviroment Lab">Environment Lab</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Instrumentation Lab">Instrumentation Lab</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Microbiology Lab">Microbiology Lab</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Molecular biology Lab">Molecular Biology Lab</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Food Lab">Food Lab</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="HR">HR</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Quality">Quality</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Lab Operations">Lab Operations</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Marketing">Marketing</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="IT">IT</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Accounts">Accounts</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Sampling">Sampling</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" onClick={() => setVisibleInfo(true)}>
              Info
            </Button>

            <Button variant="destructive" onClick={handleLogout} className="flex items-center gap-1">
              {logoutState ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogOut size={16} />
                  Logout
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="text-gray-600 text-sm italic">
          Showing {answers.length} {answers.length === 1 ? 'record' : 'records'}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {answers.length > 0 ? (
            answers.map((item, index) => (
              <AnswerCard key={index} data={item} onClick={() => setSelectedAnswer(item)} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No data found
            </p>
          )}
        </div>
      </div>

      {selectedAnswer && (
        <AnswerModal
          data={selectedAnswer}
          onClose={() => {
            setSelectedAnswer(null)
            setSearchVal('')
          }}
          onDelete={() => {
            setSelectedAnswer(null)
            setSearchVal('')
            setRefreshFag(!refreshFlag)
          }}
        />
      )}

      {error && (
        <ErrorModal
          onClose={() => {
            setError(undefined)
            setSearchVal('')
          }}
          data={error}
        />
      )}

      {visibleInfo && (
        <InfoModal onClose={() => setVisibleInfo(false)} />
      )}
    </MaxWidthWrapper>
  )
}

export default Page
