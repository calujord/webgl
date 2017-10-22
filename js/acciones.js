
function mvPushMatrix() {
    var copy = mat4.create();
    mat4.set(mvMatrix, copy);
    mvMatrixStack.push(copy);
}

function mvPopMatrix() {
    if (mvMatrixStack.length == 0) {
        throw "Invalid popMatrix!";
    }
    mvMatrix = mvMatrixStack.pop();
}

function setMatrixUniforms() {
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    gl.uniform3f(shaderProgram.vertexColorVecUniform, vertexColorMatrix[0]/255, vertexColorMatrix[1]/255, vertexColorMatrix[2]/255);
}

function setIntUniform() {
    gl.uniform1i(shaderProgram.fragDirectionUniform, fragmentDirection);
    gl.uniform1i(shaderProgram.vertexColoringUniform, vertexColoring);
    gl.uniform1i(shaderProgram.vertexColoringUniform2, vertexColoring);
}


function initBuffers() {
    // BUFFERS DE LA PIRÀMIDE
    pyramidVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexPositionBuffer);

    var vertices = [
    // Front face
    0.0,  1.0,  0.0,
    -1.0, -1.0,  1.0,
    1.0, -1.0,  1.0,
    // Right face
    0.0,  1.0,  0.0,
    1.0, -1.0,  1.0,
    1.0, -1.0, -1.0,
    // Back face
    0.0,  1.0,  0.0,
    1.0, -1.0, -1.0,
    -1.0, -1.0, -1.0,
    // Left face
    0.0,  1.0,  0.0,
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    // Bottom face 1
    -1.0,  -1.0,  -1.0,
    1.0, -1.0, -1.0,
    -1.0, -1.0, 1.0,
    // Bottom face 2
    1.0,  -1.0,  -1.0,
    1.0, -1.0, 1.0,
    -1.0, -1.0,  1.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    pyramidVertexPositionBuffer.itemSize = 3;
    pyramidVertexPositionBuffer.numItems = 18;

    pyramidVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexColorBuffer);
    var colors = [
    // Front face
    0.37, 0.74, 0.70, 1.0,
    0.37, 0.74, 0.70, 1.0,
    0.37, 0.74, 0.70, 1.0,

    // Right face
    0.89, 0.49, 0.37, 1.0,
    0.89, 0.49, 0.37, 1.0,
    0.89, 0.49, 0.37, 1.0,

    // Back face
    0.88, 0.18, 0.25, 1.0,
    0.88, 0.18, 0.25, 1.0,
    0.88, 0.18, 0.25, 1.0,

    // Left face
    0.08, 0.17, 0.23, 1.0,
    0.08, 0.17, 0.23, 1.0,
    0.08, 0.17, 0.23, 1.0,

    // Bottom face 1
    0.94, 0.87, 0.67, 1.0,
    0.94, 0.87, 0.67, 1.0,
    0.94, 0.87, 0.67, 1.0,

    // Bottom face 2
    0.94, 0.87, 0.67, 1.0,
    0.94, 0.87, 0.67, 1.0,
    0.94, 0.87, 0.67, 1.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    pyramidVertexColorBuffer.itemSize = 4;
    pyramidVertexColorBuffer.numItems = 18;


    // BUFFERS DEL CUB
    cubeVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    vertices = [
    // Front face
    -1.0, -1.0,  1.0,
    1.0, -1.0,  1.0,
    1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
    1.0,  1.0, -1.0,
    1.0, -1.0, -1.0,

    // Top face
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
    1.0,  1.0,  1.0,
    1.0,  1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,

    // Right face
    1.0, -1.0, -1.0,
    1.0,  1.0, -1.0,
    1.0,  1.0,  1.0,
    1.0, -1.0,  1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    cubeVertexPositionBuffer.itemSize = 3;
    cubeVertexPositionBuffer.numItems = 24;

    cubeVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer);
    colors = [
        [0.2, 0.2, 0.2, 1.0], // Front face
        [0.4, 0.4, 0.4, 1.0], // Back face
        [0.6, 0.6, 0.6, 1.0], // Top face
        [0.5, 0.5, 0.5, 1.0], // Bottom face
        [0.3, 0.3, 0.3, 1.0], // Right face
        [0.1, 0.1, 0.1, 1.0]  // Left face
    ];
    var unpackedColors = [];
    for (var i in colors) {
        var color = colors[i];
        for (var j=0; j < 4; j++) {
            unpackedColors = unpackedColors.concat(color);
        }
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(unpackedColors), gl.STATIC_DRAW);
    cubeVertexColorBuffer.itemSize = 4;
    cubeVertexColorBuffer.numItems = 24;

    cubeVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    var cubeVertexIndices = [
        0, 1, 2,      0, 2, 3,    // Front face
        4, 5, 6,      4, 6, 7,    // Back face
        8, 9, 10,     8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15, // Bottom face
        16, 17, 18,   16, 18, 19, // Right face
        20, 21, 22,   20, 22, 23  // Left face
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
    cubeVertexIndexBuffer.itemSize = 1;
    cubeVertexIndexBuffer.numItems = 36;

    // BUFFERS DE PRISME
    prismVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, prismVertexPositionBuffer);

    var vertices = [
        // Top face
        -1.0,  1.0,  -1.0,
        0.0, 1.0,  1.0,
        1.0, 1.0,  -1.0,
        // Bottom face
        -1.0,  -1.0,  -1.0,
        0.0, -1.0,  1.0,
        1.0, -1.0,  -1.0,
        // Right face 1
        1.0,  1.0,  -1.0,
        1.0, -1.0, -1.0,
        0.0, 1.0, 1.0,
        // Right face 2
        1.0, -1.0, -1.0,
        0.0, 1.0, 1.0,
        0.0, -1.0,  1.0,
        // Left face 1
        -1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0,
        0.0, 1.0,  1.0,
        // Left face 2
        0.0, 1.0, 1.0,
        0.0, -1.0, 1.0,
        -1.0, -1.0,  -1.0,
        // Back face 1
        -1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0,
        1.0, 1.0,  -1.0,
        // Back face 2
        1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0,
        1.0, -1.0,  -1.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    prismVertexPositionBuffer.itemSize = 3;
    prismVertexPositionBuffer.numItems = 24;

    prismVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, prismVertexColorBuffer);
    var colors = [
        // Top face
        0.09, 0.03, 0.07, 1.0,
        0.09, 0.03, 0.07, 1.0,
        0.09, 0.03, 0.07, 1.0,

        // Bottom face
        0.41, 0.08, 0.06, 1.0,
        0.41, 0.08, 0.06, 1.0,
        0.41, 0.08, 0.06, 1.0,

        // Right face
        0.64, 0.10, 0.08, 1.0,
        0.64, 0.10, 0.08, 1.0,
        0.64, 0.10, 0.08, 1.0,

        // Right face
        0.64, 0.10, 0.08, 1.0,
        0.64, 0.10, 0.08, 1.0,
        0.64, 0.10, 0.08, 1.0,

        // Left face
        0.90, 0.24, 0.07, 1.0,
        0.90, 0.24, 0.07, 1.0,
        0.90, 0.24, 0.07, 1.0,

        // Left face
        0.90, 0.24, 0.07, 1.0,
        0.90, 0.24, 0.07, 1.0,
        0.90, 0.24, 0.07, 1.0,

        // Back face
        0.2, 0.2, 0.2, 1.0,
        0.2, 0.2, 0.2, 1.0,
        0.2, 0.2, 0.2, 1.0,

        // Back face
        0.2, 0.2, 0.2, 1.0,
        0.2, 0.2, 0.2, 1.0,
        0.2, 0.2, 0.2, 1.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    prismVertexColorBuffer.itemSize = 4;
    prismVertexColorBuffer.numItems = 24;
}


function drawScene() {
    // declarem càmera perspectiva amb paràmetres i incialitzem viewport
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.identity(mvMatrix);

    // tractament si càmera perspectiva
    if(!orthogonal) {
        if(cameraSelectorValue < 0) {
            cameraSelectorValue = 90;
        }
        mat4.perspective(cameraSelectorValue, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix); 
        document.getElementById("cameraValue").innerHTML = cameraSelectorValue +'º';
    }
    // tractament si càmera ortogonal o axonomètrica
    else {
        mat4.ortho(-cameraSelectorValue*0.15/2, cameraSelectorValue*0.15/2, -cameraSelectorValue*0.15/2, cameraSelectorValue*0.15/2, 0.1, 100, pMatrix);
        document.getElementById("cameraValue").innerHTML = "Viewport/2 = " + (cameraSelectorValue*0.15/2).toFixed(1);;
    }

    // comencem a dibuixar
    mat4.translate(mvMatrix, [0.0, 0.0, -7.0]);
    mat4.translate(mvMatrix, [despXPyramid, despYPyramid, despZPyramid]);

    // dibuixem piràmide
    mvPushMatrix();

    mat4.rotate(mvMatrix, -rotXPyramid, [1, 0, 0]);
    mat4.rotate(mvMatrix, rotYPyramid, [0, 1, 0]);

    mat4.scale(mvMatrix, scalePyramid);

    gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, pyramidVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexColorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, pyramidVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

    setMatrixUniforms();
    setIntUniform();

    gl.drawArrays(gl.TRIANGLES, 0, pyramidVertexPositionBuffer.numItems);

    mvPopMatrix();
    // reestablim matriu de projecció
    mat4.translate(mvMatrix, [-despXPyramid, -despYPyramid, -despZPyramid]);

    // dibuixem cub
    mat4.translate(mvMatrix, [despXCube, despYCube, despZCube]);
    
    mvPushMatrix();
    
    mat4.rotate(mvMatrix, -rotXCube, [1, 0, 0]);
    mat4.rotate(mvMatrix, rotYCube, [0, 1, 0]);

    mat4.scale(mvMatrix, scaleCube);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, cubeVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    
    setMatrixUniforms();
    
    gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    mvPopMatrix();
    // reestablim matriu de projecció
    mat4.translate(mvMatrix, [-despXCube, -despYCube, -despZCube]);

    // dibuixem prisme triangular
    if(drawPrism) {
        if(firstPrism) {
            despXPrism = prismX/30;
            despYPrism = prismY/30;
        }
        mat4.translate(mvMatrix, [despXPrism, despYPrism, despZPrism]);

        mvPushMatrix();
        
        mat4.rotate(mvMatrix, -rotXPrism, [1, 0, 0]);
        mat4.rotate(mvMatrix, rotYPrism, [0, 1, 0]);

        mat4.scale(mvMatrix, scalePrism);

        gl.bindBuffer(gl.ARRAY_BUFFER, prismVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, prismVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, prismVertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, prismVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

        setMatrixUniforms();
        setIntUniform();

        gl.drawArrays(gl.TRIANGLES, 0, prismVertexPositionBuffer.numItems);

        mvPopMatrix();
        // reestablim matriu de projecció
        mat4.translate(mvMatrix, [-despXPrism, -despYPrism, -despZPrism]);

        firstPrism = false;
    }
}

function calculateDesp(x, y, canvas) {
    if(x > clickAntX) {
        despX1 = 1;
    }
    else {
        if(x < clickAntX) {
            despX1 = -1;
        }
        else {
            despX1 = 0;
        }
    }

    if(y > clickAntY) {
        despY1 = -1;
    }
    else {
        if(y < clickAntY) {
            despY1 = 1;
        }
        else {
            despY1 = 0;
        }
    }
    clickAntX = x;
    clickAntY = y;

    drawAction();
}

function drawAction() {
    if (document.getElementById("pyramidCheck").checked) {
        if (document.getElementById("rotationCheck").checked) {
            rotXPyramid += despY1*ROT_CONST;
            rotYPyramid += despX1*ROT_CONST;
            rotZPyramid += despX1*ROT_CONST;
        }
        if (document.getElementById("translationCheck").checked) {
            despXPyramid += despX1*TRANS_CONST;
            despYPyramid += despY1*TRANS_CONST;
        }
        if (document.getElementById("scalationCheck").checked) {
            if(despY1 > 0) {
                scalePyramid = [scalePyramid[0] + SCALE_CONST, scalePyramid[1] + SCALE_CONST, scalePyramid[2] + SCALE_CONST];
            }
            else {
                scalePyramid = [scalePyramid[0] - SCALE_CONST, scalePyramid[1] - SCALE_CONST, scalePyramid[2] - SCALE_CONST];
            }
        }
    }  

    if (document.getElementById("cubeCheck").checked) {
        if (document.getElementById("rotationCheck").checked) {
            rotXCube += despY1*ROT_CONST;
            rotYCube += despX1*ROT_CONST;
            rotZCube += despX1*ROT_CONST;
        }
        if (document.getElementById("translationCheck").checked) {
            despXCube += despX1*TRANS_CONST;
            despYCube += despY1*TRANS_CONST;
        }
        if (document.getElementById("scalationCheck").checked) {
            if(despY1 > 0) {
                scaleCube = [scaleCube[0] + SCALE_CONST, scaleCube[1] + SCALE_CONST, scaleCube[2] + SCALE_CONST];
            }
            else {
                scaleCube = [scaleCube[0] - SCALE_CONST, scaleCube[1] - SCALE_CONST, scaleCube[2] - SCALE_CONST];
            }
        }
    }       

    if (document.getElementById("prismCheck").checked) {
        if (document.getElementById("rotationCheck").checked) {
            rotXPrism += despY1*ROT_CONST;
            rotYPrism += despX1*ROT_CONST;
            rotZPrism += despX1*ROT_CONST;
        }
        if (document.getElementById("translationCheck").checked) {
            despXPrism += despX1*TRANS_CONST;
            despYPrism += despY1*TRANS_CONST;
        }
        if (document.getElementById("scalationCheck").checked) {
            if(despY1 > 0) {
                scalePrism = [scalePrism[0] + SCALE_CONST, scalePrism[1] + SCALE_CONST, scalePrism[2] + SCALE_CONST];
            }
            else {
                scalePrism = [scalePrism[0] - SCALE_CONST, scalePrism[1] - SCALE_CONST, scalePrism[2] - SCALE_CONST];
            }
        }
    }     
    drawScene();
}

function updateCameraValue(newVal) {
    cameraSelectorValue = newVal;
    drawScene();
}

function changeCamera(ortho) {
    orthogonal = (ortho == true) ? true : false;
    drawScene();
}

function setFragmentUniform(value) {
    fragmentDirection = value;
    drawScene();
}

function setVertexUniform() {
    (vertexColoring == 0) ? vertexColoring = 1 : vertexColoring = 0;
    drawScene();
}

function changeColorPicker(color) {
    var red = parseInt(color.substring(1,3), 16);
    var green = parseInt(color.substring(3,5), 16);
    var blue = parseInt(color.substring(5,7), 16);

    vertexColorMatrix = [red, green, blue];
    setMatrixUniforms;
    drawScene();
}