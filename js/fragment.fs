// file=""precision mediump float;

varying vec4 vColor;

uniform int fragDirection;

// funció booleana per saber si activem opcional de vertex shader
uniform int vertexColor2;

void main(void) {
    if(vertexColor2 == 0) {
        if(fragDirection == 0) { // si no s'especifiquen paràmetres de franges
            gl_FragColor = vColor;
    }
    else {
            if(fragDirection == 1) { // si les franges són verticals
                if(mod(gl_FragCoord.x, 10.0) > 5.0) {
                    discard;
                }
                else {
                    gl_FragColor = vColor;
                }
            }
            else { // si les franges són horitzontals
                if(mod(gl_FragCoord.y, 10.0) > 5.0) {
                    discard;
                }
                else {
                    gl_FragColor = vColor;
                }
            }  
        }
    }
    else {
        vec4 color = vec4(vColor.r*(gl_FragCoord.y/450.0), vColor.g*(gl_FragCoord.y/450.0), vColor.b*(gl_FragCoord.y/450.0), 1.0);
        if(fragDirection == 0) { // si no s'especifiquen paràmetres de franges
            gl_FragColor = color;
    }
    else {
            if(fragDirection == 1) { // si les franges són verticals
                if(mod(gl_FragCoord.x, 10.0) > 5.0) {
                    discard;
                }
                else {
                    gl_FragColor = color;
                }
            }
            else { // si les franges són horitzontals
                if(mod(gl_FragCoord.y, 10.0) > 5.0) {
                    discard;
                }
                else {
                    gl_FragColor = color;
                }
            }  
        }
        
    }
}  