'use client'

import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Card } from './ui/card'
import type { MoodShape, Shape } from '../type/shapes'

interface DrawingCanvasProps {
  selectedShape: MoodShape | null
  selectedColor: string | null
  shapes: Shape[]
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>
  onShapeAdded: (newShape: Shape) => void
  onColorUpdate: (shapeId: string, color: string) => void
  onShapeSelected: (shapeId: string | null) => void
  selectedShapeId: string | null
  backgroundColor: string
}

export interface DrawingCanvasRef {
  getCanvas: () => HTMLCanvasElement | null
}

const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(({ 
  selectedShape, 
  selectedColor,
  shapes, 
  setShapes, 
  onShapeAdded, 
  onColorUpdate,
  onShapeSelected,
  selectedShapeId,
  backgroundColor
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [lastMousePos, setLastMousePos] = useState<{ x: number; y: number } | null>(null)

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current
  }))

  useEffect(() => {
    drawShapes()
  }, [shapes, selectedShapeId, backgroundColor])

  useEffect(() => {
    if (selectedColor && selectedShapeId) {
      onColorUpdate(selectedShapeId, selectedColor)
    }
  }, [selectedColor, selectedShapeId, onColorUpdate])

  const drawShape = (ctx: CanvasRenderingContext2D, shape: Shape, isSelected: boolean) => {
    const { type, x, y, size, color, rotation } = shape
    
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rotation * Math.PI / 180)
    
    ctx.beginPath()
    ctx.strokeStyle = isSelected ? '#0000FF' : color
    ctx.fillStyle = color
    ctx.lineWidth = isSelected ? 3 : 2

    switch (type) {
      case 'circle':
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
        break
      case 'triangle':
        ctx.moveTo(0, -size/2)
        ctx.lineTo(size/2, size/2)
        ctx.lineTo(-size/2, size/2)
        break
      case 'square':
        ctx.rect(-size / 2, -size / 2, size, size)
        break
      // Add other shape types here...
    }
    ctx.closePath()
    ctx.stroke()
    ctx.fill()
    
    ctx.restore()
  }

  const drawShapes = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Fill the background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw shapes
    shapes.forEach(shape => drawShape(ctx, shape, shape.id === selectedShapeId))
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const clickedShape = shapes.find(shape => 
      Math.abs(shape.x - x) < shape.size / 2 && Math.abs(shape.y - y) < shape.size / 2
    )

    if (clickedShape) {
      onShapeSelected(clickedShape.id)
      setIsDragging(true)
    } else if (selectedShape) {
      const newShape: Shape = {
        id: Date.now().toString(),
        type: selectedShape,
        x,
        y,
        size: 50,
        color: selectedColor || '#CCCCCC',
        rotation: 0
      }
      onShapeAdded(newShape)
      onShapeSelected(newShape.id)
    } else {
      onShapeSelected(null)
    }

    setLastMousePos({ x, y })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !lastMousePos) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const dx = x - lastMousePos.x
    const dy = y - lastMousePos.y

    setShapes(prevShapes => prevShapes.map(shape => {
      if (shape.id === selectedShapeId) {
        return { ...shape, x: shape.x + dx, y: shape.y + dy }
      }
      return shape
    }))

    setLastMousePos({ x, y })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <Card className="w-[600px] h-[400px] relative">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="w-full h-full cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
      />
    </Card>
  )
})

DrawingCanvas.displayName = 'DrawingCanvas'

export default DrawingCanvas




