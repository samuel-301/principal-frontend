"use client"

import { useState } from "react"
import { AlertCircle, Bell, Calendar, Check, Filter, MoreHorizontal, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for notifications
const notificationsData = [
  {
    id: 1,
    title: "Staff Meeting",
    message: "Reminder: Staff meeting today at 3:00 PM in the conference room.",
    date: "Today, 10:30 AM",
    type: "reminder",
    read: false,
  },
  {
    id: 2,
    title: "Fee Payment Deadline",
    message: "The deadline for term 2 fee payment is approaching (May 15).",
    date: "Yesterday, 2:15 PM",
    type: "alert",
    read: true,
  },
  {
    id: 3,
    title: "System Maintenance",
    message: "The system will be down for maintenance on Saturday from 10 PM to 2 AM.",
    date: "May 2, 9:00 AM",
    type: "system",
    read: false,
  },
  {
    id: 4,
    title: "New Student Enrollment",
    message: "A new student, Emma Johnson, has been enrolled in Grade 10A.",
    date: "May 1, 11:20 AM",
    type: "info",
    read: true,
  },
  {
    id: 5,
    title: "Teacher Absence",
    message: "Mr. Michael Chen will be absent tomorrow. Please arrange for a substitute teacher.",
    date: "April 30, 4:45 PM",
    type: "alert",
    read: false,
  },
  {
    id: 6,
    title: "Parent-Teacher Conference",
    message: "Parent-Teacher conference scheduled for next week. Please prepare student reports.",
    date: "April 29, 1:30 PM",
    type: "reminder",
    read: true,
  },
  {
    id: 7,
    title: "Budget Approval",
    message: "The budget for the science department has been approved.",
    date: "April 28, 10:15 AM",
    type: "info",
    read: true,
  },
  {
    id: 8,
    title: "Emergency Drill",
    message: "An emergency evacuation drill will be conducted tomorrow at 11:00 AM.",
    date: "April 27, 3:00 PM",
    type: "alert",
    read: false,
  },
]

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [readFilter, setReadFilter] = useState("all")

  // Filter notifications based on search term and filters
  const filteredNotifications = notificationsData.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || notification.type === typeFilter

    const matchesRead =
      readFilter === "all" ||
      (readFilter === "read" && notification.read) ||
      (readFilter === "unread" && !notification.read)

    return matchesSearch && matchesType && matchesRead
  })

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "reminder":
        return <Calendar className="h-5 w-5 text-blue-500" />
      case "alert":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "system":
        return <Bell className="h-5 w-5 text-purple-500" />
      case "info":
        return <User className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Mark All as Read</Button>
          <Button>Settings</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Center</CardTitle>
          <CardDescription>View and manage your notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search notifications..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Filter by:</span>
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="reminder">Reminders</SelectItem>
                    <SelectItem value="alert">Alerts</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="info">Information</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={readFilter} onValueChange={setReadFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="unread">Unread</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">
                  Unread{" "}
                  <Badge variant="secondary" className="ml-2">
                    {notificationsData.filter((n) => !n.read).length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="read">Read</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <div className="space-y-4">
                  {filteredNotifications.length === 0 ? (
                    <div className="flex h-32 items-center justify-center rounded-md border">
                      <p className="text-muted-foreground">No notifications found.</p>
                    </div>
                  ) : (
                    filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-4 rounded-lg border p-4 ${
                          !notification.read ? "bg-muted/30" : ""
                        }`}
                      >
                        <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{notification.title}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{notification.date}</span>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">More options</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Check className="mr-2 h-4 w-4" />
                                    Mark as {notification.read ? "unread" : "read"}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <div className="flex items-center gap-2 pt-1">
                            <Badge variant="outline" className="capitalize">
                              {notification.type}
                            </Badge>
                            {!notification.read && <Badge>New</Badge>}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
              <TabsContent value="unread" className="mt-4">
                <div className="space-y-4">
                  {filteredNotifications.filter((n) => !n.read).length === 0 ? (
                    <div className="flex h-32 items-center justify-center rounded-md border">
                      <p className="text-muted-foreground">No unread notifications.</p>
                    </div>
                  ) : (
                    filteredNotifications
                      .filter((n) => !n.read)
                      .map((notification) => (
                        <div key={notification.id} className="flex items-start gap-4 rounded-lg border bg-muted/30 p-4">
                          <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{notification.title}</p>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">{notification.date}</span>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">More options</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>
                                      <Check className="mr-2 h-4 w-4" />
                                      Mark as read
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                            <div className="flex items-center gap-2 pt-1">
                              <Badge variant="outline" className="capitalize">
                                {notification.type}
                              </Badge>
                              <Badge>New</Badge>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </TabsContent>
              <TabsContent value="read" className="mt-4">
                <div className="space-y-4">
                  {filteredNotifications.filter((n) => n.read).length === 0 ? (
                    <div className="flex h-32 items-center justify-center rounded-md border">
                      <p className="text-muted-foreground">No read notifications.</p>
                    </div>
                  ) : (
                    filteredNotifications
                      .filter((n) => n.read)
                      .map((notification) => (
                        <div key={notification.id} className="flex items-start gap-4 rounded-lg border p-4">
                          <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{notification.title}</p>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">{notification.date}</span>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">More options</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>
                                      <Check className="mr-2 h-4 w-4" />
                                      Mark as unread
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                            <div className="flex items-center gap-2 pt-1">
                              <Badge variant="outline" className="capitalize">
                                {notification.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
