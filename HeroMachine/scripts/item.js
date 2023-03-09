let Item = function(path, trans, orgin, layer, colors, childs, hover, catItem) {
    this.path = path;
    this.lines = loadImage(this.path + "/lines.png");
    this.layer1 = loadImage(this.path + "/layer1.png");
    this.layer2 = loadImage(this.path + "/layer2.png");
    this.trans = trans;
    this.orgin = orgin;
    this.parentTrans = [[0, 0], [1, 1], 0];
    this.layer = layer;
    this.colors = colors;
    this.childs = childs;
    this.hover = hover;
    this.catItem = catItem;
};

Item.prototype.draw = function() {
    push();
        this.transform();
        
        if (!this.hover) {
            tint(this.colors[1]);
            image(this.layer1, 0, 0);
            tint(this.colors[2]);
            image(this.layer2, 0, 0);
            tint(this.colors[0]);
            image(this.lines, 0, 0);
        } else {
            tint(red(this.colors[1]), green(this.colors[1]), blue(this.colors[1]), 128);
            image(this.layer1, 0, 0);
            tint(red(this.colors[2]), green(this.colors[2]), blue(this.colors[2]), 128);
            image(this.layer2, 0, 0);
            tint(red(this.colors[0]), green(this.colors[0]), blue(this.colors[0]), 128);
            image(this.lines, 0, 0);
            this.hover = false;
        }
    pop();
    this.passTransform([[0,0],[1,1],0]);
};

Item.prototype.passTransform = function(parentTrans) {
    this.parentTrans = parentTrans;
    let passTrans = [[0, 0],[1, 1],0];
    
    passTrans[0][0] = this.trans[0][0] + this.parentTrans[0][0];
    passTrans[0][1] = this.trans[0][1] + this.parentTrans[0][1];
    passTrans[1][0] = this.trans[1][0] * this.parentTrans[1][0];
    passTrans[1][1] = this.trans[1][1] * this.parentTrans[1][1];
    passTrans[2] = this.trans[2] + this.parentTrans[2];
    
    for (let i = 0; i < this.childs.length; i ++) {
        this.childs[i].passTransform(passTrans);
    }
};

Item.prototype.clicked = function() {
    clear();
    push();
        this.transform();
        image(this.layer1, 0, 0);
        loadPixels();
    pop();
    let selPix = pixels[(mouseY*400 + mouseX)*4];
    if (selPix) {
        return true;
    }
};

Item.prototype.transform = function() {
    let hyp = createVector(this.orgin[1][0], this.orgin[1][1]);
    let angle = this.trans[2] + this.parentTrans[2];
    let newHyp = hyp.copy();
    newHyp.setHeading(hyp.heading() + angle);
    let rotX = hyp.x -newHyp.x;
    let rotY = hyp.y -newHyp.y;
    
    let factor = [this.trans[1][0] * this.parentTrans[1][1], this.trans[1][1] * this.parentTrans[1][1]];
    let scaleX = hyp.x - (hyp.x*factor[0]);
    let scaleY = hyp.y - (hyp.y*factor[1]);
    
    translate(rotX + 200 + this.trans[0][0] + this.parentTrans[0][1] + this.orgin[0][0], rotY + 300 + this.trans[0][1] + this.parentTrans[0][1] + this.orgin[0][1]);
    rotate(angle);
    translate(scaleX, scaleY);
    scale(factor);
};