/**
 * @file ShaderGeometry.js
 */
import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { useTweaks } from 'use-tweaks'
import {
  extend,
  // useFrame
} from 'react-three-fiber'
import {
  // MathUtils,
  Color,
} from 'three'
import { useSubdivision, shaderMaterial } from '@react-three/drei'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper'

import styles from './ShaderGeometry.module.css'

import vertex from './shaders/colorShift/colorShift.vert'
import fragment from './shaders/colorShift/colorShift.frag'

const ColorShiftMaterial = shaderMaterial(
  { time: 0, color: new Color(0.2, 0.0, 0.1) },
  // vertex shader
  vertex,
  // fragment shader
  fragment
)

extend({ ColorShiftMaterial })

const Everything = () => {
  const mesh = useSubdivision(Math.PI / 0.5)

  const { time } = useTweaks({
    time: { value: 1, min: 0, max: 1 },
  })

  // useFrame(({ clock, mouse }) => {
  //   mesh.current.material.uniforms['time'].value = clock.getElapsedTime()
  // })

  return (
    <mesh ref={mesh} position={[0, 2.5, 0]} castShadow>
      <boxGeometry />
      <colorShiftMaterial attach="material" color="black" time={time} />
    </mesh>
  )
}

const ShaderGeometry = (props) => {
  const { tagName: Tag, className, variant, children } = props

  return <Everything />
}

ShaderGeometry.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
}

ShaderGeometry.defaultProps = {
  tagName: 'div',
  className: '',
  variant: 'default',
  children: '',
}

export default ShaderGeometry
