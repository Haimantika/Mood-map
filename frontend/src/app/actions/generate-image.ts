'use server'

import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import type { MoodShape } from '../type/shapes'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in the environment variables')
}

export async function generateSketch(emotion: string): Promise<{ success: boolean; shapes?: MoodShape[]; error?: string }> {
  try {
    const response = await generateText({
      model: openai('gpt-4'),
      prompt: `Based on the emotion "${emotion}", generate a description of an abstract sketch using 1-3 shapes. Each shape should be either a circle, square, or triangle. For each shape, specify its type, size (small, medium, or large), position (top, bottom, left, right, or center), and a color that represents the emotion. Format the response as a JSON array of objects, each with properties: type, size, position, and color. For example: [{"type":"circle","size":"large","position":"center","color":"#FFD700"}]`,
    })

    if (!response.text) {
      throw new Error('No text generated from the AI model')
    }

    const shapes: MoodShape[] = JSON.parse(response.text)

    return {
      success: true,
      shapes: shapes
    }
  } catch (error) {
    console.error('Error generating sketch:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    }
  }
}

