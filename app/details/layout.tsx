import Image from "next/image"
import { Suspense } from "react"

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="min-h-screen">
      <body>
        {/* Suspense boundary for client-side components */}
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center min-h-[50vh] py-10">
              <Image
                src="/company_logo.png"
                alt="Logo"
                width={120}
                height={40}
                className="mb-6 animate-pulse"
              />
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-gray-600 font-medium">Loading your experience...</p>
            </div>
          }
        >
          {children}
        </Suspense>
      </body>
    </html>
  )
}
