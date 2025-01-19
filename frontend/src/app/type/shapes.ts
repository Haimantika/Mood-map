export type MoodShape = 
  | 'circle'
  | 'teardrop'
  | 'triangle'
  | 'blob'
  | 'spike'
  | 'starburst'
  | 'spiral'
  | 'vine'
  | 'loop'
  | 'wave'
  | 'arrow'
  | 'square'

export interface MoodOption {
  mood: string
  shape: MoodShape
  color: string
}

export interface Shape {
  id: string
  type: MoodShape
  x: number
  y: number
  size: number
  color: string
  rotation: number
}

export const moodOptions: MoodOption[] = [
  { mood: 'Happiness', shape: 'circle',color: '#FFD700' },
  { mood: 'Sadness', shape: 'teardrop', color: '#00008B' },
  { mood: 'Fear', shape: 'triangle', color: '#4B0082' },
  { mood: 'Disgust', shape: 'blob', color: '#808000' },
  { mood: 'Anger', shape: 'spike',  color: '#FF0000' },
  { mood: 'Excitement', shape: 'starburst', color: '#00FFFF' },
  { mood: 'Confusion', shape: 'spiral', color: '#D3D3D3' },
  { mood: 'Envy', shape: 'vine',  color: '#006400' },
  { mood: 'Empathetic', shape: 'loop', color: '#FFDAB9' },
  { mood: 'Sympathy', shape: 'wave',  color: '#ADD8E6' },
  { mood: 'Triumph', shape: 'arrow',  color: '#FFD700' },
  { mood: 'Satisfaction', shape: 'square', color: '#8B4513' }
]



