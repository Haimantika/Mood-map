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
    const canvas = canvasRef.current
    if (canvas) {
      const resizeCanvas = () => {
        const parent = canvas.parentElement
        if (parent) {
          const { width, height } = parent.getBoundingClientRect()
          canvas.width = width
          canvas.height = height
          drawShapes()
        }
      }

      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)
      return () => window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

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
      case 'teardrop':
        ctx.moveTo(0, -size/2)
        ctx.bezierCurveTo(
          size/2, 0,
          size/2, size/2,
          0, size/2
        )
        ctx.bezierCurveTo(
          -size/2, size/2,
          -size/2, 0,
          0, -size/2
        )
        break
      case 'triangle':
        ctx.moveTo(0, -size/2)
        ctx.lineTo(size/2, size/2)
        ctx.lineTo(-size/2, size/2)
        break
      case 'blob':
        ctx.moveTo(0, -size/2)
        ctx.bezierCurveTo(
          size/2, -size/2,
          size/2, 0,
          size/2 - 2, size/2 - 2
        )
        ctx.bezierCurveTo(
          0, size/2,
          -size/2, size/2,
          -size/2, 0
        )
        ctx.bezierCurveTo(
          -size/2, -size/2,
          0, -size/2,
          0, -size/2
        )
        break
      case 'spike':
        ctx.moveTo(0, -size/2)
        ctx.lineTo(size/4, 0)
        ctx.lineTo(0, size/2)
        ctx.lineTo(-size/4, 0)
        break
      case 'starburst':
        for (let i = 0; i < 8; i++) {
          const angle = i * Math.PI / 4
          const innerRadius = size / 6
          const outerRadius = size / 2
          ctx.lineTo(
            Math.cos(angle) * outerRadius,
            Math.sin(angle) * outerRadius
          )
          ctx.lineTo(
            Math.cos(angle + Math.PI / 8) * innerRadius,
            Math.sin(angle + Math.PI / 8) * innerRadius
          )
        }
        break
      case 'spiral':
        let angle = 0
        let radius = 0
        ctx.moveTo(0, 0)
        for (let i = 0; i < 100; i++) {
          angle += 0.2
          radius += 0.05
          ctx.lineTo(
            Math.cos(angle) * radius * size / 12,
            Math.sin(angle) * radius * size / 12
          )
        }
        break
      case 'vine':
        ctx.moveTo(-size/2, 0)
        ctx.bezierCurveTo(
          -size/4, -size/2,
          size/4, size/2,
          size/2, 0
        )
        break
      case 'loop':
        ctx.moveTo(-size/4, 0)
        ctx.bezierCurveTo(
          -size/4, -size/2,
          size/4, -size/2,
          size/4, 0
        )
        ctx.bezierCurveTo(
          size/4, size/2,
          -size/4, size/2,
          -size/4, 0
        )
        break
      case 'wave':
        ctx.moveTo(-size/2, 0)
        ctx.bezierCurveTo(
          -size/4, -size/4,
          size/4, size/4,
          size/2, 0
        )
        break
      case 'arrow':
        ctx.moveTo(-size/2, 0)
        ctx.lineTo(size/4, 0)
        ctx.lineTo(0, -size/4)
        ctx.moveTo(size/4, 0)
        ctx.lineTo(0, size/4)
        break
      case 'square':
        ctx.rect(-size / 2, -size / 2, size, size)
        break
      default:
        console.warn(`Unsupported shape type: ${type}`)
        break
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

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = e.touches[0]
    handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY } as React.MouseEvent<HTMLCanvasElement>)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = e.touches[0]
    handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY } as React.MouseEvent<HTMLCanvasElement>)
  }

  const handleTouchEnd = () => {
    handleMouseUp()
  }

  return (
    <Card className="w-full aspect-square max-w-[500px] max-h-[500px] mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </Card>
  )
})

DrawingCanvas.displayName = 'DrawingCanvas'

export default DrawingCanvas











