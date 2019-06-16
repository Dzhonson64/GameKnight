export default class Images{
    constructor(startX, startY, url){
        this.image = new Image();
        this.image.src = url;
        this.startСoordinate = {
            x: startX,
            y: startY,
        }
        this.cols;
        this.rows;
        this.frameX = 0;
        this.frameY = 0;
        this.width = 0;
        this.height = 0;
        this.blocks = new Array();
    }
}