// Basic Shader
// Rob Sawyer
// @see https://threejs.org/docs/#api/en/renderers/webgl/WebGLProgram

// object.matrixWorld
// uniform mat4 modelMatrix;

// camera.matrixWorldInverse * object.matrixWorld
// uniform mat4 modelViewMatrix;

// camera.projectionMatrix
// uniform mat4 projectionMatrix;

// camera.matrixWorldInverse
// uniform mat4 viewMatrix;

// inverse transpose of modelViewMatrix
// uniform mat3 normalMatrix;

// camera position in world space
// uniform vec3 cameraPosition;

// default vertex attributes provided by Geometry and BufferGeometry
// attribute vec3 position;
// attribute vec3 normal;
// attribute vec2 uv;

uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
uniform sampler2D texture1;

float PI = 3.141592653589793238;

void main() {
  vUv = uv;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
  gl_PointSize = 1000. * ( 1. / - mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}