function modifyAllScales(bigger) {
    if(bigger) {
        scalePyramid = [scalePyramid[0] + INC_SCALE, scalePyramid[1] + INC_SCALE, scalePyramid[2] + INC_SCALE];
        scaleCube = [scaleCube[0] + INC_SCALE, scaleCube[1] + INC_SCALE, scaleCube[2] + INC_SCALE];
        scalePrism = [scalePrism[0] + INC_SCALE, scalePrism[1] + INC_SCALE, scalePrism[2] + INC_SCALE];  
    }
    else {
        scalePyramid = [scalePyramid[0] - INC_SCALE, scalePyramid[1] - INC_SCALE, scalePyramid[2] - INC_SCALE];
        scaleCube = [scaleCube[0] - INC_SCALE, scaleCube[1] - INC_SCALE, scaleCube[2] - INC_SCALE];
        scalePrism = [scalePrism[0] - INC_SCALE, scalePrism[1] - INC_SCALE, scalePrism[2] - INC_SCALE];
    }
}

function handleKeyDown(event) {
    var desp;
    if (document.getElementById("translationCheck").checked) {
        if (event.keyCode == KEY_PAGE_UP) {
            despZPyramid += DESP_CONST;            
            despZCube += DESP_CONST;       
            despZPrism += DESP_CONST;
        }
        if (event.keyCode == KEY_PAGE_DOWN) {
            despZPyramid -= DESP_CONST;            
            despZCube -= DESP_CONST;       
            despZPrism -= DESP_CONST;
        }
        if (event.keyCode == KEY_LEFT) {
            despXPyramid -= DESP_CONST;
            despXCube -= DESP_CONST;
            despXPrism -= DESP_CONST;
        }
        if (event.keyCode == KEY_RIGHT) {
            despXPyramid += DESP_CONST;
            despXCube += DESP_CONST;
            despXPrism += DESP_CONST;
        }
        if (event.keyCode == KEY_UP) {
            despYPyramid += DESP_CONST;
            despYCube += DESP_CONST;
            despYPrism += DESP_CONST;
        }
        if (event.keyCode == KEY_DOWN) {
            despYPyramid -= DESP_CONST;
            despYCube -= DESP_CONST;
            despYPrism -= DESP_CONST;
        }
    }
    else {
        if (document.getElementById("rotationCheck").checked) {
            if (event.keyCode == KEY_LEFT) {
                rotYPyramid -= DESP_CONST;
                rotYCube -= DESP_CONST;
                rotYPrism -= DESP_CONST;
            }
            if (event.keyCode == KEY_RIGHT) {
                rotYPyramid += DESP_CONST;
                rotYCube += DESP_CONST;
                rotYPrism += DESP_CONST;
            }
            if (event.keyCode == KEY_UP) {
                rotXPyramid += DESP_CONST;
                rotXCube += DESP_CONST;
                rotXPrism += DESP_CONST;
            }
            if (event.keyCode == KEY_DOWN) {
                rotXPyramid -= DESP_CONST;
                rotXCube -= DESP_CONST;
                rotXPrism -= DESP_CONST;
            }
        }
        else {
            // escalar tots els elements
            if (event.keyCode == KEY_PAGE_UP) {
                modifyAllScales(true);          
            }
            if (event.keyCode == KEY_PAGE_DOWN) {
                modifyAllScales(false);       
            }
            if (event.keyCode == KEY_LEFT) {
                modifyAllScales(false);
            }
            if (event.keyCode == KEY_RIGHT) {
                modifyAllScales(true);
            }
            if (event.keyCode == KEY_UP) {
                modifyAllScales(false);
            }
            if (event.keyCode == KEY_DOWN) {
                modifyAllScales(true);
            }
        }
    }
    drawScene();
}