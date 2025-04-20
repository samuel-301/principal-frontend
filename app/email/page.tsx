"use client"

import { useState } from "react"
import { Archive, Check, Download, Edit, Filter, MoreHorizontal, Search, Star, Trash } from "lucide-react"

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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

// Mock data for emails
const emailsData = [
  {
    id: 1,
    sender: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    subject: "Regarding the upcoming science fair",
    message:
      "Dear Principal,\n\nI wanted to ask about the requirements for the science fair project. My daughter is planning to create a model of the solar system and we need to know the space limitations and presentation requirements.\n\nCould you please provide us with the guidelines?\n\nBest regards,\nSarah Johnson",
    date: "May 10, 2023",
    time: "10:30 AM",
    read: true,
    starred: false,
    important: true,
    category: "parent",
    attachments: [],
  },
  {
    id: 2,
    sender: "Michael Chen",
    email: "michael.chen@example.com",
    subject: "Staff meeting agenda",
    message:
      "Dear All,\n\nHere's the agenda for our upcoming staff meeting scheduled for Friday at 3:00 PM in the conference room.\n\n1. Budget review for Q2\n2. Upcoming events planning\n3. Curriculum updates\n4. Open discussion\n\nPlease come prepared with your department reports.\n\nRegards,\nMichael Chen",
    date: "May 9, 2023",
    time: "2:15 PM",
    read: false,
    starred: true,
    important: true,
    category: "staff",
    attachments: ["meeting_agenda.pdf"],
  },
  {
    id: 3,
    sender: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    subject: "Math department budget request",
    message:
      "Dear Principal,\n\nI'm writing to request additional funding for the math department. We need to purchase new calculators and textbooks for the upcoming academic year.\n\nI've attached a detailed budget proposal for your review.\n\nThank you for your consideration.\n\nBest regards,\nEmily Rodriguez",
    date: "May 8, 2023",
    time: "11:45 AM",
    read: true,
    starred: false,
    important: false,
    category: "staff",
    attachments: ["budget_proposal.xlsx"],
  },
  {
    id: 4,
    sender: "James Wilson",
    email: "james.wilson@example.com",
    subject: "Absence notification",
    message:
      "Dear Principal,\n\nMy son will be absent from school next Monday due to a doctor's appointment. He will return to school on Tuesday.\n\nPlease inform his teachers accordingly.\n\nThank you,\nJames Wilson",
    date: "May 7, 2023",
    time: "9:20 AM",
    read: false,
    starred: false,
    important: false,
    category: "parent",
    attachments: [],
  },
  {
    id: 5,
    sender: "Sophia Patel",
    email: "sophia.patel@example.com",
    subject: "Quarterly review meeting",
    message:
      "Dear Principal,\n\nThe school board would like to schedule the quarterly review meeting for next month. Please let us know your availability during the week of June 15-19.\n\nWe will need to review the academic performance, budget utilization, and upcoming initiatives.\n\nBest regards,\nSophia Patel\nSchool Board Chair",
    date: "May 6, 2023",
    time: "3:30 PM",
    read: true,
    starred: true,
    important: true,
    category: "board",
    attachments: ["quarterly_review_template.docx"],
  },
  {
    id: 6,
    sender: "Robert Kim",
    email: "robert.kim@example.com",
    subject: "Field trip proposal",
    message:
      "Dear Principal,\n\nI'd like to propose a field trip to the science museum for the 10th grade students. The museum has a special exhibition on renewable energy that aligns perfectly with our curriculum.\n\nI've attached a detailed proposal including costs, logistics, and educational objectives.\n\nPlease let me know if this can be approved.\n\nBest regards,\nRobert Kim",
    date: "May 5, 2023",
    time: "1:10 PM",
    read: true,
    starred: false,
    important: false,
    category: "staff",
    attachments: ["field_trip_proposal.pdf"],
  },
]

