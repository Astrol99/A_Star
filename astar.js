/// <reference path="./p5.global-mode.d.ts" />

// Radius of circles on grid
const size = 10;

let grid = [];

let startNode;
let endNode;

let openSet = [];
let closedSet = [];

function generateGrid() {
    for (let x = size; x < width; x += size*2) {
        let col = [];

        for (let y = size; y < height; y += size*2) {
            let chance = Math.random();
            let node;

            
            // 80% chance of free node
            if (chance < 0.7)
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

function findArrayPos(node) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === node) {
                node.arrayPos = [i,j];
            }
        }
    }
}

function setup() {
    createCanvas(800, 1100);
    background(0, 0, 0);
    generateGrid();

    // Set initial nodes
    startNode = grid[0][0];
    startNode.state = "start";
    startNode.render();

    endNode = grid[grid.length-1][grid[0].length-1];
    endNode.state = "end";
    endNode.render();

    findArrayPos(endNode);

    openSet.push(startNode);

    console.log("A*");
}

function draw() {
    // Main A* loop
    if (openSet.length > 0) {
        // Get node with lowest f value
        let currentNode = openSet[0];
        let currentIndex = 0;
        for (const [index, openNode] of openSet.entries()) {
            if (openNode.f < currentNode.f) {
                currentNode = openNode;
                currentIndex = index;
            }
        }
        
        // Move current node from openSet to closedSet
        openSet.splice(currentIndex);
        closedSet.push(currentNode);

        findArrayPos(currentNode);

        if (currentNode === endNode) {
            console.log("Found Path!");

            for (let i = 1; i < closedSet.length; i++) {
                let backNode = closedSet[i-1];
                let frontNode = closedSet[i];
                stroke("cyan")
                strokeWeight(4);
                line(backNode.x, backNode.y, frontNode.x, frontNode.y);
            }
            openSet = [];
            return;
        }

        // Generate children
        let children = [];

        [[-1,-1], [0,-1], [1,-1], 
         [-1,0],          [1, 0],
         [-1,1],  [0, 1], [1, 1]
        ].forEach((offset) => {
            let childPostion = [currentNode.arrayPos[0]+offset[0], currentNode.arrayPos[1]+offset[1]];

            // Check validity of child node
            if (childPostion[0] > (grid.length-1) 
            || childPostion[0] < 0 
            || childPostion[1] > (grid[0].length) 
            || childPostion[1] < 0)
                return;

            let child = grid[childPostion[0]][childPostion[1]]

            if (!child)
                return;
            
            children.push(child);
       });

        children.forEach(child => {
            if (closedSet.includes(child) || child.state === "obstacle")
                return;
            
            child.state = "child";
            child.render();
            
            findArrayPos(child);

            // Distance between current and child
            child.g = currentNode.g + 1;
            // Distance between child and end
            child.h = dist(child.arrayPos[0], child.arrayPos[1], endNode.arrayPos[0], endNode.arrayPos[1]);
            // Total cost
            child.f = child.g + child.h;

            openSet.forEach((openNode) => {
                if (child === openNode && child.g > openNode.g)
                    return;
            });

            openSet.push(child);
        });
    }
}