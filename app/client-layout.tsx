"use client"

import { useState } from "react"
import type React from "react"

import { Inter } from "next/font/google"
import { usePathname } from "next/navigation"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { LanguageProvider } from "@/components/language-provider"
import { AuthGuard } from "@/components/auth-guard"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/login" || pathname === "/verify"
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthGuard>
              {isLoginPage ? (
                <div className="flex min-h-screen flex-col">{children}</div>
              ) : (
                <div className="flex min-h-screen flex-col">
                  <div className="flex flex-1">
                    <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                    <div className="flex w-full flex-1 flex-col lg:pl-16 xl:pl-64">
                      <TopBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                      <main className="flex-1 overflow-y-auto bg-muted/40 p-4 md:p-6">{children}</main>
                    </div>
                  </div>
                  <Toaster />
                </div>
              )}
            </AuthGuard>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
