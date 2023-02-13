let Layers = function(items) {
    this.items = items;
};

Layers.prototype.draw = function() {
    for (var i = 0; i < this.items.length; i ++) {
        this.items[i].draw();
    }
};

Layers.prototype.clicked = function() {
    let temp = 0;
    for (var i = 0; i < this.items.length; i ++) {
        if (this.items[i].clicked()) {
            temp = this.items[i];
        }
    }
    return temp;
};

Layers.prototype.add = function(item) {
    this.items.push(item);
    this.updateItem(this.items.length-1);
};

Layers.prototype.remove = function(layer) {
    this.items.splice(layer, 1);
    this.updateAll();
};

Layers.prototype.moveDown = function(layer) {
    if (layer < this.items.length && layer !== 0) {
        this.items.splice(layer-1, 0, this.items.splice(layer, 1)[0]);
        this.updateItem(layer);
        this.updateItem(layer-1);
    }
};

Layers.prototype.moveUp = function(layer) {
    this.moveDown(layer+1);
};

Layers.prototype.moveTop = function(layer) {
    this.add(this.items.splice(layer, 1)[0]);
    this.updateAll();
};

Layers.prototype.moveBottom = function(layer) {
    this.items.splice(0, 0, this.items.splice(layer, 1)[0]);
    this.updateAll();
};

Layers.prototype.moveTo = function(layer, destination) {
    this.items.splice(destination, 0, this.items.splice(layer, 1)[0]);
    this.updateAll();
};

Layers.prototype.updateItem = function(layer) {
    this.items[layer].layer = layer;
};

Layers.prototype.updateAll = function() {
    for (let i = 0; i < this.items.length; i ++) {
        this.updateItem(i);
    }
};