/*!
 * Proyecto Sistemas Gráficos Interactivos
 * Copyright 2017 Carlos Jordán
 */

/* 1. Definición de constantes */

/* 1.1 Teclas de teclado */
const KEY_PAGE_UP = 33;
const KEY_PAGE_DOWN = 34;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_UP = 38;
const KEY_DOWN = 40;


const ROT_CONST = 0.1; // Constante de rotación 
const TRANS_CONST = 0.13; // Constante de traslación 
const SCALE_CONST = 0.025; // Constante de escala
const INC_SCALE = 0.01; // Constante de escala
const DESP_CONST = 0.05; 

/* 2. Declaración de variables */
var click_x;
var click_y;
var clickAntX;
var clickAntY;
var clickActY;
var clickActY;
var despX1;
var despY1;


/* 3. Declaración de variables de rotación */
var rotXPyramid = 0;
var rotYPyramid = 1;
var rotZPyramid = 0;
var rotXCube = 0;
var rotYCube = 1;
var rotZCube = 0;
var rotXPrism = 0;
var rotYPrism = 0;
var rotZPrism = 0;


/* 4. Declaración de variables de posiciones de las figuras */
var despXPyramid = -2.5;
var despYPyramid = 2;
var despZPyramid = 0;
var despXCube = 2.5;
var despYCube = 2;
var despZCube = 0;
var despXPrism = 0;
var despYPrism = -2;
var despZPrism = 0;


/* 5. Declaración de variables de escalas de figura */
var scalePyramid = [1, 1, 1];
var scaleCube = [1, 1, 1];
var scalePrism = [1, 1, 1];

// booleà que determina si es dibuixa o no prisma

/* 6. Declaración de variables si dibuja el prisma o no*/
var drawPrism = false;

/* 7. Declaración de variables por opciones de shaders */
var fragmentDirection = 0;
var vertexColoring = 0;
var vertexColorMatrix = [0, 0, 0];
var red = 0;
var green = 0; 
var blue = 0;

/* 8. Declaración de variables por tipo de cámara */
var orthogonal = false;
var cameraSelectorValue = -1;

/* 9. Declaración de variables por tipo de cámara */
var screenX = window.innerWidth;
var canvasmiddleX = (screenX/2) - (150/2);
var canvasmiddleY = 450/2 + 20;   

// variables per a tractament de posició inicial de prisme en drag-and-drop

/* 9. Declaración de variables de la posición inicial del prisma */
var prismX = 0;
var prismY = 0; 
var firstPrism = true;


