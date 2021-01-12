/**
 * @file SpinningLoader.js
 * @see
 */
import React, { useEffect, useCallback, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import useMouse from '@react-hook/mouse-position'

import styles from './SpinningLoader.module.css'

import { useCanvas } from '../../hooks/useCanvas'
import { useEventListener } from '../../hooks/useEventListener'

let SCREEN_WIDTH, SCREEN_HEIGHT
const RADIUS = 70

let RADIUS_SCALE = 1
const RADIUS_SCALE_MIN = 1
const RADIUS_SCALE_MAX = 1.5

const QUANTITY = 25

/**
 * createParticles
 * @param object mouse
 * @return array
 */
const createParticles = (mouse) => {
  const particles = []

  const { x, y } = mouse

  for (var i = 0; i < QUANTITY; i++) {
    var particle = {
      size: 1,
      position: { x, y },
      offset: { x: 0, y: 0 },
      shift: { x, y },
      speed: 0.01 + Math.random() * 0.04,
      targetSize: 1,
      fillColor: '#' + ((Math.random() * 0x404040 + 0xaaaaaa) | 0).toString(16),
      orbit: RADIUS * 0.5 + RADIUS * 0.5 * Math.random(),
    }

    particles.push(particle)
  }
  return particles
}

/**
 * loop
 * @param ctx
 * @return void
 */
const loop = (particles, mouse) => (ctx) => {
  let { x, y, clientX, clientY, screenX, screenY, isDown } = mouse
  if (!clientX || !clientY) {
    x = window.innerWidth - SCREEN_WIDTH * 0.5
    y = window.innerHeight - SCREEN_HEIGHT * 0.5
  } else {
    x = clientX - (window.innerWidth - SCREEN_WIDTH) * 0.5
    y = clientY - (window.innerHeight - SCREEN_HEIGHT) * 0.5
  }

  if (isDown) {
    RADIUS_SCALE += (RADIUS_SCALE_MAX - RADIUS_SCALE) * 0.02
  } else {
    RADIUS_SCALE -= (RADIUS_SCALE - RADIUS_SCALE_MIN) * 0.02
  }

  RADIUS_SCALE = Math.min(RADIUS_SCALE, RADIUS_SCALE_MAX)

  ctx.fillStyle = 'rgba(0,0,0,0.05)'
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  for (let i = 0, len = particles.length; i < len; i++) {
    var particle = particles[i]

    var lp = { x: particle.position.x, y: particle.position.y }

    // Rotation
    particle.offset.x += particle.speed
    particle.offset.y += particle.speed

    // Follow mouse with some lag
    particle.shift.x += (x - particle.shift.x) * particle.speed
    particle.shift.y += (y - particle.shift.y) * particle.speed

    // Apply position
    particle.position.x =
      particle.shift.x +
      Math.cos(i + particle.offset.x) * (particle.orbit * RADIUS_SCALE)
    particle.position.y =
      particle.shift.y +
      Math.sin(i + particle.offset.y) * (particle.orbit * RADIUS_SCALE)

    // Limit to screen bounds
    particle.position.x = Math.max(
      Math.min(particle.position.x, SCREEN_WIDTH),
      0
    )
    particle.position.y = Math.max(
      Math.min(particle.position.y, SCREEN_HEIGHT),
      0
    )

    particle.size += (particle.targetSize - particle.size) * 0.05

    if (Math.round(particle.size) == Math.round(particle.targetSize)) {
      particle.targetSize = 1 + Math.random() * 7
    }

    ctx.beginPath()
    ctx.fillStyle = particle.fillColor
    ctx.strokeStyle = particle.fillColor
    ctx.lineWidth = particle.size
    ctx.moveTo(lp.x, lp.y)
    ctx.lineTo(particle.position.x, particle.position.y)
    ctx.stroke()
    ctx.arc(
      particle.position.x,
      particle.position.y,
      particle.size / 2,
      0,
      Math.PI * 2,
      true
    )
    ctx.fill()
  }
  console.log('ctx', ctx)
}

const SpinningLoader = (props) => {
  const { tagName: Tag, className, variant, children } = props
  const container = useRef()

  const mouse = useMouse(container, {
    enterDelay: 100,
    leaveDelay: 100,
  })

  // Event handler utilizing useCallback ...
  // ... so that reference never changes.
  // const mouseMoveHandler = useCallback(
  //   ({ clientX, clientY }) => {
  //     // setMouse({
  //     //   isDown: mouseDetails.isDown,
  //     //   x: clientX - (window.innerWidth - SCREEN_WIDTH) * 0.5,
  //     //   y: clientY - (window.innerHeight - SCREEN_HEIGHT) * 0.5,
  //     // })
  //   },
  //   [mouse]
  // )

  const touchStartHandler = useCallback(({ touches, preventDefault }) => {
    if (touches.length == 1) {
      preventDefault()

      // setMouse({
      //   isDown: mouseDetails.isDown,
      //   x: touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * 0.5,
      //   y: touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * 0.5,
      // })
    }
  }, [])

  const touchMoveHandler = useCallback(({ touches, preventDefault }) => {
    if (touches.length == 1) {
      preventDefault()

      // setMouse({
      //   isDown: mouseDetails.isDown,
      //   x: touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * 0.5,
      //   y: touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * 0.5,
      // })
    }
  }, [])

  const windowResizeHandler = useCallback(() => {
    SCREEN_WIDTH = window.innerWidth
    SCREEN_HEIGHT = window.innerHeight

    canvasRef.current.width = SCREEN_WIDTH
    canvasRef.current.height = SCREEN_HEIGHT
  }, [canvasRef])

  //   // Add event listener using our hook
  // useEventListener('mousemove', mouseMoveHandler)
  // useEventListener('touchstart', touchStartHandler)
  // useEventListener('touchmove', touchMoveHandler)
  useEventListener('resize', windowResizeHandler)

  useEffect(() => {
    // Set the global screen dimensions
    SCREEN_WIDTH = window.innerWidth
    SCREEN_HEIGHT = window.innerHeight
    canvasRef.current.width = SCREEN_WIDTH
    canvasRef.current.height = SCREEN_HEIGHT
    // console.log('particles', particles)
  }, [])

  const particles = useMemo(() => createParticles(mouse), [])

  const canvasRef = useCanvas(loop(particles, mouse))

  return (
    <Tag
      className={`${styles.spinning_loader} ${
        styles[`spinning_loader__${variant}`]
      } ${className}`}
      ref={container}
    >
      <canvas style={{ width: '100vw', height: '100vh' }} ref={canvasRef} />
    </Tag>
  )
}

SpinningLoader.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
}

SpinningLoader.defaultProps = {
  tagName: 'div',
  className: 'absolute z-40 top-0 bg-black w-screen h-screen',
  variant: 'default',
  children: '',
}

export default SpinningLoader
