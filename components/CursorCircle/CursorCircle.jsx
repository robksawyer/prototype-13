/**
 * @file CursorCircle.js
 *
 * Beware: If using a custom url image for cursor
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Basic_User_Interface/Using_URL_values_for_the_cursor_property?redirectlocale=en-US&redirectslug=CSS%2Fcursor%2Furl
 * @see https://stackoverflow.com/questions/18551277/using-external-images-for-css-custom-cursors
 * @see https://stackoverflow.com/questions/4773312/custom-cursor-not-working-correctly-in-chrome/16878752
 */
import React, { Fragment, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import styles from './CursorCircle.module.css'
import { useCustomAnimatedCursor } from '../../hooks/useCustomAnimatedCursor'

const CursorCircle = (props) => {
  const {
    tagName: Tag,
    className,
    variant,
    children,
    cursorColorInner = 'rgba(255, 255, 255, 1)',
    cursorColorOuter = 'rgba(255, 255, 255, 0.75)',
    innerSize = 8,
    outerSize = 22,
    outerScale = 1,
    innerScale = 0.7,
  } = props

  const cursorOuterRef = useRef()
  const cursorInnerRef = useRef()

  const { isActiveClickable, isActive, isVisible } = useCustomAnimatedCursor({
    innerRef: cursorInnerRef,
    outerRef: cursorOuterRef,
  })

  useEffect(() => {
    if (isActive) {
      cursorInnerRef.current.style.transform = `scale(${innerScale}) translate(-67%, -65%)`
      cursorOuterRef.current.style.transform = `scale(${outerScale}) translate(-50%, -50%)`
    } else {
      cursorInnerRef.current.style.transform = 'scale(1) translate(-50%, -50%)'
      cursorOuterRef.current.style.transform = 'scale(1) translate(-50%, -50%)'
    }
  }, [innerScale, outerScale, isActive])

  useEffect(() => {
    if (isActiveClickable) {
      cursorInnerRef.current.style.transform = `scale(${
        innerScale * 1.3
      }) translate(-50%, -50%)`
      cursorOuterRef.current.style.transform = `scale(${
        outerScale * 1.5
      }) translate(-50%, -50%)`
    }
  }, [innerScale, outerScale, isActiveClickable])

  useEffect(() => {
    if (isVisible) {
      cursorInnerRef.current.style.opacity = 1
      cursorOuterRef.current.style.opacity = 1
    } else {
      cursorInnerRef.current.style.opacity = 0
      cursorOuterRef.current.style.opacity = 0
    }
  }, [isVisible])

  const styles = {
    cursor: {
      cursor: 'none',
      zIndex: 999,
      mixBlendMode: 'difference',
      position: 'fixed',
      opacity: 1,
      pointerEvents: 'none',
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
      backgroundColor: 'transparent',
    },
    cursorInner: {
      mixBlendMode: 'difference',
      position: 'fixed',
      borderRadius: '50%',
      width: innerSize,
      height: innerSize,
      pointerEvents: 'none',
      backgroundColor: cursorColorInner,
      transition: 'opacity 0.15s ease-in-out, transform 0.25s ease-in-out',
    },
    cursorOuter: {
      mixBlendMode: 'difference',
      position: 'fixed',
      borderRadius: '50%',
      pointerEvents: 'none',
      width: outerSize,
      height: outerSize,
      backgroundColor: 'transparent',
      borderWidth: '1px',
      borderColor: cursorColorOuter,
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
    },
  }

  return (
    <Fragment>
      <div ref={cursorOuterRef} style={styles.cursorOuter} />
      <div ref={cursorInnerRef} style={styles.cursorInner} />
      <style jsx global>{`
        html,
        body {
          cursor: none;
        }

        html *,
        body * {
          cursor: none;
        }
      `}</style>
    </Fragment>
  )
}

CursorCircle.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
  cursorColorInner: PropTypes.string,
  cursorColorOuter: PropTypes.string,
  innerSize: PropTypes.number,
  outerSize: PropTypes.number,
  outerScale: PropTypes.number,
  innerScale: PropTypes.number,
}

export default CursorCircle
