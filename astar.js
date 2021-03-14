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

            // 80% chance of free node
            if (chance < 0.9)
                node = new Node(x, y, size, "free");
            // 20% chance of obstacle node
            else
                node = new Node(x, y, size, "obstacle");
            
                node.render();
            col.push(node);
        }

        grid.push(col)
    }

    console.log("Generated Grid");
}

function A_Star() {
    console.log("A*");
}

function setup() {
    createCanvas(800, 1100);
    background(0, 0, 0);
    generateGrid();

    // Set initial nodes
    startNode = grid[0][0];
    startNode.state = "start";
    startNode.render();

    endNode = grid[39][54];
    endNode.state = "end";
    endNode.render();
}

function draw() {

}