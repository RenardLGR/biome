import Biome from './Biome.js'
import { COLS, ROWS, CELL_SIZE, period } from './constants.js';

const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

let biome = new Biome(context)
let isPaused = false
let requestId
let time

play()

//TODO
//life cycle as follow : grass, small tree, medium tree, grown tree (different shades and shapes if possible), fire, charcoal, ash, grass, repeat
//large area of water, surrounded by sand using chebychev distance

//seasons cycle
//day/night cycle
//wildlife : prey/predator interaction

function play() { //called on start button in html
    if(isPaused){ //unpause if it was paused
        isPaused = !isPaused
    }
    time = { start: 0, elapsed: 0}
    time.start = performance.now() //reset time
    if (requestId) { //cancel animation from the old game
        cancelAnimationFrame(requestId)
    }

    animate()
}

function animate(now = 0) {
    time.elapsed = now - time.start
    if(time.elapsed > period && !isPaused){
        time.start = now
        biome.regenerate()
        // biome.move() //TODO
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        biome.draw() //TODO
    }

    // context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    // biome.draw() //TODO

    //redraw the canvas
    // if(moves >= skipRedraw){
    //     moves = 0
    //     context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    //     biome.drawBoard() //TODO
    // }

    requestId = requestAnimationFrame(animate) //not sure what it does but it make the animation work
}