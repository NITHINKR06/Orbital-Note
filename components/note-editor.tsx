"use client"

import { useState } from "react"
import type { Note } from "@/types/note"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { generateRandomColor } from "@/lib/utils"
import { CirclePicker } from "react-color"
import { motion } from "framer-motion"
import { Save, X, Trash2, Sparkles } from "lucide-react"

interface NoteEditorProps {
  note: Note
  onSave: (note: Note) => void
  onCancel: () => void
  onDelete: () => void
}

export default function NoteEditor({ note, onSave, onCancel, onDelete }: NoteEditorProps) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [color, setColor] = useState(note.color)

  const handleSave = () => {
    const updatedNote: Note = {
      ...note,
      title: title || "Untitled Note",
      content,
      color,
      updatedAt: new Date().toISOString(),
    }
    onSave(updatedNote)
  }

  const handleRandomColor = () => {
    setColor(generateRandomColor())
  }

  return (
    <motion.div
      className="h-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-6">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full" style={{ backgroundColor: color }}></div>
          <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
            Edit Note
          </h2>
        </div>
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <Button variant="outline" onClick={onCancel} className="border-white/20 hover:bg-white/10" size="sm">
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete} size="sm">
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            size="sm"
          >
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </div>

      <div className="space-y-6 flex-1 overflow-auto">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2 text-white/80">
            Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-white/10 border-white/10 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Note title"
          />
        </div>

        <div className="flex-1">
          <label htmlFor="content" className="block text-sm font-medium mb-2 text-white/80">
            Content
          </label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-white/10 border-white/10 text-white h-[calc(100%-2rem)] min-h-[200px] focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Write your note here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-3 text-white/80">Note Color</label>
          <div className="flex flex-col gap-4">
            <CirclePicker
              color={color}
              onChange={(color) => setColor(color.hex)}
              colors={[
                "#f44336",
                "#e91e63",
                "#9c27b0",
                "#673ab7",
                "#3f51b5",
                "#2196f3",
                "#03a9f4",
                "#00bcd4",
                "#009688",
                "#4caf50",
                "#8bc34a",
                "#cddc39",
                "#ffeb3b",
                "#ffc107",
                "#ff9800",
                "#ff5722",
              ]}
              circleSize={20}
              circleSpacing={8}
            />
            <Button
              variant="outline"
              onClick={handleRandomColor}
              className="w-fit border-white/20 hover:bg-white/10 mt-2"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Random Color
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
