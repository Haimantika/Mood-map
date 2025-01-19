'use client'

import { useRef, useState, useEffect } from 'react'
import { Card } from './ui/card'
import type { MoodShape } from '../type/shapes'

interface Shape {
  id: string
  type: MoodShape
  x: number
  y: number
  size: number
}

interface DrawingCanvasProps {
  selectedShape: MoodShape | null
  shapes: Shape[]
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>
  onShapeAdded: () => void
  onShapeSelected: (shapeId: string | null) => void
  selectedShapeId: string | null
}

export default function DrawingCanvas({ 
  selectedShape, 
  shapes, 
  setShapes, 
  onShapeAdded, 
  onShapeSelected,
  selectedShapeId 
}: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [lastMousePos, setLastMousePos] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    drawShapes()
  }, [shapes, selectedShapeId])

  const drawShape = (ctx: CanvasRenderingContext2D, shape: Shape, isSelected: boolean) => {
    const { type, x, y, size } = shape
    
    ctx.beginPath()
    ctx.strokeStyle = isSelected ? '#0000FF' : '#000000'
    ctx.lineWidth = isSelected ? 3 : 2

    switch (type) {
      case 'circle':
        ctx.arc(x, y, size / 2, 0, Math.PI * 2)
        break
      case 'teardrop':
        ctx.moveTo(x, y - size/2)
        ctx.bezierCurveTo(
          x + size/2, y,
          x + size/2, y + size/2,
          x, y + size/2
        )
        ctx.bezierCurveTo(
          x - size/2, y + size/2,
          x - size/2, y,
          x, y - size/2
        )
        break
      case 'triangle':
        ctx.moveTo(x, y - size/2)
        ctx.lineTo(x + size/2, y + size/2)
        ctx.lineTo(x - size/2, y + size/2)
        break
      case 'blob':
        ctx.moveTo(x, y - size/2)
        ctx.bezierCurveTo(
          x + size/2, y - size/2,
          x + size/2, y,
          x + size/2 - 2, y + size/2 - 2
        )
        ctx.bezierCurveTo(
          x, y + size/2,
          x - size/2, y + size/2,
          x - size/2, y
        )
        ctx.bezierCurveTo(
          x - size/2, y - size/2,
          x, y - size/2,
          x, y - size/2
        )
        break
      case 'spike':
        ctx.moveTo(x, y - size/2)
        ctx.lineTo(x + size/4, y)
        ctx.lineTo(x, y + size/2)
        ctx.lineTo(x - size/4, y)
        break
      case 'starburst':
        for (let i = 0; i < 8; i++) {
          const angle = i * Math.PI / 4
          const innerRadius = size / 6
          const outerRadius = size / 2
          ctx.lineTo(
            x + Math.cos(angle) * outerRadius,
            y + Math.sin(angle) * outerRadius
          )
          ctx.lineTo(
            x + Math.cos(angle + Math.PI / 8) * innerRadius,
            y + Math.sin(angle + Math.PI / 8) * innerRadius
          )
        }
        break
      case 'spiral':
        let angle = 0
        let radius = 0
        ctx.moveTo(x, y)
        for (let i = 0; i < 100; i++) {
          angle += 0.2
          radius += 0.05
          ctx.lineTo(
            x + Math.cos(angle) * radius * size / 12,
            y + Math.sin(angle) * radius * size / 12
          )
        }
        break
      case 'vine':
        ctx.moveTo(x - size/2, y)
        ctx.bezierCurveTo(
          x - size/4, y - size/2,
          x + size/4, y + size/2,
          x + size/2, y
        )
        break
      case 'loop':
        ctx.moveTo(x - size/4, y)
        ctx.bezierCurveTo(
          x - size/4, y - size/2,
          x + size/4, y - size/2,
          x + size/4, y
        )
        ctx.bezierCurveTo(
          x + size/4, y + size/2,
          x - size/4, y + size/2,
          x - size/4, y
        )
        break
      case 'wave':
        ctx.moveTo(x - size/2, y)
        ctx.bezierCurveTo(
          x - size/4, y - size/4,
          x + size/4, y + size/4,
          x + size/2, y
        )
        break
      case 'arrow':
        ctx.moveTo(x - size/2, y)
        ctx.lineTo(x + size/4, y)
        ctx.lineTo(x, y - size/4)
        ctx.moveTo(x + size/4, y)
        ctx.lineTo(x, y + size/4)
        break
      case 'square':
        ctx.rect(x - size / 2, y - size / 2, size, size)
        break
    }
    ctx.closePath()
    ctx.stroke()
  }

  const drawShapes = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
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
        size: 50
      }
      setShapes(prevShapes => [...prevShapes, newShape])
      onShapeSelected(newShape.id)
      onShapeAdded()
    } else {
      onShapeSelected(null)
    }

    setLastMousePos({ x, y })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return

    const canvas = canvasRef.current
    if (!canvas || !lastMousePos) return

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
    <Card className="w-[600px] h-[600px]">
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="w-full h-full cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
      />
    </Card>
  )
}





