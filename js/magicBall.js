import Images from './images.js';
import * as modules from "./modules.js";
export default class MagicBall{
    constructor(){
        this.ballImg = new Images(modules.hero.heroImg.startСoordinate.x, modules.hero.heroImg.startСoordinate.x, "../img/knife.png");
        this.width = 64;
        this.height = 64;
        this.dx = 5;
        this.dy = 5;
        this.orientation;
        this.isAlive = false;
        this.force = 20;
        this.distance = 100;
        this.borderDistance;
    }
    
}