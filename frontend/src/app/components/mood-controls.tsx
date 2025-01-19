'use client'

import { Button } from "./ui/button"
import { Card } from "./ui/card"

interface MoodControlsProps {
  onColorChange: (color: string) => void
  onShapeChange: (shape: 'square' | 'diamond' | 'circle') => void
}

export function MoodControls({ onColorChange, onShapeChange }: MoodControlsProps) {
  const moodColors = [
    { name: 'Happiness', color: '#FFD700', shape: 'square' },
    { name: 'Anger', color: '#FF4444', shape: 'circle' },
    { name: 'Sadness', color: '#4444FF', shape: 'diamond' },
    { name: 'Empathy', color: '#44FF44', shape: 'square' },
  ]

  return (
    <Card className="p-4">
      <div className="grid gap-2">
        {moodColors.map((mood) => (
          <Button
            key={mood.name}
            onClick={() => {
              onColorChange(mood.color)
              onShapeChange(mood.shape as 'square' | 'diamond' | 'circle')
            }}
            className="justify-start"
            style={{ backgroundColor: mood.color }}
          >
            {mood.name}
          </Button>
        ))}
      </div>
    </Card>
  )
}

