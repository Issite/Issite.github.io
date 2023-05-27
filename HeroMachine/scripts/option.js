let Option = function (id) {
    this.id = id;
    this.used;
    this.item;
    this.type = ["null", "null"];
    
    let optionDiv = document.getElementById("optionDiv" + this.id%4);
    this.inp = createInput("value", "image");
    this.inp.parent(optionDiv);
    this.inp.elt.setAttribute("class", "option");
    this.inp.elt.setAttribute("onclick", "addItem(src, " + id + ")");
    this.inp.elt.setAttribute("object-fit", "contain");
    this.inp.elt.setAttribute("width", "50");
};

Option.prototype.change = function(path, item, type) {
    this.item = item;
    this.used = item.used;
    this.type = type;
    this.inp.elt.setAttribute("src", path + "/whole.png");
    if (this.used <= 0) {
        this.inp.elt.setAttribute("class", "option");
    } else {
        this.inp.elt.setAttribute("class", "selectedOption");
    }
};

Option.prototype.use = function() {
    if (document.getElementById("parity").value === "Singles") {
        console.log("clear");
        clearOptions(this.type);
    }
    this.used += 1;
    this.inp.elt.setAttribute("class", "selectedOption");
};

Option.prototype.unUse = function() {
    this.used -= 1;
    if (this.used <= 0) {
        this.inp.elt.setAttribute("class", "option");
    }
};
