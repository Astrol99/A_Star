/// <reference path="./p5.global-mode.d.ts" />

// Radius of circles on grid
const size = 10;

let startNode;
let endNode;
let grid = [];

function generateGrid() {
    for (let x = size; x < width; x += size*2) {
        let col = [];

        for (let y = size; y < height; y += size*2) {
            let chance = Math.random();
            let node;
            
            // Starting node at (0,0)
            if (x === size && y === size) {
                startNode = new Node(x, y, size, "lime", "start");
                startNode.render();
                continue;
            // Ending note at (width, height)
            } else if (x === width - size && y === height - size) {
                endNode = new Node(x, y, size, "red", "end");
                endNode.render();
                continue;
            }

            // 80% chance of free node
            if (chance < 0.8) {
                node = new Node(x, y, size, "black", "free");
            // 20% chance of obstacle node
            } else if (chance > 0.8) {
                node = new Node(x, y, size, "white", "obstacle");
                node.render();
            }

            col.push(node);
        }

        grid.push(col)
    }
}

function setup() {
    createCanvas(800, 1100);
    background(0, 0, 0);
    generateGrid();
}

function draw() {

}