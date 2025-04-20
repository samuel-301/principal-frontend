"use client"

import { useState } from "react"
import { Archive, Edit, Inbox, MoreHorizontal, Search, Send, Star, Trash } from "lucide-react"
import Image from "next/image"

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
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

// Mock data for messages
const messagesData = [
  {
    id: 1,
    sender: "Sarah Johnson",
    role: "Parent",
    subject: "Regarding the upcoming science fair",
    preview: "I wanted to ask about the requirements for the science fair project...",
    date: "May 10, 2023",
    read: true,
    starred: false,
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
  },
  {
    id: 2,
    sender: "Michael Chen",
    role: "Teacher",
    subject: "Staff meeting agenda",
    preview: "Here's the agenda for our upcoming staff meeting scheduled for Friday...",
    date: "May 9, 2023",
    read: false,
    starred: true,
    avatar: "/placeholder.svg?height=40&width=40&text=MC",
  },
  {
    id: 3,
    sender: "Emily Rodriguez",
    role: "Teacher",
    subject: "Math department budget request",
    preview: "I'm writing to request additional funding for the math department...",
    date: "May 8, 2023",
    read: true,
    starred: false,
    avatar: "/placeholder.svg?height=40&width=40&text=ER",
  },
  {
    id: 4,
    sender: "James Wilson",
    role: "Parent",
    subject: "Absence notification",
    preview: "My son will be absent from school next Monday due to a doctor's appointment...",
    date: "May 7, 2023",
    read: false,
    starred: false,
    avatar: "/placeholder.svg?height=40&width=40&text=JW",
  },
  {
    id: 5,
    sender: "Sophia Patel",
    role: "School Board",
    subject: "Quarterly review meeting",
    preview: "The school board would like to schedule the quarterly review meeting...",
    date: "May 6, 2023",
    read: true,
    starred: true,
    avatar: "/placeholder.svg?height=40&width=40&text=SP",
  },
  {
    id: 6,
    sender: "Robert Kim",
    role: "Teacher",
    subject: "Field trip proposal",
    preview: "I'd like to propose a field trip to the science museum for the 10th grade...",
    date: "May 5, 2023",
    read: true,
    starred: false,
    avatar: "/placeholder.svg?height=40&width=40&text=RK",
  },
]

export default function MessagingSystem() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [activeTab, setActiveTab] = useState("inbox")

  // Filter messages based on search term and active tab
  const filteredMessages = messagesData.filter((message) => {
    const matchesSearch =
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "inbox") return matchesSearch
    if (activeTab === "starred") return matchesSearch && message.starred
    if (activeTab === "sent") return false // No sent messages in mock data
    if (activeTab === "drafts") return false // No drafts in mock data

    return matchesSearch
  })

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Messaging System</h1>
        <Button>
          <Edit className="mr-2 h-4 w-4" />
          Compose
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Messages</CardTitle>
              <Badge variant="secondary">{messagesData.filter((m) => !m.read).length} new</Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="inbox" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="inbox">
                  <Inbox className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Inbox</span>
                </TabsTrigger>
                <TabsTrigger value="starred">
                  <Star className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Starred</span>
                </TabsTrigger>
                <TabsTrigger value="sent">
                  <Send className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Sent</span>
                </TabsTrigger>
                <TabsTrigger value="drafts">
                  <Edit className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Drafts</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="inbox" className="m-0">
                <div className="max-h-[500px] overflow-y-auto">
                  {filteredMessages.length === 0 ? (
                    <div className="flex h-32 items-center justify-center">
                      <p className="text-muted-foreground">No messages found.</p>
                    </div>
                  ) : (
                    filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`cursor-pointer border-b p-3 transition-colors hover:bg-muted/50 ${
                          !message.read ? "bg-muted/30" : ""
                        } ${selectedMessage?.id === message.id ? "bg-muted" : ""}`}
                        onClick={() => setSelectedMessage(message)}
                      >
                        <div className="flex items-start gap-3">
                          <Image
                            src={message.avatar || "/placeholder.svg"}
                            width={40}
                            height={40}
                            className="rounded-full"
                            alt={message.sender}
                          />
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">{message.sender}</div>
                              <div className="text-xs text-muted-foreground">{message.date}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{message.role}</span>
                              {message.starred && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                            </div>
                            <div className="font-medium">{message.subject}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1">{message.preview}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
              <TabsContent value="starred" className="m-0">
                <div className="max-h-[500px] overflow-y-auto">
                  {filteredMessages.length === 0 ? (
                    <div className="flex h-32 items-center justify-center">
                      <p className="text-muted-foreground">No starred messages.</p>
                    </div>
                  ) : (
                    filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`cursor-pointer border-b p-3 transition-colors hover:bg-muted/50 ${
                          !message.read ? "bg-muted/30" : ""
                        } ${selectedMessage?.id === message.id ? "bg-muted" : ""}`}
                        onClick={() => setSelectedMessage(message)}
                      >
                        <div className="flex items-start gap-3">
                          <Image
                            src={message.avatar || "/placeholder.svg"}
                            width={40}
                            height={40}
                            className="rounded-full"
                            alt={message.sender}
                          />
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">{message.sender}</div>
                              <div className="text-xs text-muted-foreground">{message.date}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{message.role}</span>
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            </div>
                            <div className="font-medium">{message.subject}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1">{message.preview}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
              <TabsContent value="sent" className="m-0">
                <div className="flex h-32 items-center justify-center">
                  <p className="text-muted-foreground">No sent messages.</p>
                </div>
              </TabsContent>
              <TabsContent value="drafts" className="m-0">
                <div className="flex h-32 items-center justify-center">
                  <p className="text-muted-foreground">No draft messages.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          {selectedMessage ? (
            <>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{selectedMessage.subject}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Archive className="mr-2 h-4 w-4" />
                        <span>Archive</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Star className="mr-2 h-4 w-4" />
                        <span>{selectedMessage.starred ? "Unstar" : "Star"}</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>
                  From: {selectedMessage.sender} ({selectedMessage.role})
                </CardDescription>
                <CardDescription>Date: {selectedMessage.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <p className="whitespace-pre-line">
                      Dear Principal,
                      <br />
                      <br />
                      {selectedMessage.preview}
                      <br />
                      <br />
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat.
                      <br />
                      <br />
                      Best regards,
                      <br />
                      {selectedMessage.sender}
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Reply</h3>
                    <Textarea placeholder="Type your reply here..." rows={5} />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Save Draft</Button>
                      <Button>
                        <Send className="mr-2 h-4 w-4" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex h-full items-center justify-center p-6">
              <div className="text-center">
                <h3 className="text-lg font-medium">No message selected</h3>
                <p className="text-muted-foreground">Select a message from the list to view its contents.</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
