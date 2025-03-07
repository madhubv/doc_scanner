"use client"

import { useState } from "react"
import { AlertCircle, Check, CreditCard, User } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function UserProfile({ user, setUser }) {
  const [username, setUsername] = useState(user.username)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!username.trim()) {
      setError("Username cannot be empty")
      return
    }

    setLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedUser = {
        ...user,
        username,
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)

      setSuccess(true)
    } catch (err) {
      setError("Failed to update profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">Your profile has been updated successfully.</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Account Information</h3>
                <p className="text-sm text-muted-foreground">Manage your account details</p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" value={user.role} disabled />
                <p className="text-xs text-muted-foreground">Your account role cannot be changed</p>
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Credit Information</h3>
                <p className="text-sm text-muted-foreground">View your credit balance and usage</p>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm">Available Credits</span>
                <span className="font-medium">{user.credits}</span>
              </div>

              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm">Daily Free Credits</span>
                <span className="font-medium">20</span>
              </div>

              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm">Total Scans</span>
                <span className="font-medium">{user.scans?.length || 0}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Credit Requests</span>
                <span className="font-medium">{user.creditRequests?.length || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

