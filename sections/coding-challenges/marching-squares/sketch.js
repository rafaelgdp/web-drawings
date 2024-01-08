// @author Rafael Pontes
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let field = [];
let res = 30;
let cols = Math.trunc(canvas.width / res);
let rows = Math.trunc(canvas.height / res);

class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function getGrayColor(value) {
    return `#rgba(${value * 255}, ${value * 255}, ${value * 255}, ${value})`;
}

function line(start, end) {
    if (start && end) {
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        console.log(`drew this line: ${start}, ${end}`);
    }
}

function getState(v1, v2, v3, v4) {
    v1 = v1 > 0.5 ? 1 : 0;
    v2 = v2 > 0.5 ? 1 : 0;
    v3 = v3 > 0.5 ? 1 : 0;
    v4 = v4 > 0.5 ? 1 : 0;
    return v1 * 1 + v2 * 2 + v3 * 4 + v4 * 8;
}

function getPointPairs(state, a, b, c, d) {
    let linePoints = {
        0: [],
        1: [[a, d]],
        2: [[a, b]],
        3: [[b, d]],
        4: [[c, b]],
        5: [[a, b], [d, c]],
        6: [[a, c]],
        7: [[c, d]],
        8: [[c, d]],
        9: [[a, c]],
        10: [[a, d], [c, b]],
        11: [[c, b]],
        12: [[b, d]],
        13: [[b, a]],
        14: [[a, d]],
        15: []
    }
    return linePoints[state];
}

function setup() {
    ctx.fillColor = 'black';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    for (let i = 0; i < cols; i++) {
        field.push([]);
        for (let j = 0; j < rows; j++) {
            field[i].push(Math.random() > 0.5 ? 1 : 0);
            ctx.globalAlpha = field[i][j];
            ctx.fillRect(i * res, j * res, 2, 2);
            ctx.stroke();
        }
    }

    ctx.strokeStyle = 'black';
    ctx.globalAlpha = 1;

    for (let col = 0; col < cols-1; col++) {
        let x = col * res;
        for (let row = 0; row < rows-1; row++) {
            let y = row * res;
            let a = new Vector2(x + res * 0.5, y);
            let b = new Vector2(x + res, y + res * 0.5);
            let c = new Vector2(x + res * 0.5, y + res);
            let d = new Vector2(x, y + res * 0.5);
            let state = getState(
                field[col][row],
                field[col+1][row],
                field[col+1][row+1],
                field[col][row+1]
            );
            let lines = getPointPairs(state, a, b, c, d);
            console.log(`${row} ${col}:`);
            console.log(lines);
            if (lines.length > 0) {
                lines.forEach((pair) => {
                        line(pair[0], pair[1]);
                });
            }
        }
    }
}

setup();