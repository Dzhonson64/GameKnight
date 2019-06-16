export default class Game{
    constructor(){
        this.canvasField = document.getElementById("field");
        this.ctx = this.canvasField.getContext("2d");
        this.width = 1000;
        this.height = 720;
        this.canvasField.setAttribute("width", this.width + "px");
        this.canvasField.setAttribute("height", this.height + "px");
        this.fpsBlock = document.getElementById("fps");
    }
}
