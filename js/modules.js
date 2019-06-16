import Game from "./game.js";
import Hero from "./hero.js";
import Move from "./actions.js";
import MagicBall from "./magicBall.js";
import Render from "./render.js";




export let game = new Game();
export let hero = new Hero(); 
export let actions = new Move();
export let magicBall = new MagicBall();
export let render = new Render();

window.addEventListener("load", function(){
    var startScreen = document.getElementById("startSreen");
    var playBtn =  document.getElementById("start");
    playBtn.addEventListener("click", function(){
        startScreen.style.display = "none";
        document.body.style.cursor = "none";
        document.body.style.overflow = "scroll";
        render.start();
        localStorage.setItem('score', 0);
    });
});
export function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}