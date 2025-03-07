"use client"

import { useState } from "react"
import { Calendar, FileText, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ScanHistory({ user }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")

  const scans = user.scans || []

  // Filter and sort scans
  const filteredScans = scans
    .filter((scan) => scan.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "desc"
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime()
      } else if (sortBy === "title") {
        return sortOrder === "desc" ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title)
      } else if (sortBy === "matches") {
        return sortOrder === "desc" ? b.matches - a.matches : a.matches - b.matches
      }
      return 0
    })

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("desc")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 sm:max-w-xs">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by document title"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleSort("date")}
            className={sortBy === "date" ? "bg-primary/10" : ""}
          >
            <Calendar className="mr-1 h-4 w-4" />
            Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleSort("title")}
            className={sortBy === "title" ? "bg-primary/10" : ""}
          >
            <FileText className="mr-1 h-4 w-4" />
            Title {sortBy === "title" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleSort("matches")}
            className={sortBy === "matches" ? "bg-primary/10" : ""}
          >
            Matches {sortBy === "matches" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>
        </div>
      </div>

      {filteredScans.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Matches</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredScans.map((scan) => (
                <TableRow key={scan.id}>
                  <TableCell className="font-medium">{scan.title}</TableCell>
                  <TableCell>{new Date(scan.date).toLocaleString()}</TableCell>
                  <TableCell>{scan.matches}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <FileText className="h-10 w-10 text-muted-foreground" />
            <h3 className="mt-2 font-medium">No scan history</h3>
            <p className="text-sm text-muted-foreground">
              {searchTerm ? "No results found. Try a different search term." : "You haven't scanned any documents yet."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

