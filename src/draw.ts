//import typescirpt types.
///<reference path='../p5-global-mode.d.ts'/>

//import grid
import Grid from './grid';

//extend existing window property, we have to put the draw and setup functinos of the global window object for p5 to work in global mode
declare global {
    interface Window {
        setup: any;
        draw: any;
        mousePressed: any;
        mouseReleased: any;
        preload: any;
        mouseClicked: any;
        started: boolean;
    }
}

let grid: Grid;
let size = 800;
let resolution = 10;
let started = false;

let setup = function() {
    createCanvas(size, size);
    grid = new Grid(size, size, resolution);
}

let draw = function() {
    grid.draw();
}

window.setup = setup;
window.draw = draw;
window.started = started;
