"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { BarChart, Clock, CreditCard, FileText, Home, LogOut, Upload, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScanDocumentForm } from "@/components/scan-document-form"
import { RequestCreditsForm } from "@/components/request-credits-form"
import { UserProfile } from "@/components/user-profile"
import { ScanHistory } from "@/components/scan-history"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/login")
      return
    }

    setUser(JSON.parse(storedUser))
    setLoading(false)

    // Handle hash navigation
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash && ["dashboard", "scan", "history", "credits", "profile", "analytics"].includes(hash)) {
        setActiveTab(hash)
      }
    }

    // Check hash on initial load
    handleHashChange()

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [router])

  const handleTabChange = (value) => {
    setActiveTab(value)
    window.location.hash = value
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
          <p className="text-gray-500">Please wait while we load your dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col bg-primary text-primary-foreground md:flex">
        <div className="flex h-14 items-center border-b border-primary/10 px-4">
          <h1 className="text-lg font-bold">DocScan</h1>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            <Button
              variant={activeTab === "dashboard" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => handleTabChange("dashboard")}
            >
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === "scan" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => handleTabChange("scan")}
            >
              <Upload className="mr-2 h-4 w-4" />
              Scan Document
            </Button>
            <Button
              variant={activeTab === "history" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => handleTabChange("history")}
            >
              <Clock className="mr-2 h-4 w-4" />
              Scan History
            </Button>
            <Button
              variant={activeTab === "credits" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => handleTabChange("credits")}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Request Credits
            </Button>
            <Button
              variant={activeTab === "profile" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => handleTabChange("profile")}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            {user.role === "admin" && (
              <Button
                variant={activeTab === "analytics" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => handleTabChange("analytics")}
              >
                <BarChart className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            )}
          </nav>
        </div>
        <div className="border-t border-primary/10 p-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="rounded-full bg-primary-foreground/20 p-1">
              <User className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">{user.username}</p>
              <p className="text-xs opacity-70">{user.role}</p>
            </div>
          </div>
          <Button variant="ghost" className="mt-2 w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="flex h-14 items-center border-b px-4 md:hidden">
          <h1 className="text-lg font-bold">DocScan</h1>
          <Button variant="ghost" size="icon" className="ml-auto" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>

        <main className="container mx-auto p-4 md:p-6">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="mb-4 md:hidden">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="scan">Scan</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              {user.role === "admin" && <TabsTrigger value="analytics">Analytics</TabsTrigger>}
            </TabsList>

            <TabsContent value="dashboard">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Available Credits</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{user.credits}</div>
                    <p className="text-xs text-muted-foreground">
                      {user.credits < 5 ? "Low credits. Consider requesting more." : "Credits reset daily at midnight."}
                    </p>
                    <Progress className="mt-2" value={(user.credits / 20) * 100} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{user.scans?.length || 0}</div>
                    <p className="text-xs text-muted-foreground">
                      {user.scans?.length > 0
                        ? `Last scan: ${new Date(user.scans[user.scans.length - 1]?.date).toLocaleDateString()}`
                        : "No scans yet"}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Account Status</CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold capitalize">{user.role}</div>
                    <p className="text-xs text-muted-foreground">
                      {user.role === "admin" ? "Admin privileges enabled" : "Standard user account"}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Card className="col-span-1 md:col-span-2">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Scan documents, request credits, or view your scan history</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <Button
                      className="h-auto flex-col items-center justify-center gap-2 p-4"
                      onClick={() => handleTabChange("scan")}
                    >
                      <Upload className="h-6 w-6" />
                      <span>Scan Document</span>
                    </Button>
                    <Button
                      className="h-auto flex-col items-center justify-center gap-2 p-4"
                      variant="outline"
                      onClick={() => handleTabChange("credits")}
                    >
                      <CreditCard className="h-6 w-6" />
                      <span>Request Credits</span>
                    </Button>
                    <Button
                      className="h-auto flex-col items-center justify-center gap-2 p-4"
                      variant="outline"
                      onClick={() => handleTabChange("history")}
                    >
                      <Clock className="h-6 w-6" />
                      <span>View History</span>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="scan">
              <Card>
                <CardHeader>
                  <CardTitle>Scan Document</CardTitle>
                  <CardDescription>
                    Upload a document to scan and find matches. Each scan costs 1 credit.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScanDocumentForm user={user} setUser={setUser} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Scan History</CardTitle>
                  <CardDescription>View your previous document scans and results</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScanHistory user={user} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="credits">
              <Card>
                <CardHeader>
                  <CardTitle>Request Credits</CardTitle>
                  <CardDescription>Request additional credits if you've used your daily limit</CardDescription>
                </CardHeader>
                <CardContent>
                  <RequestCreditsForm user={user} setUser={setUser} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>User Profile</CardTitle>
                  <CardDescription>View and manage your account information</CardDescription>
                </CardHeader>
                <CardContent>
                  <UserProfile user={user} setUser={setUser} />
                </CardContent>
              </Card>
            </TabsContent>

            {user.role === "admin" && (
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics Dashboard</CardTitle>
                    <CardDescription>View system-wide analytics and statistics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AnalyticsDashboard />
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </main>
      </div>
    </div>
  )
}

