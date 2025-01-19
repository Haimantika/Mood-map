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
  description: string
}

export const moodOptions: MoodOption[] = [
  { mood: 'Happiness', shape: 'circle', description: 'Shape: Circle' },
  { mood: 'Sadness', shape: 'teardrop', description: 'Shape: Teardrop' },
  { mood: 'Fear', shape: 'triangle', description: 'Shape: Sharp Triangle' },
  { mood: 'Disgust', shape: 'blob', description: 'Shape: Irregular Blob' },
  { mood: 'Anger', shape: 'spike', description: 'Shape: Jagged Spike' },
  { mood: 'Excitement', shape: 'starburst', description: 'Shape: Starburst' },
  { mood: 'Confusion', shape: 'spiral', description: 'Shape: Spiral' },
  { mood: 'Envy', shape: 'vine', description: 'Shape: Twisting Vine' },
  { mood: 'Empathetic', shape: 'loop', description: 'Shape: Interlocking Loop' },
  { mood: 'Sympathy', shape: 'wave', description: 'Shape: Gentle Wave' },
  { mood: 'Triumph', shape: 'arrow', description: 'Shape: Upward Arrow' },
  { mood: 'Satisfaction', shape: 'square', description: 'Shape: Square' }
]