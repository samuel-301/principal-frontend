"use client"

import { useState } from "react"
import { Download, Filter, MoreHorizontal, Search, UserPlus } from "lucide-react"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Mock data for students
const studentsData = [
  {
    id: 1,
    name: "Emma Thompson",
    grade: "10",
    class: "10A",
    performance: 92,
    attendance: "98%",
    status: "Active",
    parentName: "Robert & Lisa Thompson",
    contact: "thompson@example.com",
  },
  {
    id: 2,
    name: "Noah Garcia",
    grade: "9",
    class: "9B",
    performance: 85,
    attendance: "95%",
    status: "Active",
    parentName: "Miguel & Sofia Garcia",
    contact: "garcia@example.com",
  },
  {
    id: 3,
    name: "Olivia Wilson",
    grade: "11",
    class: "11A",
    performance: 95,
    attendance: "99%",
    status: "Active",
    parentName: "James & Emily Wilson",
    contact: "wilson@example.com",
  },
  {
    id: 4,
    name: "Liam Johnson",
    grade: "8",
    class: "8C",
    performance: 78,
    attendance: "90%",
    status: "On Leave",
    parentName: "Michael & Sarah Johnson",
    contact: "johnson@example.com",
  },
  {
    id: 5,
    name: "Ava Martinez",
    grade: "12",
    class: "12A",
    performance: 88,
    attendance: "94%",
    status: "Active",
    parentName: "David & Isabella Martinez",
    contact: "martinez@example.com",
  },
  {
    id: 6,
    name: "Ethan Brown",
    grade: "7",
    class: "7B",
    performance: 82,
    attendance: "93%",
    status: "Active",
    parentName: "Christopher & Jessica Brown",
    contact: "brown@example.com",
  },
  {
    id: 7,
    name: "Sophia Lee",
    grade: "10",
    class: "10B",
    performance: 90,
    attendance: "97%",
    status: "Active",
    parentName: "Daniel & Grace Lee",
    contact: "lee@example.com",
  },
  {
    id: 8,
    name: "Mason Taylor",
    grade: "9",
    class: "9A",
    performance: 75,
    attendance: "88%",
    status: "Probation",
    parentName: "William & Olivia Taylor",
    contact: "taylor@example.com",
  },
]

export default function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [gradeFilter, setGradeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter students based on search term and filters
  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.contact.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesGrade = gradeFilter === "all" || student.grade === gradeFilter

    const matchesStatus = statusFilter === "all" || student.status === statusFilter

    return matchesSearch && matchesGrade && matchesStatus
  })

  // Get unique grades and statuses for filters
  const grades = ["all", ...new Set(studentsData.map((student) => student.grade))]
  const statuses = ["all", ...new Set(studentsData.map((student) => student.status))]

  // Function to determine performance color
  const getPerformanceColor = (score) => {
    if (score >= 90) return "bg-green-500"
    if (score >= 80) return "bg-blue-500"
    if (score >= 70) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Student Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Enroll Student
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Directory</CardTitle>
          <CardDescription>Manage all students and their information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search students..."
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
                <Select value={gradeFilter} onValueChange={setGradeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade === "all" ? "All Grades" : `Grade ${grade}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status === "all" ? "All Statuses" : status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Grade/Class</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead className="hidden md:table-cell">Attendance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Parent/Guardian</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No students found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                              <Image
                                src={`/placeholder.svg?height=40&width=40&text=${student.name.charAt(0)}`}
                                width={40}
                                height={40}
                                className="rounded-full"
                                alt={student.name}
                              />
                            </div>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-xs text-muted-foreground">{student.contact}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">Grade {student.grade}</div>
                          <div className="text-xs text-muted-foreground">Class {student.class}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={student.performance}
                              className="h-2 w-[60px]"
                              indicatorClassName={getPerformanceColor(student.performance)}
                            />
                            <span className="text-sm">{student.performance}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{student.attendance}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              student.status === "Active"
                                ? "default"
                                : student.status === "On Leave"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">{student.parentName}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit student</DropdownMenuItem>
                              <DropdownMenuItem>Promote student</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Remove student</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
