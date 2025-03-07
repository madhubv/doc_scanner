"use client"

import { useState } from "react"
import { AlertCircle, Check } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function RequestCreditsForm({ user, setUser }) {
  const [amount, setAmount] = useState(10)
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleRequest = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (amount <= 0) {
      setError("Please enter a valid amount")
      return
    }

    if (!reason.trim()) {
      setError("Please provide a reason for your request")
      return
    }

    setLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, we'll auto-approve the request
      // In a real app, this would be pending admin approval
      const updatedUser = {
        ...user,
        credits: user.credits + amount,
        creditRequests: [
          ...(user.creditRequests || []),
          {
            id: Date.now(),
            amount,
            reason,
            date: new Date().toISOString(),
            status: "approved",
          },
        ],
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)

      setSuccess(true)
      setAmount(10)
      setReason("")
    } catch (err) {
      setError("Failed to submit request. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">
            Your request has been approved! {amount} credits have been added to your account.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleRequest} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="credit-amount">Number of Credits</Label>
          <Input
            id="credit-amount"
            type="number"
            min="1"
            max="100"
            value={amount}
            onChange={(e) => setAmount(Number.parseInt(e.target.value))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="credit-reason">Reason for Request</Label>
          <Textarea
            id="credit-reason"
            placeholder="Please explain why you need additional credits"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Current credits: <span className="font-medium">{user.credits}</span>
          </p>
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Request Credits"}
          </Button>
        </div>
      </form>
    </div>
  )
}

