let canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
canvas.width = 780;
canvas.height = canvas.width;
let width = canvas.width;
let height = canvas.height;

context.fillStyle = "cornflowerblue";
context.fillRect(0, 0, width, height);

function drawRect(x, y, w, h = null, strokeColor = "black", fillColor = "red") {
    context.fillStyle = fillColor;
    context.strokeStyle = strokeColor;
    if (h === null) h = w;
    context.stroke();
    context.rect(x, y, w, h);
    context.fill();
}

let squareSide = 30;
let separator = 10;
let squareCount = parseInt((width - (2 * separator)) / (squareSide + separator));
let squareMatrix = [];
let initialOffset = 10;
for (let i = 0; i < squareCount; i++) {
    squareMatrix[i] = [];
    for (let j = 0; j < squareCount; j++) {
        squareMatrix[i][j] = {
            x: initialOffset + i * (squareSide + separator),
            y: initialOffset + j * (squareSide + separator),
            w: squareSide,
            h: squareSide
        };
    }
}

var frameCount = 0;

function clearCanvas() {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "cornflowerblue";
    context.fillRect(0, 0, width, height);
}

function drawSquareMatrix() {
    clearCanvas();
    for (let i = 0; i < squareCount; i++) {
        for (let j = 0; j < squareCount; j++) {
            let square = squareMatrix[i][j];
            square.x += Math.sin(frameCount * 0.1) * 10;
            square.y += Math.cos(frameCount * 0.1) * 10;
            drawRect(square.x, square.y, square.w, square.h, "#000", "red");
        }
    }
    frameCount++;
}

drawSquareMatrix();