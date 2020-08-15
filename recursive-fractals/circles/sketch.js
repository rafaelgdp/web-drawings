// @author Rafael Pontes

let canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 800;

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

let initialCenter = new Vector2(
    canvas.width / 2, canvas.height / 2);
let initialDiameter = 400;

function draw() {
    c.backgroundColor = "white";
    c.lineWidth = 1;
    recursiveCircles(
        initialCenter,
        initialDiameter
    );
}

function drawCircle(center, diameter) {
    c.beginPath();
    c.arc(center.x, center.y, diameter / 2, 0, Math.PI * 2);
    c.stroke();
}

let dProportion = 0.5;
function recursiveCircles(center, diameter) {
    drawCircle(center, diameter);
    if (diameter > 5) {
        recursiveCircles(
            new Vector2(center.x - diameter / 2, center.y),
            diameter * dProportion
        );
        recursiveCircles(
            new Vector2(center.x + diameter / 2, center.y),
            diameter * dProportion
        );
        recursiveCircles(
            new Vector2(center.x, center.y - diameter * dProportion),
            diameter * dProportion
        );
    }
}

draw();

