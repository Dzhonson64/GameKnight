import Images from './images.js';
import * as modules from "./modules.js";
export default class Hero{
    constructor(){
        this.heroImg = new Images(300, 300, "../img/hero_3/BODY_male.png");
        this.heroImg.width = 64;
        this.heroImg.height = 64;
        this.armor = new Images(300, 300, "../img/hero_3/WEAPON_dagger.png");
        this.armor.width = 180;
        this.armor.height = 180;
        this.dx = 2;
        this.dy = 2;
        this.intervalAnim;
        this.magicBalls = [];
        this.hp = 40;
        this.clothes = [];
        this.incScore = 100;
    }
    moveHero(){
        if (modules.actions.isKeyCode("KeyW")){
            if (this.heroImg.startСoordinate.y - this.dy > 0 && !this.colision()){
                this.heroImg.startСoordinate.y -= this.dy;
            }
        }
        if (modules.actions.isKeyCode("KeyA")){               
            if (this.heroImg.startСoordinate.x - this.dx > 0  && !this.colision()){
                this.heroImg.startСoordinate.x -= this.dx; 
            }        
        }
        if (modules.actions.isKeyCode("KeyS")){
            
            if (this.heroImg.startСoordinate.y + this.dy + this.heroImg.height < modules.game.height  && !this.colision()){
                this.heroImg.startСoordinate.y += this.dy;
            }
        }
        if (modules.actions.isKeyCode("KeyD")){
           
            if (this.heroImg.startСoordinate.x + this.dx + this.heroImg.width < modules.game.width  && !this.colision()){
                this.heroImg.startСoordinate.x += this.dx;
            }
        }
        for (let i in modules.render.evils){
            if( 
                this.heroImg.startСoordinate.x >= modules.render.evils[i].borderMoveL &&
                this.heroImg.startСoordinate.x <= modules.render.evils[i].borderMoveR &&
                this.heroImg.startСoordinate.y >= modules.render.evils[i].borderMoveU &&
                this.heroImg.startСoordinate.x <= modules.render.evils[i].borderMoveD
            )
            {
                //console.log("ATTACK");
            }
        }
    }
    moveBall(){
        
        for (var i = 0; i < this.magicBalls.length; i++){
            switch (this.magicBalls[i].orientation) {
                case "left":{
                    if (this.magicBalls[i].ballImg.startСoordinate.x < 0 || this.magicBalls[i].ballImg.startСoordinate.x <=  this.magicBalls[i].borderDistance){
                        this.magicBalls[i].isAlive = false;
                        this.magicBalls.splice(i, 1);
                    }
                    
                    if (this.magicBalls[i]){
                        this.magicBalls[i].ballImg.startСoordinate.x -=  this.magicBalls[i].dx;
                    }
                    break;
                }
                case "right":{
                    if (this.magicBalls[i].ballImg.startСoordinate.x > modules.game.width || this.magicBalls[i].ballImg.startСoordinate.x >=  this.magicBalls[i].borderDistance ){
                        this.magicBalls[i].isAlive = false;
                        this.magicBalls.splice(i, 1);
                    }
                    if (this.magicBalls[i]){
                        this.magicBalls[i].ballImg.startСoordinate.x +=  this.magicBalls[i].dx;
                        
                    }
                   
                    break;
                }
                case "up":{
                    if (this.magicBalls[i].ballImg.startСoordinate.y < 0 || this.magicBalls[i].ballImg.startСoordinate.y <=  this.magicBalls[i].borderDistance){
                        this.magicBalls[i].isAlive = false;
                        this.magicBalls.splice(i, 1);
                    }
                    if (this.magicBalls[i]){
                        this.magicBalls[i].ballImg.startСoordinate.y -=  this.magicBalls[i].dy;
                        
                    }
                    
                    break;
                }
                case "down":{
                    if (this.magicBalls[i].ballImg.startСoordinate.y > modules.game.height || this.magicBalls[i].ballImg.startСoordinate.y >=  this.magicBalls[i].borderDistance){
                        this.magicBalls[i].isAlive = false;
                        this.magicBalls.splice(i, 1);
                        
                    }
                    if (this.magicBalls[i]){
                        this.magicBalls[i].ballImg.startСoordinate.y +=  this.magicBalls[i].dy;
                    }
                    break;
                }
                default:
                    break;
            }
        }
    }
    health(){
        var widthBorder = 45;
        var heightBorder = 10;
        var xBorder = this.heroImg.startСoordinate.x + 10;
        var yBorder = this.heroImg.startСoordinate.y-12;
        var widthHP = widthBorder - 1;
        var heightHP = heightBorder - 1;
        var xHP = xBorder + 0.5;
        var yHP = yBorder + 0.5;
        var xTextHP = xBorder + widthBorder / 8;
        var yTextHP = yBorder + heightBorder - 1;
        
        modules.game.ctx.strokeStyle = "green"; 
        modules.game.ctx.strokeRect(xBorder, yBorder, widthBorder, heightBorder);
        modules.game.ctx.fillStyle = "green"; 
        modules.game.ctx.fillRect(xHP, yHP, widthHP, heightHP);
        modules.game.ctx.fillStyle = "white"; 
        modules.game.ctx.font = 'bold 10px sans-serif';
        modules.game.ctx.fillText(this.hp + " HP", xTextHP, yTextHP);
    }
    hit(ball){
        var x = ball.ballImg.startСoordinate.x + ball.dx;
        var y = ball.ballImg.startСoordinate.y + ball.dy;
        return false;
    }
    wear(){
        var legs = new Images(300, 300, "../img/hero_3/clothes/LEGS_plate_armor_pants.png");
        var tors = new Images(300, 300, "../img/hero_3/clothes/TORSO_chain_armor_torso.png");
        var hair = new Images(300, 300, "../img/hero_3/clothes/HEAD_hair_blonde.png");
        var shoes = new Images(300, 300, "../img/hero_3/clothes/FEET_shoes_brown.png");
        var hat = new Images(300, 300, "../img/hero_3/clothes/HEAD_chain_armor_helmet.png");
        

        this.clothes.push(legs);
        this.clothes.push(hair);
        this.clothes.push(tors);
        this.clothes.push(shoes);
        this.clothes.push(hat);
        for (var i in  this.clothes){
            this.clothes[i].width = 64;
            this.clothes[i].height = 64;
        }        
    }
    colision(){
        modules.render.evils.forEach( (elem) => {
           if (
               this.heroImg.startСoordinate.x > elem.evilImg.startСoordinate.x &&
               this.heroImg.startСoordinate.x < elem.evilImg.startСoordinate.x + elem.width &&
               this.heroImg.startСoordinate.y > elem.evilImg.startСoordinate.y &&
               this.heroImg.startСoordinate.y < elem.evilImg.startСoordinate.y + elem.height
               ){
                return true;
           }
        });
        return false;
    }
}