export default function EmailPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedEmails, setSelectedEmails] = useState([])
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [activeTab, setActiveTab] = useState("inbox")

  // Filter emails based on search term and filters
  const filteredEmails = emailsData.filter((email) => {
    const matchesSearch =
      email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.message.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || email.category === categoryFilter

    if (activeTab === "inbox") return matchesSearch && matchesCategory
    if (activeTab === "starred") return matchesSearch && matchesCategory && email.starred
    if (activeTab === "important") return matchesSearch && matchesCategory && email.important
    if (activeTab === "sent") return false // No sent emails in mock data
    if (activeTab === "drafts") return false // No drafts in mock data

    return matchesSearch && matchesCategory
  })

  // Toggle email selection
  const toggleEmailSelection = (emailId) => {
    if (selectedEmails.includes(emailId)) {
      setSelectedEmails(selectedEmails.filter((id) => id !== emailId))
    } else {
      setSelectedEmails([...selectedEmails, emailId])
    }
  }

  // Select all emails
  const toggleSelectAll = () => {
    if (selectedEmails.length === filteredEmails.length) {
      setSelectedEmails([])
    } else {
      setSelectedEmails(filteredEmails.map((email) => email.id))
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Email</h1>
        <div className="flex items-center gap-2">
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Compose
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email Center</CardTitle>
          <CardDescription>Manage your emails</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Email sidebar */}
            <div className="w-full border-b lg:w-80 lg:border-b-0 lg:border-r">
              <div className="p-4">
                <div className="relative mb-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search emails..."
                    className="w-full pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="mb-4 flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Filter:</span>
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="parent">Parents</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="board">School Board</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Tabs defaultValue="inbox" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="inbox">Inbox</TabsTrigger>
                    <TabsTrigger value="starred">Starred</TabsTrigger>
                    <TabsTrigger value="sent">Sent</TabsTrigger>
                    <TabsTrigger value="drafts">Drafts</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="border-t">
                <div className="flex items-center justify-between border-b p-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedEmails.length === filteredEmails.length && filteredEmails.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                    <span className="text-sm">
                      {selectedEmails.length > 0
                        ? `${selectedEmails.length} selected`
                        : `${filteredEmails.length} emails`}
                    </span>
                  </div>
                  {selectedEmails.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" title="Archive">
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete">
                        <Trash className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Mark as read">
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="max-h-[500px] overflow-y-auto">
                  {filteredEmails.length === 0 ? (
                    <div className="flex h-32 items-center justify-center">
                      <p className="text-muted-foreground">No emails found.</p>
                    </div>
                  ) : (
                    filteredEmails.map((email) => (
                      <div
                        key={email.id}
                        className={`cursor-pointer border-b p-3 transition-colors hover:bg-muted/50 ${
                          !email.read ? "bg-muted/30" : ""
                        } ${selectedEmail?.id === email.id ? "bg-muted" : ""}`}
                        onClick={() => setSelectedEmail(email)}
                      >
                        <div className="flex items-start gap-2">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={selectedEmails.includes(email.id)}
                              onCheckedChange={() => toggleEmailSelection(email.id)}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation()
                                // Toggle star logic would go here
                              }}
                            >
                              <Star className={`h-4 w-4 ${email.starred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                            </Button>
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <div className={`font-medium ${!email.read ? "font-semibold" : ""}`}>{email.sender}</div>
                              <div className="text-xs text-muted-foreground">{email.time}</div>
                            </div>
                            <div className={`${!email.read ? "font-semibold" : ""}`}>{email.subject}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {email.message.split("\n")[0]}
                            </div>
                            <div className="flex items-center gap-2">
                              {email.important && <Badge variant="outline">Important</Badge>}
                              {email.attachments.length > 0 && (
                                <Badge variant="secondary">{email.attachments.length} attachment(s)</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Email content */}
            <div className="flex-1">
              {selectedEmail ? (
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between border-b p-4">
                    <h2 className="text-xl font-semibold">{selectedEmail.subject}</h2>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" title="Archive">
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete">
                        <Trash className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Reply</DropdownMenuItem>
                          <DropdownMenuItem>Forward</DropdownMenuItem>
                          <DropdownMenuItem>Print</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                          <DropdownMenuItem>{selectedEmail.starred ? "Remove star" : "Add star"}</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 border-b p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {selectedEmail.sender.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{selectedEmail.sender}</div>
                      <div className="text-sm text-muted-foreground">{selectedEmail.email}</div>
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">
                      {selectedEmail.date} at {selectedEmail.time}
                    </div>
                  </div>

                  <div className="flex-1 overflow-auto p-4">
                    <div className="whitespace-pre-line">{selectedEmail.message}</div>

                    {selectedEmail.attachments.length > 0 && (
                      <>
                        <Separator className="my-4" />
                        <div>
                          <h3 className="mb-2 font-medium">Attachments</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedEmail.attachments.map((attachment, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 rounded-md border p-2 hover:bg-muted/50"
                              >
                                <div className="text-sm">{attachment}</div>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="border-t p-4">
                    <Button>Reply</Button>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-medium">No email selected</h3>
                    <p className="text-muted-foreground">Select an email from the list to view its contents.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
