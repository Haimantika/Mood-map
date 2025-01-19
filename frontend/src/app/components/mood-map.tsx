'use client'

import { useState } from 'react'
import DrawingCanvas from './canvas'
import { MoodControls } from './mood-controls'
import type { Shape, MoodShape } from '../type/shapes'

export default function MoodMap() {
  const [currentColor, setCurrentColor] = useState('#FFD700')
  const [currentShape, setCurrentShape] = useState<MoodShape>('square')
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

  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-2xl font-bold text-center">Mood Map</h1>
      <div className="grid md:grid-cols-[200px_1fr] gap-4">
        <MoodControls 
          onColorChange={setCurrentColor}
          onShapeChange={setCurrentShape}
        />
        <DrawingCanvas 
          selectedShape={currentShape}
          selectedColor={currentColor}
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



