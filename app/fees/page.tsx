"use client"

import { useState } from "react"
import { Download, Filter, MoreHorizontal, Plus, Search } from "lucide-react"

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

// Mock data for fee records
const feeData = [
  {
    id: 1,
    studentName: "Emma Thompson",
    grade: "10",
    class: "10A",
    term: "Term 2",
    amount: 1200,
    paid: 1200,
    dueDate: "2023-04-15",
    status: "Paid",
  },
  {
    id: 2,
    studentName: "Noah Garcia",
    grade: "9",
    class: "9B",
    term: "Term 2",
    amount: 1200,
    paid: 600,
    dueDate: "2023-04-15",
    status: "Partially Paid",
  },
  {
    id: 3,
    studentName: "Olivia Wilson",
    grade: "11",
    class: "11A",
    term: "Term 2",
    amount: 1500,
    paid: 1500,
    dueDate: "2023-04-15",
    status: "Paid",
  },
  {
    id: 4,
    studentName: "Liam Johnson",
    grade: "8",
    class: "8C",
    term: "Term 2",
    amount: 1000,
    paid: 0,
    dueDate: "2023-04-15",
    status: "Pending",
  },
  {
    id: 5,
    studentName: "Ava Martinez",
    grade: "12",
    class: "12A",
    term: "Term 2",
    amount: 1500,
    paid: 1500,
    dueDate: "2023-04-15",
    status: "Paid",
  },
  {
    id: 6,
    studentName: "Ethan Brown",
    grade: "7",
    class: "7B",
    term: "Term 2",
    amount: 1000,
    paid: 0,
    dueDate: "2023-04-15",
    status: "Overdue",
  },
  {
    id: 7,
    studentName: "Sophia Lee",
    grade: "10",
    class: "10B",
    term: "Term 2",
    amount: 1200,
    paid: 600,
    dueDate: "2023-04-15",
    status: "Partially Paid",
  },
  {
    id: 8,
    studentName: "Mason Taylor",
    grade: "9",
    class: "9A",
    term: "Term 2",
    amount: 1200,
    paid: 0,
    dueDate: "2023-04-15",
    status: "Overdue",
  },
]

export default function FeeManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [gradeFilter, setGradeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter fee records based on search term and filters
  const filteredFees = feeData.filter((fee) => {
    const matchesSearch =
      fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.term.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesGrade = gradeFilter === "all" || fee.grade === gradeFilter

    const matchesStatus = statusFilter === "all" || fee.status === statusFilter

    return matchesSearch && matchesGrade && matchesStatus
  })

  // Get unique grades and statuses for filters
  const grades = ["all", ...new Set(feeData.map((fee) => fee.grade))]
  const statuses = ["all", ...new Set(feeData.map((fee) => fee.status))]

  // Calculate summary statistics
  const totalAmount = feeData.reduce((sum, fee) => sum + fee.amount, 0)
  const totalCollected = feeData.reduce((sum, fee) => sum + fee.paid, 0)
  const totalPending = totalAmount - totalCollected
  const totalOverdue = feeData
    .filter((fee) => fee.status === "Overdue")
    .reduce((sum, fee) => sum + (fee.amount - fee.paid), 0)

  // Function to determine status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "success"
      case "Partially Paid":
        return "warning"
      case "Pending":
        return "secondary"
      case "Overdue":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Fee Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Fee Record
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">For current term</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCollected.toLocaleString()}</div>
            <Progress value={(totalCollected / totalAmount) * 100} className="h-2" indicatorClassName="bg-green-500" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPending.toLocaleString()}</div>
            <Progress value={(totalPending / totalAmount) * 100} className="h-2" indicatorClassName="bg-yellow-500" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalOverdue.toLocaleString()}</div>
            <Progress value={(totalOverdue / totalAmount) * 100} className="h-2" indicatorClassName="bg-red-500" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fee Records</CardTitle>
          <CardDescription>Manage student fee records and payment status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search records..."
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
                    <TableHead>Term</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFees.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No fee records found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredFees.map((fee) => (
                      <TableRow key={fee.id}>
                        <TableCell className="font-medium">{fee.studentName}</TableCell>
                        <TableCell>
                          Grade {fee.grade}, {fee.class}
                        </TableCell>
                        <TableCell>{fee.term}</TableCell>
                        <TableCell>${fee.amount}</TableCell>
                        <TableCell>${fee.paid}</TableCell>
                        <TableCell>{new Date(fee.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(fee.status)}>{fee.status}</Badge>
                        </TableCell>
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
                              <DropdownMenuItem>View details</DropdownMenuItem>
                              <DropdownMenuItem>Record payment</DropdownMenuItem>
                              <DropdownMenuItem>Send reminder</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Print receipt</DropdownMenuItem>
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
