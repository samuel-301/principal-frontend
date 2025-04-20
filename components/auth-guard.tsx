"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

export function AuthGuard({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
    const is2FAVerified = localStorage.getItem("is2FAVerified") === "true"

    // Public routes that don't require authentication
    const publicRoutes = ["/login", "/verify"]
    const isPublicRoute = publicRoutes.includes(pathname)

    if (!isAuthenticated && !isPublicRoute) {
      // Redirect to login if not authenticated
      router.push("/login")
    } else if (isAuthenticated && !is2FAVerified && pathname !== "/verify" && !isPublicRoute) {
      // Redirect to 2FA verification if authenticated but not verified
      router.push("/verify")
    } else if (isAuthenticated && is2FAVerified && isPublicRoute) {
      // Redirect to dashboard if already authenticated and verified
      router.push("/")
    }

    setIsLoading(false)
  }, [pathname, router])

  // Show nothing while checking authentication
  if (isLoading) {
    return null
  }

  return children
}
