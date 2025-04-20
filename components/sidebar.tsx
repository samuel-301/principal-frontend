"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Bell,
  Calendar,
  CreditCard,
  Home,
  LayoutDashboard,
  Mail,
  MessageSquare,
  School,
  Settings,
  User,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLanguage } from "@/components/language-provider"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Staff Management",
    href: "/staff",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Student Management",
    href: "/students",
    icon: <School className="h-5 w-5" />,
  },
  {
    title: "Reports & Analytics",
    href: "/reports",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Fee Management",
    href: "/fees",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    title: "Calendar & Events",
    href: "/calendar",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Messaging System",
    href: "/messages",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    title: "Email",
    href: "/email",
    icon: <Mail className="h-5 w-5" />,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: <User className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

export function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { t } = useLanguage()

  const sidebarLinks = [
    {
      title: t("dashboard"),
      href: "/",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: t("staff"),
      href: "/staff",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: t("students"),
      href: "/students",
      icon: <School className="h-5 w-5" />,
    },
    {
      title: t("reports"),
      href: "/reports",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: t("fees"),
      href: "/fees",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: t("calendar"),
      href: "/calendar",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: t("messages"),
      href: "/messages",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: t("notifications"),
      href: "/notifications",
      icon: <Bell className="h-5 w-5" />,
    },
    {
      title: t("email"),
      href: "/email",
      icon: <Mail className="h-5 w-5" />,
    },
    {
      title: t("profile"),
      href: "/profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      title: t("settings"),
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r bg-background transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">Oakridge School</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="flex flex-col gap-1 p-2">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
                  pathname === link.href ? "bg-muted font-medium" : "text-muted-foreground",
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Desktop sidebar */}
      <div
        className={cn(
          "fixed hidden h-screen border-r bg-background lg:block transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/" className="flex items-center gap-2">
            {!isCollapsed && <span className="text-xl font-bold">Oakridge School</span>}
            {isCollapsed && <Home className="h-6 w-6" />}
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8">
            {isCollapsed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            )}
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="flex flex-col gap-1 p-2">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
                  pathname === link.href ? "bg-muted font-medium" : "text-muted-foreground",
                )}
              >
                {link.icon}
                {!isCollapsed && <span>{link.title}</span>}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  )
}
