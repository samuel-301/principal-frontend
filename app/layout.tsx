import type React from "react"
import "./globals.css"
import ClientLayout from "./client-layout"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}

export const metadata = {
      generator: 'v0.dev'
    };
