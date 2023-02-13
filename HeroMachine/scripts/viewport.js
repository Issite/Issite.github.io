let body;
let exbody;
let layers;
let lineColor;
let colorOne;
let colorTwo;
let transX;
let transY;
let scaleX;
let scaleY;
let rot;
let selected;
let hover;

function setup() {
    let viewportDiv = document.getElementById("viewportDiv");
    let viewportCanvas = createCanvas(400, 600);
    viewportCanvas.parent(viewportDiv);
    
    lineColor = document.getElementById("lineColor");
    colorOne = document.getElementById("colorOne");
    colorTwo = document.getElementById("colorTwo");
    transX = document.getElementById("transX");
    transY = document.getElementById("transY");
    scaleX = document.getElementById("scaleX");
    scaleY = document.getElementById("scaleY");
    rot = document.getElementById("rotate");
    
    layers = new Layers([]);
    body = new Item("images/body1", [[0, 0], [1, 1], 0], [0, 0], 0,
    [color(0, 0, 0), color(255, 255, 255), color(127, 127, 127)], [], false);
    exbody = new Item("images/body1", [[0, 0], [1.25, 1.25], 15], [-40, -175], 1,
    [color(0, 255, 0), color(255, 255, 0), color(127, 127, 127)], [], false);
    layers.add(body);
    layers.add(exbody);
    
    imageMode(CENTER);
    angleMode(DEGREES);
    noLoop();
    redraw();
}

function draw() {
    background(255, 255, 255);
    layers.draw();
}

function mouseClicked() {
    if (mouseX > 0 && mouseX < 400 && mouseY > 0 && mouseY < 600) {
        selected = layers.clicked();
        if (selected) {
            lineColor.value = "#" + hex(red(selected.colors[0]), 2) + hex(green(selected.colors[0]), 2) + hex(blue(selected.colors[0]), 2);
            colorOne.value = "#" + hex(red(selected.colors[1]), 2) + hex(green(selected.colors[1]), 2) + hex(blue(selected.colors[1]), 2);
            colorTwo.value = "#" + hex(red(selected.colors[2]), 2) + hex(green(selected.colors[2]), 2) + hex(blue(selected.colors[2]), 2);
            transX.value = selected.trans[0][0];
            transY.value = selected.trans[0][1];
            scaleX.value = selected.trans[1][0];
            scaleY.value = selected.trans[1][1];
            rot.value = selected.trans[2];
        }
        redraw();
    }
}

function mouseMoved() {
    if (mouseX > 0 && mouseX < 400 && mouseY > 0 && mouseY < 600) {
        hover = layers.clicked();
        if (hover) {
            hover.hover = true;
        }
        redraw();
    } else {
        hover = 0;
    }
}

function lineColorUpdate() {
    if (selected) {
        selected.colors[0] = lineColor.value;
        redraw();
    }
}

function colorOneUpdate() {
    if (selected) {
        selected.colors[1] = colorOne.value;
        redraw();
    }
}

function colorTwoUpdate() {
    if (selected) {
        selected.colors[2] = colorTwo.value;
        redraw();
    }
}

function translateUpdate() {
    if (selected) {
        selected.trans[0] = [parseInt(transX.value), parseInt(transY.value)];
        redraw();
    }
}

function scaleUpdate() {
    if (selected) {
        selected.trans[1] = [scaleX.value, scaleY.value];
        redraw();
    }
}

function rotateUpdate() {
    if (selected) {
        selected.trans[2] = parseFloat(rot.value);
        redraw();
    }
}

function layerUp() {
    if (selected) {
        layers.moveUp(selected.layer);
        redraw();
    }
}

function layerDown() {
    if (selected) {
        layers.moveDown(selected.layer);
        redraw();
    }
}

function topLayer() {
    if (selected) {
        layers.moveTop(selected.layer);
        redraw();
    }
}

function bottomLayer() {
    if (selected) {
        layers.moveBottom(selected.layer);
        redraw();
    }
}