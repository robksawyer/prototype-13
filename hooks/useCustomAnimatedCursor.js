/**
 * useCustomAnimatedCursor
 * Custom animated cursor hook.
 *
 * @see
 */
import { useEffect, useCallback, useRef, useState } from 'react'
import useMobileDetect from 'use-mobile-detect-hook'

/**
 *
 * @param {*} eventName
 * @param {*} handler
 * @param {*} element
 */
const useEventListener = (eventName, handler, element = document) => {
  const savedHandler = useRef()

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const isSupported = element && element.addEventListener
    if (!isSupported) return

    const eventListener = (event) => savedHandler.current(event)

    element.addEventListener(eventName, eventListener)

    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}

/**
 * useCustomAnimatedCursor
 * Replaces the native cursor with a custom animated cursor.
 */
export const useCustomAnimatedCursor = ({ innerRef, outerRef }) => {
  const { isMobile } = useMobileDetect()
  if (!process.browser || isMobile()) {
    return {
      isActive: false,
      isActiveClickable: false,
      isVisible: false,
    }
  }

  const requestRef = useRef()
  const previousTimeRef = useRef()
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(true)
  const [isActive, setIsActive] = useState(false)
  const [isActiveClickable, setIsActiveClickable] = useState(false)
  let endX = useRef(0)
  let endY = useRef(0)

  const onMouseMove = useCallback(({ clientX, clientY }) => {
    setCoords({ x: clientX, y: clientY })
    innerRef.current.style.top = clientY + 'px'
    innerRef.current.style.left = clientX + 'px'
    endX.current = clientX
    endY.current = clientY
  }, [])

  const animateOuterCursor = useCallback(
    (time) => {
      if (previousTimeRef.current !== undefined) {
        coords.x += (endX.current - coords.x) / 8
        coords.y += (endY.current - coords.y) / 8
        if (outerRef && outerRef.current) {
          outerRef.current.style.top = coords.y + 'px'
          outerRef.current.style.left = coords.x + 'px'
        }
      }
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animateOuterCursor)
    },
    [requestRef] // eslint-disable-line
  )

  useEffect(
    () => (requestRef.current = requestAnimationFrame(animateOuterCursor)),
    [animateOuterCursor]
  )

  const onMouseDown = useCallback(() => setIsActive(true), [])
  const onMouseUp = useCallback(() => setIsActive(false), [])
  const onMouseEnter = useCallback(() => setIsVisible(true), [])
  const onMouseLeave = useCallback(() => setIsVisible(false), [])

  if (process.browser) {
    useEventListener('mousemove', onMouseMove, document)
    useEventListener('pointermove', onMouseMove, document)
    useEventListener('mousedown', onMouseDown, document)
    useEventListener('pointerdown', onMouseDown, document)
    useEventListener('mouseup', onMouseUp, document)
    useEventListener('pointerup', onMouseUp, document)
    useEventListener('mouseenter', onMouseEnter, document)
    useEventListener('mouseleave', onMouseLeave, document)
    useEventListener('pointercancel', onMouseLeave, document)

    // Custom cursor chnages state when hovering on elements with 'data-hover'.
    // document.querySelectorAll('[data-hover]').forEach((link) => {
    //   link.addEventListener('mouseenter', () => onMouseEnter)
    //   link.addEventListener('mouseleave', () => onMouseLeave)
    //   link.addEventListener('click', () => onMouseDown)
    // })
  }

  useEffect(() => {
    const clickables = document.querySelectorAll(
      'a, input[type="submit"], input[type="image"], label[for], select, button, .link'
    )
    clickables.forEach((el) => {
      el.style.cursor = 'none'

      el.addEventListener('mouseover', () => {
        setIsActive(true)
      })
      el.addEventListener('click', () => {
        setIsActive(true)
        setIsActiveClickable(false)
      })
      el.addEventListener('mousedown', () => {
        setIsActiveClickable(true)
      })
      el.addEventListener('mouseup', () => {
        setIsActive(true)
      })
      el.addEventListener('mouseout', () => {
        setIsActive(false)
        setIsActiveClickable(false)
      })
    })

    return () => {
      clickables.forEach((el) => {
        el.removeEventListener('mouseover', () => {
          setIsActive(true)
        })
        el.removeEventListener('click', () => {
          setIsActive(true)
          setIsActiveClickable(false)
        })
        el.removeEventListener('mousedown', () => {
          setIsActiveClickable(true)
        })
        el.removeEventListener('mouseup', () => {
          setIsActive(true)
        })
        el.removeEventListener('mouseout', () => {
          setIsActive(false)
          setIsActiveClickable(false)
        })
      })
    }
  }, [isActive])

  return { isActive, isActiveClickable, isVisible }
}
