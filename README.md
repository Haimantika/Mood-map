# Mood Map Creator

A web-based interactive tool for creating drawings, based on mood. This can help you relax and relieve stress.

## Features

- Draw and manipulate shapes on a canvas
- Color selection for shapes
- Shape customization:
  - Resize shapes using slider controls
  - Rotate shapes with precise angle control
  - Copy, cut, and paste shapes
- Download created mood maps as PNG files
- Fully keyboard accessible
- Screen reader friendly

## Technologies

- Next.Js
- Tailwind CSS
- Lucide React (for icons)

## Installation

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
cd mood-map
npm install

# Start development server
npm run dev
```
## Usage
1. Select a shape from the shape selector
2. Choose a color from the color picker
3. Click on the canvas to place the shape
4. Modify shapes using:
    - Size slider (10-100)
    - Rotation slider (0-360 degrees)
    - Click on shapes to select them

## Keyboard Shortcuts
- `Ctrl/Cmd + C`: Copy selected shape
- `Ctrl/Cmd + V`: Paste copied shape
- `Ctrl/Cmd + X`: Cut selected shape

## Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation support
- High contrast color options

## License
[MIT]()