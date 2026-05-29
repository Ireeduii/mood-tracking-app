"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type Mood = "happy" | "stressed" | "calm" | "energetic" | "low"

interface MoodOption {
  id: Mood
  emoji: string
  label: string
  color: string
}

const moods: MoodOption[] = [
  { id: "happy", emoji: "😊", label: "Happy", color: "bg-mood-happy" },
  { id: "stressed", emoji: "😰", label: "Stressed", color: "bg-mood-stressed" },
  { id: "calm", emoji: "😌", label: "Calm", color: "bg-mood-calm" },
  { id: "energetic", emoji: "⚡", label: "Energetic", color: "bg-mood-energetic" },
  { id: "low", emoji: "😔", label: "Low", color: "bg-mood-low" },
]

interface MoodSelectorProps {
  selectedMood: Mood | null
  onMoodSelect: (mood: Mood) => void
}

export function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {moods.map((mood) => (
        <button
          key={mood.id}
          onClick={() => onMoodSelect(mood.id)}
          className={cn(
            "flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300",
            "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
            selectedMood === mood.id
              ? `${mood.color} text-foreground shadow-lg scale-105`
              : "bg-card hover:bg-secondary border border-border"
          )}
        >
          <span className="text-3xl" role="img" aria-label={mood.label}>
            {mood.emoji}
          </span>
          <span className="text-sm font-medium">{mood.label}</span>
        </button>
      ))}
    </div>
  )
}

export type { Mood }
