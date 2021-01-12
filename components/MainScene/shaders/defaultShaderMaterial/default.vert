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

#ifdef GL_ES
precision mediump float;
#endif

uniform float iTime; 
uniform vec2 iResolution;
uniform vec2 iMouse;

varying vec2 vUv;
varying vec3 vPosition;
varying vec2 pixels;
varying vec3 vNormal;

float PI = 3.14159265358979323846264338;

void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    //  calculate the position of a vertex in the vertex shader
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}