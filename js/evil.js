import Images from './images.js';

import * as modules from "./modules.js";
export default class Evil{
    constructor(startX, startY){
        this.evilImg = new Images(startX, startY, "../img/evil.png");
        this.width = 32;
        this.height = 48;
        this.dx = 1.5;
        this.dy = 1.5;
        this.borderMove = 100;
        this.borderMoveR = this.evilImg.startСoordinate.x + this.borderMove;
        this.borderMoveL = this.evilImg.startСoordinate.x - this.borderMove;
        this.borderMoveU = this.evilImg.startСoordinate.y - this.borderMove;
        this.borderMoveD = this.evilImg.startСoordinate.y + this.borderMove;
        this.orientation = "down";
        this.evilImg.frameY = 0;
        this.isAlive;
        this.hp = 200;
        this.force = 20;
        this.startKick;
    }
    moveEvil(){
        switch (this.orientation) {
            case "left":{
                if (
                        this.evilImg.startСoordinate.x <= 0 ||
                        this.evilImg.startСoordinate.x <= this.borderMoveL                        
                ){
                    this.changeOrienation();
                }else if (
                    /* Если враг был правее в выше игрока */
                    (this.evilImg.startСoordinate.x - (modules.hero.heroImg.startСoordinate.x + modules.hero.heroImg.width)  <= 0 &&
                    this.evilImg.startСoordinate.x - (modules.hero.heroImg.startСoordinate.x + modules.hero.heroImg.width)  >= -this.width &&
                    modules.hero.heroImg.startСoordinate.y >= this.evilImg.startСoordinate.y &&
                    modules.hero.heroImg.startСoordinate.y <= this.evilImg.startСoordinate.y + this.height) ||
                    /* Если враг был правее в ниже игрока */
                    (this.evilImg.startСoordinate.x - (modules.hero.heroImg.startСoordinate.x + modules.hero.heroImg.width)  <= 0 &&
                    this.evilImg.startСoordinate.x - (modules.hero.heroImg.startСoordinate.x + modules.hero.heroImg.width)  >= -this.width &&
                    modules.hero.heroImg.startСoordinate.y + modules.hero.heroImg.height >= this.evilImg.startСoordinate.y &&
                    modules.hero.heroImg.startСoordinate.y + modules.hero.heroImg.height <=  this.evilImg.startСoordinate.y + this.height) ||
                    /* Если враг был на уровне игрока */
                    (this.evilImg.startСoordinate.x - (modules.hero.heroImg.startСoordinate.x + modules.hero.heroImg.width)  <= 0 &&
                    this.evilImg.startСoordinate.x - (modules.hero.heroImg.startСoordinate.x + modules.hero.heroImg.width)  >= -this.width &&
                    modules.hero.heroImg.startСoordinate.y + modules.hero.heroImg.height >= this.evilImg.startСoordinate.y + this.height &&
                    modules.hero.heroImg.startСoordinate.y <=  this.evilImg.startСoordinate.y)
                ){
                    modules.hero.hp -= this.force;
                    
                    if (modules.hero.hp <= 0){
                        modules.render.result = "You loose";
                        modules.render.stopGame = true;
                        
                    }
                    this.evilImg.startСoordinate.x = this.evilImg.startСoordinate.x;
                    
                    this.orientation = "right";
                    this.evilImg.frameY = 2;
                    this.evilImg.startСoordinate.x = modules.hero.heroImg.startСoordinate.x + modules.hero.heroImg.width;
                }
                if (this.evilImg.startСoordinate.x > 0){
                    clearInterval(this.startKick);
                    this.evilImg.startСoordinate.x -= this.dx;
                }
                break;
            }
            case "right":{
                if (
                        this.evilImg.startСoordinate.x >= modules.game.width - this.width ||
                        this.evilImg.startСoordinate.x >= this.borderMoveR
                       
                ){
                    this.changeOrienation();
                }else if ( 
                    /* Если враг был левее в выше игрока */
                    (this.evilImg.startСoordinate.x + this.width - modules.hero.heroImg.startСoordinate.x  >= 0 &&
                    this.evilImg.startСoordinate.x + this.width - modules.hero.heroImg.startСoordinate.x <= this.width &&
                    modules.hero.heroImg.startСoordinate.y >= this.evilImg.startСoordinate.y &&
                    modules.hero.heroImg.startСoordinate.y <= this.evilImg.startСoordinate.y + this.height) ||
                    /* Если враг был левее в ниже игрока */
                    (this.evilImg.startСoordinate.x + this.width - modules.hero.heroImg.startСoordinate.x  >= 0 &&
                    this.evilImg.startСoordinate.x + this.width - modules.hero.heroImg.startСoordinate.x <= this.width &&
                    modules.hero.heroImg.startСoordinate.y + modules.hero.heroImg.height >= this.evilImg.startСoordinate.y &&
                    modules.hero.heroImg.startСoordinate.y + modules.hero.heroImg.height <=  this.evilImg.startСoordinate.y + this.height) ||
                     /* Если враг был на уровне игрока */
                    (this.evilImg.startСoordinate.x + this.width - modules.hero.heroImg.startСoordinate.x  >= 0 &&
                    this.evilImg.startСoordinate.x + this.width - modules.hero.heroImg.startСoordinate.x <= this.width &&
                    modules.hero.heroImg.startСoordinate.y + modules.hero.heroImg.height >= this.evilImg.startСoordinate.y + this.height &&
                    modules.hero.heroImg.startСoordinate.y <=  this.evilImg.startСoordinate.y)
                ){
                    modules.hero.hp -= this.force;
                    
                    if (modules.hero.hp <= 0){
                        modules.render.result = "You loose";
                        modules.render.stopGame = true;
                        
                    }
                    this.orientation = "left";
                    this.evilImg.frameY = 1;
                    this.evilImg.startСoordinate.x = modules.hero.heroImg.startСoordinate.x - this.width;
                    
                }
                if (this.evilImg.startСoordinate.x < modules.game.width - this.width)
                {
                    this.evilImg.startСoordinate.x +=  this.dx;
                    clearInterval(this.startKick);
                }
               
                break;
            }
            case "up":{
                if (
                        this.evilImg.startСoordinate.y <= 0 ||
                        this.evilImg.startСoordinate.y <= this.borderMoveU
                        
                ){
                    this.changeOrienation();
                }else if ( 
                    /* Если враг был ниже и левее игрока */
                    (this.evilImg.startСoordinate.y - (modules.hero.heroImg.startСoordinate.y + modules.hero.heroImg.height)  <= 0 &&
                    this.evilImg.startСoordinate.y - (modules.hero.heroImg.startСoordinate.y + modules.hero.heroImg.height)  >= -this.height &&
                    modules.hero.heroImg.startСoordinate.x >= this.evilImg.startСoordinate.x &&
                    modules.hero.heroImg.startСoordinate.x <= this.evilImg.startСoordinate.x + this.width) ||
                    /* Если враг был левее в ниже игрока */
                    (this.evilImg.startСoordinate.y - (modules.hero.heroImg.startСoordinate.y + modules.hero.heroImg.height)  <= 0 &&
                    this.evilImg.startСoordinate.y - (modules.hero.heroImg.startСoordinate.y + modules.hero.heroImg.height)  >= -this.height &&
                    modules.hero.heroImg.startСoordinate.x + modules.hero.heroImg.width >= this.evilImg.startСoordinate.x &&
                    modules.hero.heroImg.startСoordinate.x  + modules.hero.heroImg.width<= this.evilImg.startСoordinate.x + this.width) ||
                    /* Если враг был на уровне игрока */
                    (this.evilImg.startСoordinate.y - (modules.hero.heroImg.startСoordinate.y + modules.hero.heroImg.height)  <= 0 &&
                    this.evilImg.startСoordinate.y - (modules.hero.heroImg.startСoordinate.y + modules.hero.heroImg.height)  >= -this.height &&
                    modules.hero.heroImg.startСoordinate.x + modules.hero.heroImg.width >= this.evilImg.startСoordinate.x + this.width &&
                    modules.hero.heroImg.startСoordinate.x <=  this.evilImg.startСoordinate.x)
                ){
                    modules.hero.hp -= this.force;
                    
                    if (modules.hero.hp <= 0){
                        modules.render.result = "You loose";
                        modules.render.stopGame = true;
                        
                    }
                    this.orientation = "down";
                    this.evilImg.frameY = 0;
                    this.evilImg.startСoordinate.y = modules.hero.heroImg.startСoordinate.y + modules.hero.heroImg.height;
                }
                if (this.evilImg.startСoordinate.y > 0){
                    this.evilImg.startСoordinate.y -=  this.dy;
                }
                
                break;
            }
            case "down":{
                if (
                        this.evilImg.startСoordinate.y >= modules.game.height - this.height ||
                        this.evilImg.startСoordinate.y >= this.borderMoveD
                ){
                    this.changeOrienation();
                }else if ( 
                    /* Если враг был выше и левее игрока */
                    (this.evilImg.startСoordinate.y + this.height - modules.hero.heroImg.startСoordinate.y >= 0 &&
                    this.evilImg.startСoordinate.y + this.height - modules.hero.heroImg.startСoordinate.y  <= this.height &&
                    modules.hero.heroImg.startСoordinate.x >= this.evilImg.startСoordinate.x &&
                    modules.hero.heroImg.startСoordinate.x <= this.evilImg.startСoordinate.x + this.width) ||
                    /* Если враг был выше в ниже игрока */
                    (this.evilImg.startСoordinate.y + this.height - modules.hero.heroImg.startСoordinate.y >= 0 &&
                    this.evilImg.startСoordinate.y + this.height - modules.hero.heroImg.startСoordinate.y  <= this.height &&
                    modules.hero.heroImg.startСoordinate.x + modules.hero.heroImg.width >= this.evilImg.startСoordinate.x &&
                    modules.hero.heroImg.startСoordinate.x  + modules.hero.heroImg.width<= this.evilImg.startСoordinate.x + this.width) ||
                    /* Если враг был на уровне игрока */
                    (this.evilImg.startСoordinate.y + this.height - modules.hero.heroImg.startСoordinate.y >= 0 &&
                    this.evilImg.startСoordinate.y + this.height - modules.hero.heroImg.startСoordinate.y  <= this.height &&
                    modules.hero.heroImg.startСoordinate.x + modules.hero.heroImg.width >= this.evilImg.startСoordinate.x + this.width &&
                    modules.hero.heroImg.startСoordinate.x <=  this.evilImg.startСoordinate.x)
                ){
                    modules.hero.hp -= this.force;
                    if (modules.hero.hp <= 0){
                        modules.render.result = "You loose";
                        modules.render.stopGame = true;
                        
                    }
                    this.orientation = "up";
                    this.evilImg.frameY = 3;
                    this.evilImg.startСoordinate.y = modules.hero.heroImg.startСoordinate.y - this.height;
                }
                if (this.evilImg.startСoordinate.y < modules.game.height - this.height)
                {
                    this.evilImg.startСoordinate.y +=  this.dy;
                    clearInterval(this.startKick);
                }
                break;
            }
            default:
                break;
        }
        
    }
    moving(){
        var intervalAnim = setInterval(function() {  //запускаем интервал                    
            if (this.width * (this.evilImg.frameX+1) < this.evilImg.image.width) { //для смены позиции изображения
                this.evilImg.frameX += 1; // если дошли до конца спрайта
            } else {
                this.evilImg.frameX = 0; // то возвращаемся к началу
            }
        }.bind(this), 1000/24) //меняем позиционирование спрайта
    }
    changeOrienation(){
        var selected = this.selectOrienation();
        if (selected == 0){
            this.orientation = "up";
            this.evilImg.frameY = 3;
        }
        if (selected == 1){
            this.orientation = "right";
            this.evilImg.frameY = 2;
        }
        if (selected == 2){
            this.orientation = "down";
            this.evilImg.frameY = 0;
        }
        if (selected == 3){
            this.orientation = "left";
            this.evilImg.frameY = 1;
        }
    }
    selectOrienation(){
        return modules.getRandom(0, 4);
    }
    
    health(){
        var widthBorder = 45;
        var heightBorder = 10;
        var xBorder = this.evilImg.startСoordinate.x-7;
        var yBorder = this.evilImg.startСoordinate.y-15;
        var widthHP = widthBorder - 1;
        var heightHP = heightBorder - 1;
        var xHP = xBorder + 0.5;
        var yHP = yBorder + 0.5;
        var xTextHP = xBorder + widthBorder / 8;
        var yTextHP = yBorder + heightBorder - 2;
        
        modules.game.ctx.strokeStyle = "red"; 
        modules.game.ctx.strokeRect(xBorder, yBorder, widthBorder, heightBorder);
        modules.game.ctx.fillStyle = "red"; 
        
        modules.game.ctx.fillRect(xHP, yHP, widthHP, heightHP);
        modules.game.ctx.fillStyle = "white"; 
        modules.game.ctx.font = 'bold 10px sans-serif';
        modules.game.ctx.fillText(this.hp + " HP", xTextHP, yTextHP);

    }
    kick(){
        
    }
}