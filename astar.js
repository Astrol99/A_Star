/// <reference path="./p5.global-mode.d.ts" />

// Radius of circles on grid
const size = 10;

let grid = [];

function setup() {
    createCanvas(800, 600);
    background(0, 0, 0);

    for (let x = size; x < width; x += size*2) {
        for (let y = size; y < height; y += size*2) {
            let chance = Math.random();
            let node;
            
            // Starting node at (0,0)
            if (x == size && y == size) {
                node = new Node(x, y, size, "lime", "start");
                node.render();
                continue;
            // Ending note at (width, height)
            } else if (x == width - size && y == height - size) {
                node = new Node(x, y, size, "red", "end");
                node.render();
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
            
            grid.push(node);
        }
    }
}

function draw() {

}