var requestAnimationFrame = window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) { setTimeout (callback, 1000 / 30); };

var canvas = document.getElementById("canvas-id");
const size = screen.width > screen.height 
    ? screen.height
    : screen.width;

canvas.width = canvas.height = size;
var context = canvas.getContext("2d");

const points = [];
const startPoint = new Object();
startPoint.x = 0;
startPoint.y = 0;

points.push(startPoint);

const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

function update() {
    for (let i = 0; i < 10000; i++) {
        let probability = Math.random();

        const prevPoint = points[points.length - 1];
        const nextPoint = new Object();

        if (probability < 0.01) {
            nextPoint.x = 0;
            nextPoint.y = 0.16 * prevPoint.y;
        } else if (probability < 0.86) {
            nextPoint.x =  0.85 * prevPoint.x + 0.04 * prevPoint.y;
            nextPoint.y = -0.04 * prevPoint.x + 0.85 * prevPoint.y + 1.6;
        } else if (probability < 0.93) {
            nextPoint.x = -0.15 * prevPoint.x + 0.28 * prevPoint.y;
            nextPoint.y =  0.26 * prevPoint.x + 0.24 * prevPoint.y + 0.44;
        } else {
            nextPoint.x = 0.20 * prevPoint.x + -0.26 * prevPoint.y;
            nextPoint.y = 0.23 * prevPoint.x + 0.22	* prevPoint.y + 1.60;
        }

        points.push(nextPoint);
    }
    setTimeout(update, 1);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);      
    context.globalAlpha = 1;

    for (let i = 0; i < points.length; i++) {
        context.fillStyle = "green";
        context.fillRect(map(points[i].x, -2.1820, 2.6558, 0, size), map(points[i].y, 0, 9.9983, size, 0), 1, 1);
    }

    requestAnimationFrame(draw);        
}

update();      
draw(); 