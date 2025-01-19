'use client'

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from "react"
import { moodOptions, type MoodOption } from "../type/shapes"

interface ColorSelectorProps {
  onSelectColor: (color: string) => void
  selectedColor: string | null
}

export function ColorSelector({ onSelectColor, selectedColor }: ColorSelectorProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const colorsPerPage = 4
  const totalPages = Math.ceil(moodOptions.length / colorsPerPage)

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const currentColors = moodOptions.slice(
    currentPage * colorsPerPage,
    (currentPage + 1) * colorsPerPage
  )

  return (
    <Card className="w-[400px] h-[500px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Colors</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="grid gap-2">
          {currentColors.map((option: MoodOption) => (
            <Button
              key={option.color}
              variant={selectedColor === option.color ? "default" : "outline"}
              className="w-full justify-start p-2 h-auto"
              onClick={() => onSelectColor(option.color)}
              style={{ backgroundColor: option.color, color: getContrastColor(option.color) }}
            >
              <div className="flex items-center space-x-2">
                <div className="text-left">
                  <div className="font-medium text-sm">{option.mood}</div>
                  <div className="text-xs">{option.color}</div>
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
            aria-label="Previous colors"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            aria-label="Next colors"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function getContrastColor(hexColor: string): string {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}

