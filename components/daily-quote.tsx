"use client"

import { useEffect, useState } from "react"
import { Quote } from "lucide-react"

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Every moment is a fresh beginning.", author: "T.S. Eliot" },
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "You are never too old to set another goal or dream a new dream.", author: "C.S. Lewis" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Your limitation—it&apos;s only your imagination.", author: "Unknown" },
  { text: "Small steps every day lead to big results.", author: "Unknown" },
]

export function DailyQuote() {
  const [quote, setQuote] = useState(quotes[0])

  useEffect(() => {
    // Get a consistent quote for the day based on date
    const today = new Date()
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
    )
    const quoteIndex = dayOfYear % quotes.length
    setQuote(quotes[quoteIndex])
  }, [])

  return (
    <div className="relative p-6 rounded-2xl bg-card border border-border">
      <Quote className="absolute top-4 left-4 h-8 w-8 text-primary/20" />
      <div className="pl-8">
        <p className="text-lg text-foreground leading-relaxed italic text-balance">
          {quote.text}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">— {quote.author}</p>
      </div>
    </div>
  )
}
