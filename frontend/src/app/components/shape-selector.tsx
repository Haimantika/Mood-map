'use client'

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from "react"
import { moodOptions, type MoodShape } from "../type/shapes"
import { ShapePreview } from "./shape-preview"

interface ShapeSelectorProps {
  onSelectShape: (shape: MoodShape) => void
  selectedShape: MoodShape | null
}

export function ShapeSelector({ onSelectShape, selectedShape }: ShapeSelectorProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const shapesPerPage = 4
  const totalPages = Math.ceil(moodOptions.length / shapesPerPage)

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const currentShapes = moodOptions.slice(
    currentPage * shapesPerPage,
    (currentPage + 1) * shapesPerPage
  )

  return (
    <Card className="w-full md:w-[250px] md:h-[500px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Mood Shapes</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
          {currentShapes.map((option) => (
            <Button
              key={option.shape}
              variant={selectedShape === option.shape ? "default" : "outline"}
              className="w-full justify-start p-2 h-auto"
              onClick={() => onSelectShape(option.shape)}
            >
              <div className="flex items-center space-x-2">
                <ShapePreview 
                  shape={option.shape} 
                  className="w-8 h-8" 
                  size={32}
                />
                <div className="text-left">
                  <div className="font-medium text-sm">{option.mood}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            aria-label="Previous shapes"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            aria-label="Next shapes"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}








