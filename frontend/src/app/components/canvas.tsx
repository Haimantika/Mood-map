'use client'

import { useRef, useState, useEffect } from 'react'
import { Card } from './ui/card'

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const lastPoint = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return


    canvas.width = 500
    canvas.height = 500


    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
    }
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    lastPoint.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPoint.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const currentPoint = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y)
      ctx.lineTo(currentPoint.x, currentPoint.y)
      ctx.stroke()
    }

    lastPoint.current = currentPoint
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    lastPoint.current = null
  }

  return (
    <Card className="w-100 h-100 mx-auto mt-10">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      />
    </Card>
  )
}



