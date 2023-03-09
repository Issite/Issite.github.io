let layers;
let options;
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
let catalogue;
let topCatVal;
let botCatVal;

function preload() {
    catalogue = loadJSON("images/catalogue.json");
}

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
    options = [];
    for (let i = 0; i < 16; i ++) {
        options[i] = new Option(i, false);
    }
    
    imageMode(CENTER);
    angleMode(DEGREES);
    noLoop();
    itemSelectUpdate(true);
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

{
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
}

function itemSelectUpdate(start) {
    let topCat = document.getElementById("topCat");
    let botCat = document.getElementById("botCat");
    if (start) {
        topCatVal = topCat.value;
    }
    if (topCat.value !== topCatVal) {
        topCatVal = topCat.value;
        for (let i = 0; i <= botCat.length; i ++) {
            botCat.remove(0);
        }
        for (let i = 0; i < catalogue["categories"][topCatVal].length; i ++) {
            let option = document.createElement("option");
            option.value = catalogue["categories"][topCatVal][i];
            option.text = catalogue["categories"][topCatVal][i];
            botCat.add(option);
        }
    }
    botCatVal = botCat.value;
    let path = "images/" + topCatVal + "/" + botCatVal + "/";
    for (let i = 0; i < min(16, catalogue["items"][topCatVal][botCatVal].length); i ++) {
        let itemPath = path + catalogue["items"][topCatVal][botCatVal][i].name;
        options[i].change(itemPath, catalogue["items"][topCatVal][botCatVal][i]);
    }
}

function addItem(path, id) {
    let truePath = path + "/..";
    let newItem = new Item(truePath, [[0, 0], [1, 1], 0], options[id].item.orgin, 0,
                           [color(0, 0, 0), color(255, 255, 255), color(127, 127, 127)],
                           [], false, options[id].item);
    selected = newItem;
    lineColor.value = "#" + hex(red(selected.colors[0]), 2) + hex(green(selected.colors[0]), 2) + hex(blue(selected.colors[0]), 2);
    colorOne.value = "#" + hex(red(selected.colors[1]), 2) + hex(green(selected.colors[1]), 2) + hex(blue(selected.colors[1]), 2);
    colorTwo.value = "#" + hex(red(selected.colors[2]), 2) + hex(green(selected.colors[2]), 2) + hex(blue(selected.colors[2]), 2);
    transX.value = selected.trans[0][0];
    transY.value = selected.trans[0][1];
    scaleX.value = selected.trans[1][0];
    scaleY.value = selected.trans[1][1];
    rot.value = selected.trans[2];
    
    layers.add(newItem);
    options[id].use();
    redraw();
}

function unAddItem() {
    if (selected) {
        for (var i = 0; i < options.length; i ++) {
            if (options[i].item === selected.catItem) {
                options[i].unUse();
            } else {
                selected.catItem.used --;
            }
        }
        layers.remove(selected.layer);
        redraw();
    }
}