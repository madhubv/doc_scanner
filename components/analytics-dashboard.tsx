"use client"

import { useEffect, useState } from "react"
import { BarChart3, Users, FileText, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Chart,
  ChartBar,
  ChartContainer,
  ChartGrid,
  ChartPie,
  ChartTooltip,
  ChartXAxis,
  ChartYAxis,
} from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export function AnalyticsDashboard() {
  const [users, setUsers] = useState([])
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [creditRequests, setCreditRequests] = useState([])

  useEffect(() => {
    // In a real app, this would be an API call
    // For this demo, we'll use localStorage
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}")
    const storedDocs = JSON.parse(localStorage.getItem("documents") || "[]")

    // Simulate multiple users for demo purposes
    const demoUsers = [
      storedUser,
      {
        id: 2,
        username: "jane_doe",
        role: "user",
        credits: 15,
        scans: Array(8)
          .fill()
          .map((_, i) => ({
            id: i + 100,
            title: `Document ${i + 1}`,
            date: new Date(Date.now() - i * 86400000).toISOString(),
            matches: Math.floor(Math.random() * 5),
          })),
      },
      {
        id: 3,
        username: "john_smith",
        role: "user",
        credits: 5,
        scans: Array(12)
          .fill()
          .map((_, i) => ({
            id: i + 200,
            title: `Report ${i + 1}`,
            date: new Date(Date.now() - i * 86400000).toISOString(),
            matches: Math.floor(Math.random() * 5),
          })),
      },
      {
        id: 4,
        username: "sarah_johnson",
        role: "user",
        credits: 8,
        scans: Array(5)
          .fill()
          .map((_, i) => ({
            id: i + 300,
            title: `Analysis ${i + 1}`,
            date: new Date(Date.now() - i * 86400000).toISOString(),
            matches: Math.floor(Math.random() * 5),
          })),
      },
    ]

    // Generate demo credit requests
    const demoCreditRequests = [
      {
        id: 1,
        userId: 2,
        username: "jane_doe",
        amount: 10,
        reason: "Need to scan additional documents for project",
        date: new Date(Date.now() - 2 * 86400000).toISOString(),
        status: "pending",
      },
      {
        id: 2,
        userId: 3,
        username: "john_smith",
        amount: 15,
        reason: "Urgent document analysis needed",
        date: new Date(Date.now() - 1 * 86400000).toISOString(),
        status: "approved",
      },
      {
        id: 3,
        userId: 4,
        username: "sarah_johnson",
        amount: 5,
        reason: "Additional scans for research paper",
        date: new Date(Date.now() - 3 * 86400000).toISOString(),
        status: "pending",
      },
    ]

    setUsers(demoUsers)
    setDocuments(storedDocs)
    setCreditRequests(demoCreditRequests)
    setLoading(false)
  }, [])

  // Calculate analytics data
  const totalScans = users.reduce((total, user) => total + (user.scans?.length || 0), 0)
  const totalUsers = users.length
  const totalDocuments = documents.length
  const pendingCreditRequests = creditRequests.filter((req) => req.status === "pending").length

  // Data for charts
  const scansByUserData = users.map((user) => ({
    name: user.username,
    value: user.scans?.length || 0,
  }))

  // Daily scans data (last 7 days)
  const last7Days = Array(7)
    .fill()
    .map((_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split("T")[0]
    })
    .reverse()

  const dailyScansData = last7Days.map((day) => {
    const count = users.reduce((total, user) => {
      return total + (user.scans || []).filter((scan) => scan.date.split("T")[0] === day).length
    }, 0)

    return {
      name: new Date(day).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: count,
    }
  })

  // Credit usage data
  const creditUsageData = [
    { name: "Used", value: users.reduce((total, user) => total + (user.scans?.length || 0), 0) },
    { name: "Available", value: users.reduce((total, user) => total + user.credits, 0) },
  ]

  // Top users by scan count
  const topUsersByScan = [...users].sort((a, b) => (b.scans?.length || 0) - (a.scans?.length || 0)).slice(0, 5)

  if (loading) {
    return <div className="text-center py-8">Loading analytics data...</div>
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalScans}</div>
            <p className="text-xs text-muted-foreground">Across all users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">Active system users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDocuments}</div>
            <p className="text-xs text-muted-foreground">Stored in the system</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCreditRequests}</div>
            <p className="text-xs text-muted-foreground">Credit requests awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="daily">
        <TabsList>
          <TabsTrigger value="daily">Daily Scans</TabsTrigger>
          <TabsTrigger value="users">Scans by User</TabsTrigger>
          <TabsTrigger value="credits">Credit Usage</TabsTrigger>
          <TabsTrigger value="requests">Credit Requests</TabsTrigger>
          <TabsTrigger value="top-users">Top Users</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Daily Scans</CardTitle>
              <CardDescription>Number of document scans per day over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer>
                <Chart data={dailyScansData}>
                  <ChartGrid vertical horizontal />
                  <ChartXAxis />
                  <ChartYAxis />
                  <ChartBar />
                  <ChartTooltip />
                </Chart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Scans by User</CardTitle>
              <CardDescription>Distribution of document scans across users</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer>
                <Chart data={scansByUserData}>
                  <ChartPie />
                  <ChartTooltip />
                </Chart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credits">
          <Card>
            <CardHeader>
              <CardTitle>Credit Usage</CardTitle>
              <CardDescription>Distribution of used vs. available credits</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer>
                <Chart data={creditUsageData}>
                  <ChartPie />
                  <ChartTooltip />
                </Chart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Credit Requests</CardTitle>
              <CardDescription>Pending and approved credit requests from users</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {creditRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.username}</TableCell>
                      <TableCell>{request.amount}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{request.reason}</TableCell>
                      <TableCell>{new Date(request.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            request.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {request.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {request.status === "pending" && (
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                            >
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                            >
                              Deny
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="top-users">
          <Card>
            <CardHeader>
              <CardTitle>Top Users by Scan Count</CardTitle>
              <CardDescription>Users with the highest number of document scans</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Total Scans</TableHead>
                    <TableHead>Available Credits</TableHead>
                    <TableHead>Last Activity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topUsersByScan.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell className="capitalize">{user.role}</TableCell>
                      <TableCell>{user.scans?.length || 0}</TableCell>
                      <TableCell>{user.credits}</TableCell>
                      <TableCell>
                        {user.scans?.length > 0
                          ? new Date(user.scans[user.scans.length - 1]?.date).toLocaleDateString()
                          : "No activity"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

