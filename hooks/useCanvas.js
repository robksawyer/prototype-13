/**
 * useCanvas hook
 * @see https://gist.github.com/IcanDivideBy0/23552eb3aa196a9049670686d13de9de
 */
import React from 'react'

// Usage
// function App() {
//   const draw = React.useCallback((gl) => {
//     gl.clearColor(0.0, 0.0, 0.0, 1.0)
//     gl.clearDepth(1.0)
//     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
//   }, [])
//   const canvasRef = useCanvas(draw, 'webgl2')

//   return <canvas ref={canvasRef} width="800" height="600" />
// }

// Hook
export const useCanvas = (draw, context = '2d') => {
  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    const ctx = canvasRef.current.getContext(context)
    let animationFrameId = requestAnimationFrame(renderFrame)

    function renderFrame() {
      animationFrameId = requestAnimationFrame(renderFrame)
      draw(ctx)
    }

    return () => cancelAnimationFrame(animationFrameId)
  }, [draw, context])

  return canvasRef
}
