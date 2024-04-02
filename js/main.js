import Biome from './Biome.js'
import { COLS, ROWS, CELL_SIZE, period } from './constants.js';

const pauseBtn = document.querySelector('.pause-btn')
pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused
    pauseBtn.innerText = isPaused ? "Play" : "Pause"
})

const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

//GRID Initialization
context.canvas.width = COLS * CELL_SIZE
context.canvas.height = ROWS * CELL_SIZE
// context.scale(CELL_SIZE, CELL_SIZE) //the scale of 1 will now be scaled to a block size

let biome = new Biome(context)
biome.draw()
let isPaused = true
let requestId
let time
play()

// DONE
//life cycle as follow : grass, small tree, medium tree, grown tree (different shades and shapes if possible), fire, charcoal, ash, grass, repeat
// TODO
//large area of water, surrounded by sand using chebychev distance

//seasons cycle
//day/night cycle
//wildlife : prey/predator interaction

function play() { //called on start button in html
    time = { start: 0, elapsed: 0}
    time.start = performance.now() //reset time
    // if (requestId) { //not sure what it does but it was here
    //     cancelAnimationFrame(requestId)
    // }

    animate()
}

function animate(now = 0) {
    time.elapsed = now - time.start
    if(time.elapsed > period && !isPaused){
        time.start = now
        biome.next()
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        biome.draw()
    }
    requestId = requestAnimationFrame(animate) //not sure what it does but it make the animation work
}