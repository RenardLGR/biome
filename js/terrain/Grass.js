
import { COLS, ROWS, CELL_SIZE, period } from '../constants.js';

export default class Grass{
    constructor(context){
        this.context = context
        this.id = "grass"
        this.color = "#e9f0c7"
        this.color2 = "red"
        this.twitch = false
        this.x = 0
        this.y = 0
    }


    draw(){
        if(this.twitch){
            this.context.fillStyle = this.color
            this.context.fillRect(this.x, this.y, CELL_SIZE, CELL_SIZE)
        }else{
            this.context.fillStyle = this.color2
            this.context.fillRect(this.x, this.y, CELL_SIZE, CELL_SIZE)
        }
        this.twitch = !this.twitch
    }
}