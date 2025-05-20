"use client"

import { useState, useEffect } from "react"
import { PlusCircle, Search, Settings, Sparkles } from "lucide-react"
import NoteCircle from "@/components/note-circle"
import NoteEditor from "@/components/note-editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { Note } from "@/types/note"
import { generateRandomColor } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import Particles from "@/components/particles"

export default function Home() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", [])
  const [activeNote, setActiveNote] = useState<Note | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    // Hide welcome screen after 3 seconds or if there are notes
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 3000)

    if (notes.length > 0) {
      setShowWelcome(false)
      clearTimeout(timer)
    }

    return () => clearTimeout(timer)
  }, [notes.length])

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      color: generateRandomColor(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setNotes([...notes, newNote])
    setActiveNote(newNote)
    setIsEditing(true)
  }

  const handleUpdateNote = (updatedNote: Note) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
    setActiveNote(updatedNote)
    setIsEditing(false)
  }

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
    setActiveNote(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <Particles className="absolute inset-0" quantity={50} />

      <div className="relative z-10 max-w-7xl mx-auto p-4 min-h-screen">
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-white/10">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
              Orbital Notes
            </h1>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <motion.div
              className="relative flex-1 sm:flex-none"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search notes..."
                className="pl-10 bg-white/10 border-white/10 text-white w-full sm:w-64 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden sm:block"
            >
              <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
                <Settings className="h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                onClick={handleCreateNote}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full whitespace-nowrap"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                New Note
              </Button>
            </motion.div>
          </div>
        </header>

        <AnimatePresence>
          {showWelcome && notes.length === 0 && (
            <motion.div
              className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900/90 via-purple-900/90 to-slate-900/90 backdrop-blur-md"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <motion.div
                  className="mx-auto mb-6 w-32 h-32 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <Sparkles className="h-16 w-16 text-white" />
                </motion.div>
                <motion.h2
                  className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Welcome to Orbital Notes
                </motion.h2>
                <motion.p
                  className="text-xl text-white/80 mb-8 max-w-md mx-auto"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  Your thoughts in orbit, beautifully organized
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <Button
                    onClick={() => setShowWelcome(false)}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full px-8 py-6 text-lg"
                  >
                    Get Started
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {notes.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center h-[70vh] text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="mb-6 p-8 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-600/30 backdrop-blur-sm"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 0 0 rgba(236, 72, 153, 0)",
                  "0 0 0 10px rgba(236, 72, 153, 0.3)",
                  "0 0 0 0 rgba(236, 72, 153, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            >
              <PlusCircle className="h-20 w-20 text-pink-400" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
              Start Your Journey
            </h2>
            <p className="text-white/70 mb-8 max-w-md text-lg">
              Create your first note to begin tracking your daily transitions and important topics
            </p>
            <Button
              onClick={handleCreateNote}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full px-6 py-6 text-lg"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Create First Note
            </Button>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            {/* Mobile view note selector */}
            <div className="lg:hidden">
              {!isEditing && (
                <div className="backdrop-blur-sm bg-black/20 rounded-xl border border-white/10 p-4 mb-4">
                  <h3 className="text-lg font-medium mb-3 text-white/80">Your Notes</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {filteredNotes.map((note) => (
                      <motion.div
                        key={note.id}
                        className={`p-3 rounded-lg cursor-pointer ${
                          activeNote?.id === note.id ? "ring-2 ring-white/30" : ""
                        }`}
                        style={{
                          backgroundColor: `${note.color}40`,
                          borderLeft: `3px solid ${note.color}`,
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setActiveNote(note)
                          setIsEditing(false)
                        }}
                      >
                        <h4 className="font-medium text-sm truncate" style={{ color: note.color }}>
                          {note.title}
                        </h4>
                        <p className="text-white/60 text-xs truncate mt-1">
                          {note.content.substring(0, 30)}
                          {note.content.length > 30 ? "..." : ""}
                        </p>
                      </motion.div>
                    ))}
                    <motion.div
                      className="p-3 rounded-lg cursor-pointer bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCreateNote}
                    >
                      <PlusCircle className="h-5 w-5 text-pink-400 mr-2" />
                      <span className="text-sm font-medium">New Note</span>
                    </motion.div>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop orbital view / Mobile editor */}
            <div className="flex-1 relative h-[50vh] lg:h-[75vh] backdrop-blur-sm bg-black/20 rounded-xl border border-white/10 p-4">
              {isEditing && activeNote ? (
                <NoteEditor
                  note={activeNote}
                  onSave={handleUpdateNote}
                  onCancel={() => setIsEditing(false)}
                  onDelete={() => {
                    handleDeleteNote(activeNote.id)
                    setIsEditing(false)
                  }}
                />
              ) : (
                <div className="relative w-full h-full overflow-hidden">
                  {/* Orbital note layout - only visible on desktop */}
                  <div className="hidden lg:flex absolute inset-0 items-center justify-center">
                    <div className="relative w-[500px] h-[500px]">
                      {/* Orbital rings */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/10 animate-[spin_240s_linear_infinite]"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-white/5 animate-[spin_180s_linear_infinite_reverse]"></div>

                      {filteredNotes.map((note, index) => {
                        // Calculate position on orbit
                        const totalNotes = filteredNotes.length
                        const angle = (index * 2 * Math.PI) / totalNotes

                        // Different orbit radiuses for visual interest
                        const orbitIndex = index % 3
                        const orbitRadii = [150, 200, 250] // Three different orbit sizes
                        const radius = orbitRadii[orbitIndex]

                        // Calculate position
                        const x = radius * Math.cos(angle) + 250
                        const y = radius * Math.sin(angle) + 250

                        // Calculate orbit speed (different for each orbit)
                        const orbitSpeeds = [60, 80, 100] // seconds per rotation
                        const orbitSpeed = orbitSpeeds[orbitIndex]

                        // Calculate orbit direction (alternate)
                        const direction = orbitIndex % 2 === 0 ? 1 : -1

                        return (
                          <NoteCircle
                            key={note.id}
                            note={note}
                            position={{ x, y }}
                            orbitSpeed={orbitSpeed}
                            orbitDirection={direction}
                            isActive={activeNote?.id === note.id}
                            onClick={() => {
                              setActiveNote(note)
                              setIsEditing(false)
                            }}
                            onEdit={() => {
                              setActiveNote(note)
                              setIsEditing(true)
                            }}
                            onDelete={() => handleDeleteNote(note.id)}
                          />
                        )
                      })}

                      {/* Center hub */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center cursor-pointer shadow-[0_0_30px_rgba(236,72,153,0.5)] z-10"
                        onClick={handleCreateNote}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          boxShadow: [
                            "0 0 20px rgba(236, 72, 153, 0.3)",
                            "0 0 40px rgba(236, 72, 153, 0.6)",
                            "0 0 20px rgba(236, 72, 153, 0.3)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      >
                        <PlusCircle className="h-12 w-12" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Mobile note content view */}
                  <div className="lg:hidden h-full flex items-center justify-center">
                    {activeNote ? (
                      <div className="w-full">
                        <div className="flex justify-between items-center mb-4">
                          <h2
                            className="text-xl font-bold"
                            style={{
                              color: activeNote.color,
                              textShadow: `0 0 10px ${activeNote.color}40`,
                            }}
                          >
                            {activeNote.title}
                          </h2>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setIsEditing(true)}
                              className="border-white/20 hover:bg-white/10"
                            >
                              Edit
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteNote(activeNote.id)}>
                              Delete
                            </Button>
                          </div>
                        </div>
                        <div className="text-xs text-white/60 mb-4 flex items-center">
                          <div
                            className="w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: activeNote.color }}
                          ></div>
                          Last updated: {new Date(activeNote.updatedAt).toLocaleString()}
                        </div>
                        <div className="prose prose-invert max-w-none prose-sm">
                          {activeNote.content ? (
                            activeNote.content.split("\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)
                          ) : (
                            <p className="text-white/50 italic">No content yet. Click Edit to add some text.</p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-white/70 mb-4">Select a note or create a new one</p>
                        <Button
                          onClick={handleCreateNote}
                          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          New Note
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Desktop note detail view */}
            {activeNote && !isEditing && (
              <motion.div
                className="hidden lg:block flex-1 backdrop-blur-sm bg-black/20 rounded-xl p-6 border border-white/10 h-[75vh] overflow-auto"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2
                    className="text-2xl font-bold"
                    style={{
                      color: activeNote.color,
                      textShadow: `0 0 10px ${activeNote.color}40`,
                    }}
                  >
                    {activeNote.title}
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="border-white/20 hover:bg-white/10"
                    >
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteNote(activeNote.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-white/60 mb-6 flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: activeNote.color }}></div>
                  Last updated: {new Date(activeNote.updatedAt).toLocaleString()}
                </div>
                <div className="prose prose-invert max-w-none">
                  {activeNote.content ? (
                    activeNote.content.split("\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)
                  ) : (
                    <p className="text-white/50 italic">No content yet. Click Edit to add some text.</p>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
