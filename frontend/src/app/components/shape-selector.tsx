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
    <Card className="w-[400px] h-[500px] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Shapes</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="grid gap-4">
          {currentShapes.map((option) => (
            <Button
              key={option.shape}
              variant={selectedShape === option.shape ? "default" : "outline"}
              className="w-full justify-start p-4 h-auto"
              onClick={() => onSelectShape(option.shape)}
            >
              <div className="flex items-center space-x-4">
                <ShapePreview 
                  shape={option.shape} 
                  className="w-12 h-12" 
                  size={48}
                />
                <div className="text-left">
                  <div className="font-medium text-lg">{option.mood}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            aria-label="Previous shapes"
          >
            <ChevronUp className="h-6 w-6 mr-2" />
            Previous
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            aria-label="Next shapes"
          >
            Next
            <ChevronDown className="h-6 w-6 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}







