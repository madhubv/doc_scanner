"use client"

import { useState } from "react"
import { AlertCircle, Upload } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { calculateSimilarity } from "@/lib/document-matcher"
import { Progress } from "@/components/ui/progress"

export function ScanDocumentForm({ user, setUser }) {
  const [documentText, setDocumentText] = useState("")
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [results, setResults] = useState(null)
  const [scanProgress, setScanProgress] = useState(0)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    setFile(selectedFile)

    // Read file content
    const reader = new FileReader()
    reader.onload = (event) => {
      setDocumentText(event.target.result)
    }
    reader.readAsText(selectedFile)
  }

  const handleScan = async (e) => {
    e.preventDefault()
    setError("")
    setResults(null)

    if (!documentText.trim()) {
      setError("Please enter document text or upload a file")
      return
    }

    if (user.credits <= 0) {
      setError("You don't have enough credits. Please request more credits.")
      return
    }

    setLoading(true)
    setScanProgress(0)

    try {
      // Simulate scanning progress
      const progressInterval = setInterval(() => {
        setScanProgress((prev) => {
          const newProgress = prev + Math.random() * 15
          return newProgress >= 100 ? 100 : newProgress
        })
      }, 200)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))
      clearInterval(progressInterval)
      setScanProgress(100)

      // Get stored documents from localStorage
      const storedDocs = JSON.parse(localStorage.getItem("documents") || "[]")

      // Calculate similarity with existing documents
      const matches = storedDocs
        .map((doc) => ({
          ...doc,
          similarity: calculateSimilarity(documentText, doc.content),
        }))
        .filter((doc) => doc.similarity > 0.1) // Filter out low similarity matches
        .sort((a, b) => b.similarity - a.similarity) // Sort by similarity
        .slice(0, 5) // Get top 5 matches

      // Store the new document
      const newDoc = {
        id: Date.now(),
        title: file ? file.name : `Document ${storedDocs.length + 1}`,
        content: documentText,
        date: new Date().toISOString(),
      }

      localStorage.setItem("documents", JSON.stringify([...storedDocs, newDoc]))

      // Update user credits and scan history
      const updatedUser = {
        ...user,
        credits: user.credits - 1,
        scans: [
          ...(user.scans || []),
          {
            id: Date.now(),
            documentId: newDoc.id,
            title: newDoc.title,
            date: new Date().toISOString(),
            matches: matches.length,
          },
        ],
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)

      // Set results
      setResults({
        matches,
        document: newDoc,
      })

      // Clear form
      setDocumentText("")
      setFile(null)
    } catch (err) {
      setError("Failed to scan document. Please try again.")
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

      <form onSubmit={handleScan} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="document-text">Document Text</Label>
          <Textarea
            id="document-text"
            placeholder="Enter document text or upload a file"
            value={documentText}
            onChange={(e) => setDocumentText(e.target.value)}
            className="min-h-[200px]"
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="document-file">Or Upload a Text File</Label>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("document-file").click()}
              className="w-full"
              disabled={loading}
            >
              <Upload className="mr-2 h-4 w-4" />
              {file ? file.name : "Select File"}
            </Button>
            <input
              id="document-file"
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              className="hidden"
              disabled={loading}
            />
          </div>
          {file && <p className="text-sm text-muted-foreground">File selected: {file.name}</p>}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Credits available: <span className="font-medium">{user.credits}</span>
          </p>
          <Button type="submit" disabled={loading || user.credits <= 0}>
            {loading ? "Scanning..." : "Scan Document (1 Credit)"}
          </Button>
        </div>

        {loading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Scanning document...</span>
              <span>{Math.round(scanProgress)}%</span>
            </div>
            <Progress value={scanProgress} className="h-2" />
          </div>
        )}
      </form>

      {results && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium">Scan Results</h3>

          {results.matches.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm">
                Found {results.matches.length} similar document{results.matches.length !== 1 ? "s" : ""}:
              </p>

              {results.matches.map((match) => (
                <Card key={match.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{match.title}</h4>
                        <p className="text-sm text-muted-foreground">{new Date(match.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {Math.round(match.similarity * 100)}% match
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm line-clamp-2">{match.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm">No similar documents found.</p>
          )}
        </div>
      )}
    </div>
  )
}

