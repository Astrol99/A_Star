/// <reference path="./p5.global-mode.d.ts" />

const size = 5;

let nodes = [];

function setup() {
    createCanvas(800, 600);
    background(0, 0, 0);

    for (let x = size; x < width; x += size*2) {
        for (let y = size; y < height; y += size*2) {
            let node = new Node(x, y, size, "gray", "open");
            node.render();
            nodes.push(node);
        }
    }
}

function draw() {

}