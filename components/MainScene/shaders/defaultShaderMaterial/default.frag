// Basic Shader
// Rob Sawyer
// @see https://threejs.org/docs/#api/en/renderers/webgl/WebGLProgram

// ThreeJS defaults
// uniform mat4 viewMatrix;
// uniform vec3 cameraPosition;

#ifdef GL_ES
precision mediump float;
#endif

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

uniform float progress;
uniform sampler2D texture1; 

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

float PI = 3.14159265358979323846264338;

void main() {

    // @see https://community.khronos.org/t/getting-the-normal-with-dfdx-and-dfdy/70177
    // vec3 X = dFdx(vNormal);
    // vec3 Y = dFdy(vNormal);
    // vec3 normal = normalize(cross(X,Y));

    // float diffuse = dot(normal, vec3(1.));
    // vec4 t = texture2D(texture1, vUv);
    // // gl_FragColor = vec4(vUv, 0.0, 1.);
    // gl_FragColor = t;
    // gl_FragColor =  vec4(diffuse);

    // gl_FragColor = vec4(vUv,0.0,1.);
    float r = sin(vUv.x - iMouse.x) * 0.5 + 0.5;
    float b = sin(vUv.y + iMouse.y) * cos(iTime * 0.5) + 0.5;
    float g = sin((vUv.x + vUv.y + sin(iTime * 0.5)) * 0.5) * 0.5 + 0.5;

    vec2 st = gl_FragCoord.xy / iResolution;

    // gl_FragColor = vec4(r, g, b, 1.0);
    gl_FragColor = vec4(st.x, st.y, 0.0, 1.0);
}




