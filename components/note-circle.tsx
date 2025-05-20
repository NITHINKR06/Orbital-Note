"use client"

import { useState } from "react"
import { Edit, Trash2 } from "lucide-react"
import type { Note } from "@/types/note"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface NoteCircleProps {
  note: Note
  position: { x: number; y: number }
  orbitSpeed: number
  orbitDirection: number
  isActive: boolean
  onClick: () => void
  onEdit: () => void
  onDelete: () => void
}

export default function NoteCircle({
  note,
  position,
  orbitSpeed,
  orbitDirection,
  isActive,
  onClick,
  onEdit,
  onDelete,
}: NoteCircleProps) {
  const [showActions, setShowActions] = useState(false)

  // Calculate size based on content length (min 60px, max 100px)
  const size = Math.max(60, Math.min(100, 60 + note.content.length / 20))

  return (
    <motion.div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center cursor-pointer shadow-lg z-10"
      style={{
        top: position.y,
        left: position.x,
        width: `${size}px`,
        height: `${size}px`,
        zIndex: isActive ? 10 : 1,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        boxShadow: isActive ? `0 0 20px ${note.color}80` : `0 0 10px ${note.color}40`,
      }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.1,
        boxShadow: `0 0 20px ${note.color}80`,
        zIndex: 20,
      }}
      onClick={onClick}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-80"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${note.color}, ${note.color}cc)`,
        }}
        animate={{
          background: [
            `radial-gradient(circle at 30% 30%, ${note.color}, ${note.color}cc)`,
            `radial-gradient(circle at 70% 70%, ${note.color}, ${note.color}cc)`,
            `radial-gradient(circle at 30% 30%, ${note.color}, ${note.color}cc)`,
          ],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />

      {/* Orbit animation */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          rotate: [0, 360 * orbitDirection],
        }}
        transition={{
          duration: orbitSpeed,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center p-1 text-white font-medium text-xs truncate max-w-[80%]">
        {note.title}
      </div>

      {/* Action buttons */}
      {showActions && (
        <motion.div
          className="absolute -bottom-12 flex gap-1"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/10 shadow-lg"
            onClick={(e) => {
              e.stopPropagation()
              onEdit()
            }}
          >
            <Edit className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            className="h-8 w-8 rounded-full shadow-lg"
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </motion.div>
      )}

      {/* Pulse effect for active note */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: `2px solid ${note.color}` }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
      )}
    </motion.div>
  )
}
