/**
 * @file WaveText.js
 * @see https://greensock.com/splittext/
 */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { easeBackOut } from 'd3-ease'
import {
  gsap,
  CSSPlugin,
  TweenLite,
  TweenMax,
  MotionPathPlugin,
  Draggable,
  TextPlugin,
} from 'gsap'

import { ScrollTrigger } from '../../gsap-bonus/ScrollTrigger'
import { SplitText } from '../../gsap-bonus/SplitText'

import styles from './WaveText.module.css'

const WaveText = (props) => {
  const { tagName: Tag, className, variant, children } = props

  useEffect(() => {
    // don't forget to register plugins
    gsap.registerPlugin(
      ScrollTrigger,
      SplitText
      // TextPlugin,
      // Draggable,
      // MotionPathPlugin
    )
    const tl = gsap.timeline({
      // scrollTrigger: {
      //   trigger: '.trigger',
      //   start: 'center bottom',
      //   end: 'center top',
      //   scrub: true,
      //   markers: true,
      // },
    })
    const split = new SplitText('#main-text-0', {
      type: 'words, chars',
    })
    //an array of all the divs that wrap each character
    const chars = split.chars

    gsap.set('#main-text-0', { perspective: 400 })
    const alts = [
      {
        duration: 0.8,
        opacity: 0,
        scale: 0,
        y: 80,
        rotationX: 180,
        transformOrigin: '0% 50% -50',
        ease: easeBackOut,
        stagger: 0.01,
      },
      {
        duration: 0.8,
        opacity: 0,
        scale: 0,
        y: 50,
        translateY: 100,
        transformOrigin: '0% 50% -50',
        ease: easeBackOut,
        stagger: 0.01,
      },
    ]
    tl.from(chars, alts[1], '+=1')
  }, [])

  return (
    <Tag
      className={`${styles.wave_text} ${
        styles[`wave_text__${variant}`]
      } ${className}`}
    >
      <p
        id="main-text-0"
        className="w-3/4 text-2xl pointer-events-none select-none trigger"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut odio
        massa. Quisque id erat efficitur, tincidunt libero vitae, mattis sapien.
        Fusce ac orci nisi.
      </p>
      <style jsx>{`
        /* .fact-2I56RYT {
          font-family: IM Fell Great Primer SC, serif;
          font-weight: 400;
          font-size: 2.894rem;
          -webkit-mask-image: radial-gradient(
            circle at 50% 50%,
            #000,
            transparent 140%
          );
          mask-image: radial-gradient(
            circle at 50% 50%,
            #000,
            transparent 140%
          );
        } */
      `}</style>
    </Tag>
  )
}

WaveText.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
}

WaveText.defaultProps = {
  tagName: 'div',
  className: '',
  variant: 'default',
  children: '',
}

export default WaveText
