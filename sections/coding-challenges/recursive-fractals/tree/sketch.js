// @author Rafael Pontes

let canvas = document.getElementById('canvas');
canvas.width = 400;
canvas.height = 400;

let c = canvas.getContext('2d');

class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    rotated(angle) {
        let sin = Math.sin(angle);
        let cos = Math.cos(angle);
        return new Vector2(
            (cos * this.x) - (sin * this.y),
            (sin * this.x) + (cos * this.y));
    }
}

let initialPosition = new Vector2(canvas.width / 2, canvas.height);
let initialDirection = new Vector2(0, -1);
let initialBranchLen = 100;
let angle = Math.PI / 10;

function draw() {
    c.backgroundColor = "white";
    c.lineWidth = 1;
    branch(
        initialPosition,
        initialDirection,
        initialBranchLen
    );
}

function branch(pos, dir, len) {
    let endPos = new Vector2(
        pos.x + (dir.x * len),
        pos.y + (dir.y * len),
    );
    c.moveTo(pos.x, pos.y);
    c.lineTo(endPos.x, endPos.y);
    c.stroke();
    
    if (len > 4) {
        let rightDir = dir.rotated(angle);
        branch(endPos, rightDir, len * 0.67);
        let leftDir = dir.rotated(-angle);
        branch(endPos, leftDir, len * 0.67);
    }
}

draw();

