'use client'

import { useState } from 'react'
import DrawingCanvas from './canvas'
import { MoodControls } from './mood-controls'
import type { Shape, MoodOption } from '../type/shapes'
import { moodOptions } from '../type/shapes'

export default function MoodMap() {
  const [currentMood, setCurrentMood] = useState<MoodOption>(moodOptions[0])
  const [shapes, setShapes] = useState<Shape[]>([])
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null)

  const handleShapeAdded = (newShape: Shape) => {
    setShapes(prevShapes => [...prevShapes, newShape])
  }

  const handleColorUpdate = (shapeId: string, color: string) => {
    setShapes(prevShapes => prevShapes.map(shape => 
      shape.id === shapeId ? { ...shape, color } : shape
    ))
  }

  const handleShapeSelected = (shapeId: string | null) => {
    setSelectedShapeId(shapeId)
  }

  const handleMoodChange = (mood: MoodOption) => {
    setCurrentMood(mood)
  }

  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-2xl font-bold text-center">Mood Map</h1>
      <div className="grid md:grid-cols-[200px_1fr] gap-4">
        <MoodControls 
          onMoodChange={handleMoodChange}
        />
        <DrawingCanvas 
          selectedShape={currentMood.shape}
          selectedColor={currentMood.color}
          shapes={shapes}
          setShapes={setShapes}
          onShapeAdded={handleShapeAdded}
          onColorUpdate={handleColorUpdate}
          onShapeSelected={handleShapeSelected}
          selectedShapeId={selectedShapeId}
        />
      </div>
    </div>
  )
}

