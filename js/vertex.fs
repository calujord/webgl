// file=""attribute vec3 aVertexPosition;
attribute vec4 aVertexColor;

uniform vec3 vertexColorVec;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec4 vColor;

// funció booleana per saber si activem opcional de vertex shader
uniform int vertexColor;

void main(void) {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    if(vertexColor == 0) {
        vColor = aVertexColor;
    }
    else {
        vColor = vec4(vertexColorVec, 1);
    }
}