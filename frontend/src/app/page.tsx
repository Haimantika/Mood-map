'use client'

import { useState, useRef, useEffect } from 'react'
import DrawingCanvas, { DrawingCanvasRef } from './components/canvas'
import { ShapeSelector } from './components/shape-selector'
import { ColorSelector } from './components/color-selector'
import { Slider } from "./components/ui/slider"
import { Button } from "./components/ui/button"
import { Download } from 'lucide-react'
import type { MoodShape, Shape } from './type/shapes'

export default function Home() {
  const [selectedShape, setSelectedShape] = useState<MoodShape | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [shapes, setShapes] = useState<Shape[]>([])
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null)
  const [clipboard, setClipboard] = useState<Shape | null>(null)
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

  const handleCopy = () => {
    const selectedShape = shapes.find(shape => shape.id === selectedShapeId)
    if (selectedShape) {
      setClipboard({ ...selectedShape, id: Date.now().toString() })
    }
  }

  const handlePaste = () => {
    if (clipboard) {
      const newShape = { ...clipboard, x: clipboard.x + 20, y: clipboard.y + 20, id: Date.now().toString() }
      setShapes(prevShapes => [...prevShapes, newShape])
      setSelectedShapeId(newShape.id)
    }
  }

  const handleCut = () => {
    const selectedShape = shapes.find(shape => shape.id === selectedShapeId)
    if (selectedShape) {
      setClipboard({ ...selectedShape, id: Date.now().toString() })
      setShapes(prevShapes => prevShapes.filter(shape => shape.id !== selectedShapeId))
      setSelectedShapeId(null)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'c':
            e.preventDefault()
            handleCopy()
            break
          case 'v':
            e.preventDefault()
            handlePaste()
            break
          case 'x':
            e.preventDefault()
            handleCut()
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shapes, selectedShapeId, clipboard])

  const selectedShapeObj = shapes.find(shape => shape.id === selectedShapeId)
  const selectedShapeSize = selectedShapeObj?.size || 50
  const selectedShapeRotation = selectedShapeObj?.rotation || 0

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <ColorSelector onSelectColor={handleColorSelect} selectedColor={selectedColor} />
          <div className="space-y-2">
            <DrawingCanvas 
              selectedShape={selectedShape} 
              selectedColor={selectedColor}
              shapes={shapes} 
              setShapes={setShapes}
              onShapeAdded={handleShapeAdded}
              onColorUpdate={handleColorUpdate}
              onShapeSelected={handleShapeSelected}
              selectedShapeId={selectedShapeId}
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
            <Button onClick={handleDownload} className="w-full">
              <Download className="mr-2 h-4 w-4" /> Download Mood Map
            </Button>
          </div>
          <ShapeSelector onSelectShape={handleShapeSelect} selectedShape={selectedShape} />
        </div>
      </div>
    </main>
  )
}








