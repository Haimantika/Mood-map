'use client'

import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { MoodOption, moodOptions } from '../type/shapes'

interface MoodControlsProps {
  onMoodChange: (mood: MoodOption) => void
}

export function MoodControls({ onMoodChange }: MoodControlsProps) {
  return (
    <Card className="p-4">
      <div className="grid gap-2">
        {moodOptions.map((mood) => (
          <Button
            key={mood.mood}
            onClick={() => onMoodChange(mood)}
            className="justify-start"
            style={{ backgroundColor: mood.color }}
          >
            {mood.mood}
          </Button>
        ))}
      </div>
    </Card>
  )
}

