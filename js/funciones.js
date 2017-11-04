/*!
 * Proyecto Sistemas Gráficos Interactivos
 * Copyright 2017 Carlos Jordán
 */


    function degToRad(degrees) {
        return degrees * Math.PI / 180;
    }

function webGLStart() {
    var canvas = document.getElementById("canvas_pr1");
    initGL(canvas);
    initShaders();
    initBuffers();
    gl.clearColor(225/255, 246/255, 254/246, 1.0);
    gl.enable(gl.DEPTH_TEST);

    drawScene();

    var moving; // configura el canvas para el desplazamiento

    canvas.addEventListener('mousedown', function(e){
        click_x = e.clientX;
        click_y = e.clientY;
        moving = true; 
    }, false);

    canvas.addEventListener('mousemove', function(e){
        if(moving) {
            calculateDesp(e.clientX, e.clientY, canvas);
        }
    }, false);

    canvas.addEventListener('mouseup', function(e){
        moving = false;
    }, false);
}

var gl;
function initGL(canvas) {
    try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}


function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

var shaderProgram;

function initShaders() {
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");

    shaderProgram.fragDirectionUniform = gl.getUniformLocation(shaderProgram, "fragDirection");
    shaderProgram.vertexColoringUniform = gl.getUniformLocation(shaderProgram, "vertexColor");
    shaderProgram.vertexColoringUniform2 = gl.getUniformLocation(shaderProgram, "vertexColor2");

    shaderProgram.vertexColorVecUniform = gl.getUniformLocation(shaderProgram, "vertexColorVec");
} 