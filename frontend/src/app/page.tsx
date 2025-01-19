'use client'

import { useState } from 'react'
import DrawingCanvas from './components/canvas'
import { ShapeSelector } from './components/shape-selector'
import { Slider } from "./components/ui/slider"
import type { MoodShape } from './type/shapes'

interface Shape {
  id: string
  type: MoodShape
  x: number
  y: number
  size: number
}

export default function Home() {
  const [selectedShape, setSelectedShape] = useState<MoodShape | null>(null)
  const [shapes, setShapes] = useState<Shape[]>([])
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null)

  const handleShapeSelect = (shape: MoodShape) => {
    setSelectedShape(shape)
  }

  const handleShapeAdded = () => {
    setSelectedShape(null)
  }

  const handleShapeSelected = (shapeId: string | null) => {
    setSelectedShapeId(shapeId)
  }

  const handleSizeChange = (newSize: number[]) => {
    setShapes(prevShapes => prevShapes.map(shape => {
      if (shape.id === selectedShapeId) {
        return { ...shape, size: newSize[0] }
      }
      return shape
    }))
  }

  const selectedShapeSize = shapes.find(shape => shape.id === selectedShapeId)?.size || 50

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="flex flex-col items-center gap-6">
       
        <div className="flex gap-6">
          <div className="space-y-4">
            <DrawingCanvas 
              selectedShape={selectedShape} 
              shapes={shapes} 
              setShapes={setShapes}
              onShapeAdded={handleShapeAdded}
              onShapeSelected={handleShapeSelected}
              selectedShapeId={selectedShapeId}
            />
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Size:</span>
              <Slider
                value={[selectedShapeSize]}
                onValueChange={handleSizeChange}
                min={10}
                max={100}
                step={1}
                className="w-[200px]"
                disabled={!selectedShapeId}
              />
            </div>
          </div>
          <ShapeSelector onSelectShape={handleShapeSelect} selectedShape={selectedShape} />
        </div>
      </div>
    </main>
  )
}




