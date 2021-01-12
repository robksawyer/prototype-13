/**
 * @file Loader.js
 */
import * as React from 'react'
import PropTypes from 'prop-types'
import { useProgress } from '@react-three/drei'
import { a, useTransition } from '@react-spring/web'

import styles from './Loader.module.css'

const Loader = (props) => {
  const { tagName: Tag, className, variant, children } = props

  const { active, progress } = useProgress()
  const transition = useTransition(active, {
    from: { opacity: 1, progress: 0 },
    leave: { opacity: 0 },
    update: { progress },
  })
  return transition(
    ({ progress, opacity }, active) =>
      active && (
        <a.div className="loading" style={{ opacity }}>
          <div className="loading-bar-container">
            <a.div className="loading-bar" style={{ width: progress }}>
              <a.span className="loading-data">
                {progress.to((p) => `${p.toFixed(2)}%`)}
              </a.span>
            </a.div>
          </div>
        </a.div>
      )
  )
}

Loader.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
}

Loader.defaultProps = {
  tagName: 'div',
  className: '',
  variant: 'default',
  children: '',
}

export default Loader
