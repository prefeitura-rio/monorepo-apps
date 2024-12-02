declare module '*.svg' {
  const value: string
  export default ReactComponent
}

declare module '*.png' {
  const value: string // PNG files are typically imported as strings (the file path)
  export default value
}
