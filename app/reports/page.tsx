"use client"

import { Download, FileText, Filter, Printer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, BarChart, PieChart } from "@/components/charts"

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Filter by:</span>
        </div>
        <div className="grid grid-cols-2 gap-2 md:flex md:flex-row">
          <Select defaultValue="all_grades">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_grades">All Grades</SelectItem>
              <SelectItem value="grade_6">Grade 6</SelectItem>
              <SelectItem value="grade_7">Grade 7</SelectItem>
              <SelectItem value="grade_8">Grade 8</SelectItem>
              <SelectItem value="grade_9">Grade 9</SelectItem>
              <SelectItem value="grade_10">Grade 10</SelectItem>
              <SelectItem value="grade_11">Grade 11</SelectItem>
              <SelectItem value="grade_12">Grade 12</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="current_term">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current_term">Current Term</SelectItem>
              <SelectItem value="term_1">Term 1</SelectItem>
              <SelectItem value="term_2">Term 2</SelectItem>
              <SelectItem value="term_3">Term 3</SelectItem>
              <SelectItem value="full_year">Full Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="academic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="academic">Academic Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="academic" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Performance by Subject</CardTitle>
                <CardDescription>Average scores across all subjects</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <BarChart />
              </CardContent>
              <CardFooter className="justify-between">
                <div className="text-sm text-muted-foreground">Data from current academic year</div>
                <Button variant="ghost" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  View Full Report
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Distribution of grades across all students</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart />
              </CardContent>
              <CardFooter className="justify-between">
                <div className="text-sm text-muted-foreground">Data from current term</div>
                <Button variant="ghost" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Details
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Average performance over time</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <AreaChart />
            </CardContent>
            <CardFooter className="justify-between">
              <div className="text-sm text-muted-foreground">Data from last 3 academic years</div>
              <Button variant="ghost" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                View Full Report
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Reports</CardTitle>
              <CardDescription>Download detailed academic reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Class Performance Report",
                    description: "Detailed performance report by class",
                    icon: <FileText className="h-8 w-8 text-primary" />,
                  },
                  {
                    title: "Student Progress Report",
                    description: "Individual student progress over time",
                    icon: <FileText className="h-8 w-8 text-primary" />,
                  },
                  {
                    title: "Teacher Effectiveness Report",
                    description: "Analysis of teaching effectiveness",
                    icon: <FileText className="h-8 w-8 text-primary" />,
                  },
                  {
                    title: "Curriculum Coverage Report",
                    description: "Progress on curriculum coverage",
                    icon: <FileText className="h-8 w-8 text-primary" />,
                  },
                  {
                    title: "Exam Analysis Report",
                    description: "Detailed analysis of exam results",
                    icon: <FileText className="h-8 w-8 text-primary" />,
                  },
                  {
                    title: "Subject Comparison Report",
                    description: "Performance comparison across subjects",
                    icon: <FileText className="h-8 w-8 text-primary" />,
                  },
                ].map((report, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-3">
                        {report.icon}
                        <div>
                          <CardTitle className="text-base">{report.title}</CardTitle>
                          <CardDescription className="text-xs">{report.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardFooter className="border-t bg-muted/50 p-2">
                      <Button variant="ghost" size="sm" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Reports</CardTitle>
              <CardDescription>Attendance statistics and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Attendance reports would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Financial statistics and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Financial reports would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Reports</CardTitle>
              <CardDescription>Create and view custom reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Custom report builder would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
