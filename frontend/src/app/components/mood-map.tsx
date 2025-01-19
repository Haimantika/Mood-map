'use client'

import { useState } from 'react'
import Drawing from './canvas'
import { MoodControls } from './mood-controls'

export default function MoodMap() {
  const [currentColor, setCurrentColor] = useState('#FFD700')
  const [currentShape, setCurrentShape] = useState<'square' | 'diamond' | 'circle'>('square')

  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-2xl font-bold text-center">Mood Map</h1>
      <div className="grid md:grid-cols-[200px_1fr] gap-4">
        <MoodControls 
          onColorChange={setCurrentColor}
          onShapeChange={setCurrentShape}
        />
        <Drawing />
      </div>
    </div>
  )
}

