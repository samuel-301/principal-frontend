"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function VerifyPage() {
  const router = useRouter()
  const [otp, setOtp] = useState(Array(8).fill(""))
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const inputRefs = useRef([])

  // Check if user is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

    // Focus next input
    if (element.value && index < 7) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    // Focus previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 8)

    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split("").slice(0, 8)
      const newOtp = [...otp]

      digits.forEach((digit, index) => {
        newOtp[index] = digit
      })

      setOtp(newOtp)

      // Focus the next empty input or the last one
      const nextEmptyIndex = newOtp.findIndex((val) => val === "")
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex].focus()
      } else {
        inputRefs.current[7].focus()
      }
    }
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    setError("")

    const otpValue = otp.join("")
    if (otpValue.length !== 8) {
      setError("Please enter all 8 digits of the verification code")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, any OTP works
      // In a real app, you would validate the OTP with your backend
      localStorage.setItem("is2FAVerified", "true")

      // Redirect to dashboard
      router.push("/")
    } catch (err) {
      setError("Failed to verify code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 h-16 w-16 overflow-hidden rounded-full bg-primary/10">
            <Image
              src="/placeholder.svg?height=64&width=64&text=OS"
              alt="Oakridge School Logo"
              width={64}
              height={64}
            />
          </div>
          <h1 className="text-3xl font-bold">Oakridge School</h1>
          <p className="text-muted-foreground">Two-Factor Authentication</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-2 h-8 w-8" onClick={() => router.push("/login")}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              <div>
                <CardTitle>Verification Required</CardTitle>
                <CardDescription>Enter the 8-digit code sent to your device</CardDescription>
              </div>
            </div>
          </CardHeader>
          <form onSubmit={handleVerify}>
            <CardContent className="space-y-4">
              {error && <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>}

              <div className="flex items-center justify-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Security verification</span>
              </div>

              <div className="flex justify-center gap-2">
                {otp.map((data, index) => (
                  <Input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="h-12 w-12 text-center text-lg"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={index === 0 ? handlePaste : null}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Didn't receive a code?{" "}
                <a href="#" className="text-primary hover:underline">
                  Resend
                </a>
              </p>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
