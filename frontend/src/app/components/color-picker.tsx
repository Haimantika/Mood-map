import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    onChange(newColor)
  }

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="background-color">Background Color:</Label>
      <Input
        id="background-color"
        type="color"
        value={color}
        onChange={handleColorChange}
        className="w-12 h-8 p-0 border-none"
      />
      <Input
        type="text"
        value={color}
        onChange={handleColorChange}
        className="w-24"
      />
    </div>
  )
}





