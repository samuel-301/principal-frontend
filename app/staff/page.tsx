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

// Mock data for staff
const staffData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Principal",
    department: "Administration",
    subject: "N/A",
    status: "Active",
    contact: "sarah.johnson@oakridge.edu",
    joinDate: "Aug 15, 2018",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Teacher",
    department: "Science",
    subject: "Physics",
    status: "Active",
    contact: "michael.chen@oakridge.edu",
    joinDate: "Sep 1, 2019",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Teacher",
    department: "Mathematics",
    subject: "Algebra",
    status: "Active",
    contact: "emily.rodriguez@oakridge.edu",
    joinDate: "Jan 10, 2020",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Teacher",
    department: "English",
    subject: "Literature",
    status: "On Leave",
    contact: "james.wilson@oakridge.edu",
    joinDate: "Aug 20, 2017",
  },
  {
    id: 5,
    name: "Sophia Patel",
    role: "Counselor",
    department: "Student Services",
    subject: "N/A",
    status: "Active",
    contact: "sophia.patel@oakridge.edu",
    joinDate: "Mar 15, 2021",
  },
  {
    id: 6,
    name: "Robert Kim",
    role: "Teacher",
    department: "History",
    subject: "World History",
    status: "Active",
    contact: "robert.kim@oakridge.edu",
    joinDate: "Aug 5, 2020",
  },
  {
    id: 7,
    name: "Lisa Thompson",
    role: "Librarian",
    department: "Library",
    subject: "N/A",
    status: "Active",
    contact: "lisa.thompson@oakridge.edu",
    joinDate: "Nov 12, 2019",
  },
  {
    id: 8,
    name: "David Martinez",
    role: "Teacher",
    department: "Physical Education",
    subject: "Sports",
    status: "Active",
    contact: "david.martinez@oakridge.edu",
    joinDate: "Aug 15, 2018",
  },
]

export default function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter staff based on search term and filters
  const filteredStaff = staffData.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.contact.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || staff.department === departmentFilter

    const matchesStatus = statusFilter === "all" || staff.status === statusFilter

    return matchesSearch && matchesDepartment && matchesStatus
  })

  // Get unique departments for filter
  const departments = ["all", ...new Set(staffData.map((staff) => staff.department))]
  const statuses = ["all", ...new Set(staffData.map((staff) => staff.status))]

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Staff
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Directory</CardTitle>
          <CardDescription>Manage all staff members and their information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search staff..."
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
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept === "all" ? "All Departments" : dept}
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
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="hidden md:table-cell">Department</TableHead>
                    <TableHead className="hidden md:table-cell">Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Join Date</TableHead>
                    <TableHead className="hidden lg:table-cell">Contact</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No staff members found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStaff.map((staff) => (
                      <TableRow key={staff.id}>
                        <TableCell className="font-medium">{staff.name}</TableCell>
                        <TableCell>{staff.role}</TableCell>
                        <TableCell className="hidden md:table-cell">{staff.department}</TableCell>
                        <TableCell className="hidden md:table-cell">{staff.subject}</TableCell>
                        <TableCell>
                          <Badge variant={staff.status === "Active" ? "default" : "secondary"}>{staff.status}</Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">{staff.joinDate}</TableCell>
                        <TableCell className="hidden lg:table-cell">{staff.contact}</TableCell>
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
                              <DropdownMenuItem>Edit staff</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Remove staff</DropdownMenuItem>
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
