import * as modules from "./modules.js";
import MagicBall from './magicBall.js';
export default class Move{
    constructor(){
        this.keysArray = [];
        this.flag = 0;
        document.onkeydown = (elem) => {
            if (elem.code == "KeyW"){
                this.keysArray[elem.code] =  true;
                modules.hero.heroImg.frameY = 0;
                modules.hero.clothes.forEach( (elem) => {
                    elem.frameY = 0;
                })
                modules.hero.armor.frameY = 0;
                modules.hero.armor.startСoordinate.x - 60,
                modules.hero.armor.startСoordinate.y-60,

                this.flag++;     
                this.moving();       
            }
            if (elem.code == "KeyS"){
                this.keysArray[elem.code] =  true;
                modules.hero.heroImg.frameY = 2;
                modules.hero.clothes.forEach( (elem) => {
                    elem.frameY = 2;
                }) 
                modules.hero.armor.frameY = 2;
                this.flag++; 
                this.moving();
            }
            if (elem.code == "KeyA"){
                this.keysArray[elem.code] =  true;
                modules.hero.heroImg.frameY = 1;
                modules.hero.clothes.forEach( (elem) => {
                    elem.frameY = 1;
                })
                modules.hero.armor.frameY = 1;
                this.flag++;
                this.moving();
            }
            if (elem.code == "KeyD"){
                this.keysArray[elem.code] =  true;
                modules.hero.heroImg.frameY = 3;
                modules.hero.clothes.forEach( (elem) => {
                    elem.frameY = 3;
                })
                modules.hero.armor.frameY = 3;
                this.flag++;
                this.moving();
            }
            
        }
        document.onkeyup = (elem) => {
            clearInterval(modules.hero.intervalAnim);
            this.flag = 0;
            if (elem.code == "KeyW"){
                this.keysArray[elem.code] =  false;                
            }
            if (elem.code == "KeyS"){
                this.keysArray[elem.code] =  false;
            }
            if (elem.code == "KeyA"){
                this.keysArray[elem.code] =  false;
            }
            if (elem.code == "KeyD"){
                this.keysArray[elem.code] =  false;
            }
            
        }
        document.onkeypress = (elem) => {
            if (elem.code == "Enter"){
                let newBall = new MagicBall();
                newBall.isAlive = true;
                modules.hero.magicBalls.push(newBall);
                
                
                
                
                if (modules.hero.heroImg.frameY == 2){ // вниз
                    newBall.orientation = "down";
                    newBall.ballImg.startСoordinate.y = modules.hero.heroImg.startСoordinate.y + modules.hero.heroImg.height / 2;
                    newBall.ballImg.startСoordinate.x = modules.hero.heroImg.startСoordinate.x;
                    newBall.ballImg.frameY = 0;
                    newBall.borderDistance =  newBall.ballImg.startСoordinate.y + newBall.distance;
                }
                if (modules.hero.heroImg.frameY == 1){ // влево
                    newBall.orientation = "left";
                    newBall.ballImg.startСoordinate.y = modules.hero.heroImg.startСoordinate.y;
                    newBall.ballImg.startСoordinate.x = modules.hero.heroImg.startСoordinate.x - modules.hero.heroImg.width / 2;
                    newBall.ballImg.frameY = 1;
                    newBall.borderDistance =  newBall.ballImg.startСoordinate.x - newBall.distance;
                }
                if (modules.hero.heroImg.frameY == 3){ // вправо
                    newBall.orientation = "right";
                    newBall.ballImg.startСoordinate.y = modules.hero.heroImg.startСoordinate.y;
                    newBall.ballImg.startСoordinate.x = modules.hero.heroImg.startСoordinate.x + modules.hero.heroImg.width / 2;
                    newBall.ballImg.frameY = 2;
                    newBall.borderDistance =  newBall.ballImg.startСoordinate.x + newBall.distance;
                }
                if (modules.hero.heroImg.frameY == 0){ // вверх
                    newBall.orientation = "up";
                    newBall.ballImg.startСoordinate.y = modules.hero.heroImg.startСoordinate.y - modules.hero.heroImg.height / 2;
                    newBall.ballImg.startСoordinate.x = modules.hero.heroImg.startСoordinate.x;
                    newBall.ballImg.frameY = 3;
                    newBall.borderDistance =  newBall.ballImg.startСoordinate.y - newBall.distance;
                }
            }
        }
    }
    isKeyCode(keyCode){
        if (this.keysArray[keyCode]){
            return true
        }
        return false;
    }
    moving(){
        if (this.flag < 2){
            modules.hero.intervalAnim = setInterval(function() {  //запускаем интервал                    
                if (modules.hero.heroImg.width * (modules.hero.heroImg.frameX+1) < modules.hero.heroImg.image.width) { //для смены позиции изображения
                    modules.hero.heroImg.frameX += 1; // если дошли до конца спрайта
                } else {
                    modules.hero.heroImg.frameX = 0; // то возвращаемся к началу
                }
                modules.hero.clothes.forEach( (elem) => {
                    
                    if (elem.width * (elem.frameX+1) < elem.image.width) { //для смены позиции изображения
                        elem.frameX += 1; // если дошли до конца спрайта
                    } else {
                        elem.frameX = 0; // то возвращаемся к началу
                    }
                }) 
            } , 1000/24) //меняем позиционирование спрайта
        }
    }
    

}

