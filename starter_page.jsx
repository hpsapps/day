"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Search, ChevronLeft, ChevronRight, User } from "lucide-react"

const sampleTeachers = [
  { name: "Jane Smith", class: "3B", type: "permanent" },
  { name: "Alice", class: "Music", type: "specialist" },
  { name: "Michael Brown", class: "Casual", type: "casual" },
]

export default function Page() {
  const [selectedDates, setSelectedDates] = useState([new Date()])
  const [teacherSearch, setTeacherSearch] = useState("")
  const [filteredTeachers, setFilteredTeachers] = useState([])
  const [teacherResultsOpen, setTeacherResultsOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState(null)

  useEffect(() => {
    if (teacherSearch.length > 1) {
      const results = sampleTeachers.filter((t) =>
        t.name.toLowerCase().includes(teacherSearch.toLowerCase())
      )
      setFilteredTeachers(results)
      setTeacherResultsOpen(true)
    } else {
      setFilteredTeachers([])
      setTeacherResultsOpen(false)
    }
  }, [teacherSearch])

  function selectTeacher(t) {
    setSelectedTeacher(t)
    setTeacherResultsOpen(false)
  }

  function prevDay() {
    const d = new Date(selectedDates[0])
    d.setDate(d.getDate() - 1)
    setSelectedDates([d])
  }

  function nextDay() {
    const d = new Date(selectedDates[0])
    d.setDate(d.getDate() + 1)
    setSelectedDates([d])
  }

  return (
    <main className="bg-secondary-light min-h-screen py-8">
      <div className="container mx-auto px-4 space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-primary">Teacher Roster Tool</h1>
          <p className="text-primary-light">Manage RFF and duties for absent teachers</p>
        </header>

        {/* Teacher Search */}
        <Card>
          <CardContent className="space-y-4">
            <h2 className="font-semibold text-xl">1. Search for Absent Teacher</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Input
                  placeholder="Type teacher name..."
                  value={teacherSearch}
                  onChange={(e) => setTeacherSearch(e.target.value)}
                  onFocus={() => teacherSearch.length > 1 && setTeacherResultsOpen(true)}
                />
                <div className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
                  <Search size={16} />
                </div>
                {teacherResultsOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {filteredTeachers.length ? (
                      filteredTeachers.map((t) => (
                        <div
                          key={t.name}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => selectTeacher(t)}
                        >
                          {t.name}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">Type at least 2 characters</div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <label className="block mb-1 text-sm font-medium">Date</label>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={prevDay}>
                    <ChevronLeft size={18} />
                  </Button>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full text-left font-normal">
                        {selectedDates?.[0]?.toLocaleDateString("en-AU") || "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-auto">
                      <Calendar mode="single" selected={selectedDates} onSelect={setSelectedDates} />
                    </PopoverContent>
                  </Popover>
                  <Button variant="ghost" size="icon" onClick={nextDay}>
                    <ChevronRight size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Teacher */}
        {selectedTeacher && (
          <Card>
            <CardContent>
              <h3 className="text-lg font-medium">
                {selectedTeacher.name} - {selectedTeacher.class} (Absent)
              </h3>
              <p className="text-sm text-muted-foreground mt-2">RFF and duties will appear here.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
