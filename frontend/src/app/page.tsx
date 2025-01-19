'use client'

import { useState, useRef, useEffect } from 'react'
import DrawingCanvas, { DrawingCanvasRef } from './components/canvas'
import { ShapeSelector } from './components/shape-selector'
import { ColorSelector } from './components/color-selector'
import { Slider } from "./components/ui/slider"
import { Button } from "./components/ui/button"
import { Download, RefreshCw } from 'lucide-react'
import type { MoodShape, Shape } from './type/shapes'
import { ColorPicker } from './components/color-picker'

export default function Home() {
  const [selectedShape, setSelectedShape] = useState<MoodShape | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [shapes, setShapes] = useState<Shape[]>([])
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null)
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF')

  const canvasRef = useRef<DrawingCanvasRef>(null)

  const handleShapeSelect = (shape: MoodShape) => {
    setSelectedShape(shape)
  }

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
  }

  const handleShapeAdded = (newShape: Shape) => {
    setShapes(prevShapes => [...prevShapes, newShape])
    setSelectedShape(null)
  }

  const handleColorUpdate = (shapeId: string, color: string) => {
    setShapes(prevShapes => prevShapes.map(shape => 
      shape.id === shapeId ? { ...shape, color } : shape
    ))
    setSelectedColor(null)
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

  const handleRotationChange = (newRotation: number[]) => {
    setShapes(prevShapes => prevShapes.map(shape => {
      if (shape.id === selectedShapeId) {
        return { ...shape, rotation: newRotation[0] }
      }
      return shape
    }))
  }

  const handleDownload = () => {
    const canvas = canvasRef.current?.getCanvas()
    if (canvas) {
      const link = document.createElement('a')
      link.download = 'mood-map.png'
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const handleResetCanvas = () => {
    setShapes([])
    setSelectedShapeId(null)
    setBackgroundColor('#FFFFFF')
  }


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedShapeId) {
        setShapes(prevShapes => prevShapes.filter(shape => shape.id !== selectedShapeId))
        setSelectedShapeId(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedShapeId])

  const selectedShapeObj = shapes.find(shape => shape.id === selectedShapeId)
  const selectedShapeSize = selectedShapeObj?.size || 50
  const selectedShapeRotation = selectedShapeObj?.rotation || 0

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <ColorSelector onSelectColor={handleColorSelect} selectedColor={selectedColor} />
          <div className="space-y-2">
            <ColorPicker
              color={backgroundColor}
              onChange={setBackgroundColor}
            />
            <DrawingCanvas 
              selectedShape={selectedShape} 
              selectedColor={selectedColor}
              shapes={shapes} 
              setShapes={setShapes}
              onShapeAdded={handleShapeAdded}
              onColorUpdate={handleColorUpdate}
              onShapeSelected={handleShapeSelected}
              selectedShapeId={selectedShapeId}
              backgroundColor={backgroundColor}
              ref={canvasRef}
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
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Rotation:</span>
              <Slider
                value={[selectedShapeRotation]}
                onValueChange={handleRotationChange}
                min={0}
                max={360}
                step={1}
                className="w-[200px]"
                disabled={!selectedShapeId}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleDownload} className="flex-1">
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
              <Button onClick={handleResetCanvas} className="flex-1">
                <RefreshCw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>
          </div>
          <ShapeSelector onSelectShape={handleShapeSelect} selectedShape={selectedShape} />
        </div>
      </div>
    </main>
  )
}










