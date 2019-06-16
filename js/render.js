import Images from "./images.js";
import * as modules from "./modules.js";
import Evil from './evil.js'

let background = new Images(0, 0, "../img/forest.jpg");


export default class Render{
    constructor(){
        this.evils = [];
        this.evils.push(new Evil(200, 300));
        /*this.evils.push(new Evil(300, 400));
        this.evils.push(new Evil(400, 34));*/
        this.nowTime = performance.now();
        this.nextTime;
        this.flagFPS = true;
        this.stopGame = false;
        this.result;
    }
    
    drawImages(){
        modules.game.ctx.clearRect(
            0,
            0,
            modules.game.width,
            modules.game.heigh
        );

        modules.game.ctx.drawImage(
            background.image,
            background.startСoordinate.x,
            background.startСoordinate.y
        );
        modules.game.ctx.drawImage(
            modules.hero.heroImg.image,
            modules.hero.heroImg.width * modules.hero.heroImg.frameX,
            modules.hero.heroImg.height * modules.hero.heroImg.frameY,
            modules.hero.heroImg.width,
            modules.hero.heroImg.height,
            modules.hero.heroImg.startСoordinate.x,
            modules.hero.heroImg.startСoordinate.y,
            modules.hero.heroImg.width,
            modules.hero.heroImg.height
        );
        
        modules.hero.clothes.forEach( (elem) => {
            
            modules.game.ctx.drawImage(
                elem.image,
                elem.width * elem.frameX,
                elem.height * elem.frameY,
                elem.width,
                elem.height,
                modules.hero.heroImg.startСoordinate.x,
                modules.hero.heroImg.startСoordinate.y-9,
                elem.width,
                elem.height
            );
        });
        this.evils.forEach( (elem) => {
            modules.game.ctx.drawImage(
                elem.evilImg.image,
                elem.width * elem.evilImg.frameX,
                elem.height * elem.evilImg.frameY,
                elem.width,
                elem.height,
                elem.evilImg.startСoordinate.x,
                elem.evilImg.startСoordinate.y,
                elem.width,
                elem.height
            );  
        });
        modules.hero.magicBalls.forEach( (elem) => {
            //if (elem.isAlive){
                modules.game.ctx.drawImage(
                    elem.ballImg.image,
                    elem.width * elem.ballImg.frameX,
                    elem.height * elem.ballImg.frameY,
                    elem.width,
                    elem.height,
                    elem.ballImg.startСoordinate.x,
                    elem.ballImg.startСoordinate.y,
                    elem.width,
                    elem.height
                );
            
        });
       
        //game.ctx.clearRect(hero.startСoordinate.x, hero.startСoordinate.y, hero.width, hero.height);
    }
    start(){        
        this.run();
        modules.hero.wear();
        this.runEvil();
        
        /*for (var i = 0; i < this.evils.length; i++){
            this.evils[i].moving()
        }*/
    }
    run(){
        if (!this.stopGame){
            window.requestAnimationFrame(() =>{
                this.drawImages();
                modules.hero.moveBall();
                modules.hero.health();
            
                modules.hero.moveHero();
                this.fps();
                for (var i = 0; i < this.evils.length; i++){
                    this.evils[i].moveEvil();
                    this.evils[i].health();
                    this.evils[i].moving();
                    for(var j = 0; j < modules.hero.magicBalls.length; j++){
                        var ball = modules.hero.magicBalls[j];
                            if (
                                
                                Math.abs(this.evils[i].evilImg.startСoordinate.x + this.evils[i].width/2 - ball.ballImg.startСoordinate.x - ball.width/2) < this.evils[i].width /2 &&  
                                Math.abs(this.evils[i].evilImg.startСoordinate.y - ball.ballImg.startСoordinate.y) < this.evils[i].height / 2
                            )
                        {
                            
                            if(this.evils[i].hp - modules.magicBall.force <= 0){
                                this.evils[i].isAlive = false;
                            }
                            this.evils[i].hp -= modules.magicBall.force;
                            modules.hero.magicBalls.splice(j, 1);
                            break;
                        }
                    }
                    if(this.evils[i].isAlive == false){
                        modules.render.changeScore();
                        this.evils.splice(i, 1);
                        if (this.evils.length == 0){
                            this.stopGame = true;
                            this.result = "You win!!!";
                        }
                    }
                }
                this.run();
            }, this);
        }else{
            this.endGame(this.result);
        }
    }
    runEvil(){
        window.requestAnimationFrame(() =>{
            this.runEvil();
        }, this);
        
    }
    createEvil(){
        var x = modules.getRandom(0, modules.game.width);
        var y = modules.getRandom(0, modules.game.height);
        let newEvil = new Evil(x, y);
        this.evils.push(newEvil);
    };

    fps(){        
        var delta = (this.nowTime  - this.nextTime) / 1000;
        this.nextTime = this.nowTime;
        
        this.nowTime = performance.now();
        modules.game.fpsBlock.innerHTML = Math.round(1 / delta) + " fps";
    }
    changeScore(){
        var scoreBlock = document.getElementById("score");
        var scores =  Number(localStorage.getItem('score')) + modules.hero.incScore;
        localStorage.setItem('score', scores);
        scoreBlock.innerHTML = scores;
    }
    endGame(resultMatches){
        var startScreen = document.getElementById("startSreen");
        var play = document.getElementById("start");
        var end = document.getElementById("end");
        var resultScore = document.getElementById("result");
        var resultBlock = document.getElementById("resultBlock");
        var resultMatch = document.getElementById("resultMatch");
        document.body.style.overflow = "hidden";
        startScreen.style.display = "flex";
        startScreen.style.flexDirection = "column";
        document.body.style.cursor = "default";
        play.style.display = "none";
        end.style.display = "block";
        resultBlock.style.display = "block";
        resultMatch.style.display = "block";
        resultScore.innerHTML = localStorage.getItem('score');
        resultMatch.innerHTML = resultMatches;
    }
};





