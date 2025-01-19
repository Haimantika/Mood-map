'use client'

import { type MoodShape } from "../type/shapes"

interface ShapePreviewProps {
  shape: MoodShape
  className?: string
  size?: number
}

export function ShapePreview({ shape, className = "", size = 24 }: ShapePreviewProps) {
  const center = size / 2
  const scale = size / 24 // Base scale factor

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      {shape === 'circle' && (
        <circle cx={center} cy={center} r={center - 2} />
      )}
      {shape === 'teardrop' && (
        <path d={`M${center} ${2} C${size-2} ${center} ${size-2} ${size-2} ${center} ${size-2} C${2} ${size-2} ${2} ${center} ${center} ${2}Z`} />
      )}
      {shape === 'triangle' && (
        <path d={`M${center} ${2} L${size-2} ${size-2} L${2} ${size-2}Z`} />
      )}
      {shape === 'blob' && (
        <path d={`M${center} ${2} C${size-2} ${2} ${size-2} ${center} ${size-4} ${size-4} C${center} ${size-2} ${2} ${size-2} ${2} ${center} C${2} ${2} ${center} ${2} ${center} ${2}Z`} />
      )}
      {shape === 'spike' && (
        <path d={`M${2} ${size-2} L${center} ${2} L${size-2} ${size-2} L${center} ${center}Z`} />
      )}
      {shape === 'starburst' && (
        <path d={`M${center} ${2} L${center+5} ${center-5} L${size-2} ${center} L${center+5} ${center+5} L${center} ${size-2} L${center-5} ${center+5} L${2} ${center} L${center-5} ${center-5}Z`} />
      )}
      {shape === 'spiral' && (
        <path d={`M${center} ${center} C${center+8} ${center-8} ${center+8} ${center+8} ${center} ${center+8} C${center-6} ${center+6} ${center-6} ${center-6} ${center} ${center-6} C${center+4} ${center-4} ${center+4} ${center+4} ${center} ${center+4}`} />
      )}
      {shape === 'vine' && (
        <path d={`M${2} ${size-2} Q${center} ${2} ${size-2} ${size-2} Q${center} ${center} ${2} ${size-2}Z`} />
      )}
      {shape === 'loop' && (
        <path d={`M${center-8} ${center} A8 8 0 1 0 ${center+8} ${center} A8 8 0 1 0 ${center-8} ${center}Z`} />
      )}
      {shape === 'wave' && (
        <path d={`M${2} ${center} Q${center/2} ${2} ${center} ${center} Q${center*1.5} ${size-2} ${size-2} ${center}`} />
      )}
      {shape === 'arrow' && (
        <path d={`M${center} ${2} L${size-2} ${center} L${center+4} ${center} L${center+4} ${size-2} L${center-4} ${size-2} L${center-4} ${center} L${2} ${center}Z`} />
      )}
      {shape === 'square' && (
        <rect x={2} y={2} width={size-4} height={size-4} />
      )}
    </svg>
  )
}

