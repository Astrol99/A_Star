/// <reference path="./p5.global-mode.d.ts" />

// Radius of circles on grid
const size = 10;

let grid = [];

let startNode;
let endNode;

let openSet = [];
let closedSet = [];

let pathStarted = false;
let foundedPath = false;

let startBtn;

function generateGrid() {
    for (let x = size; x < width; x += size*2) {
        let col = [];

        for (let y = size; y < height; y += size*2) {
            let node = new Node(x, y, size, "free");
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

function startPath() {
    console.log("A*");
    pathStarted = true;
    startBtn.attribute('disabled', '');
}

function setup() {
    createCanvas(800, 1100);
    generateGrid();

    // Setup A* nodes
    startNode = grid[0][0];
    startNode.state = "start";
    startNode.render();

    endNode = grid[grid.length-1][grid[0].length-1];
    endNode.state = "end";
    endNode.render();

    findArrayPos(endNode);

    openSet.push(startNode);

    startBtn = createButton("Start");
    startBtn.position(size);
    startBtn.mousePressed(startPath);
}

let dragStart = false;
let dragEnd = false;

function draw() {
    if (mouseIsPressed && !pathStarted) {
        const x = Math.floor((mouseX/(size*2)));
        const y = Math.floor((mouseY/(size*2)));

        if (grid[x] && grid[x][y]) {
            if (dragStart && grid[x][y].state === "free") {
                startNode.state = "free";
                startNode.render();

                startNode = grid[x][y];
                startNode.state = "start";
                startNode.render();

                openSet.pop();
                openSet.push(startNode);
            } else if (dragEnd && grid[x][y].state === "free") {
                endNode.state = "free";
                endNode.render();

                endNode = grid[x][y];
                endNode.state = "end";
                endNode.render();
                findArrayPos(endNode);
            } else if (grid[x][y].state === "start") {
                dragStart = true;
            } else if (grid[x][y].state === "end") {
                dragEnd = true;
            } else {
                grid[x][y].state = "obstacle";
                grid[x][y].render();
            }
        }
    } else {
        dragStart = false;
        dragEnd = false;
    }

    // Main A* loop
    if (openSet.length > 0 && pathStarted) {
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

        closedSet[closedSet.length-1].state = "searched";
        closedSet[closedSet.length-1].render();

        if (closedSet.length > 1) {
            strokeWeight(2);
            stroke("yellow");
            line(closedSet[closedSet.length-2].x, closedSet[closedSet.length-2].y, closedSet[closedSet.length-1].x, closedSet[closedSet.length-1].y);
        }

        if (currentNode === endNode) {
            console.log("Found Path!");
            foundedPath = true;
            
            for (let i = 1; i < closedSet.length; i++) {
                let backNode = closedSet[i-1];
                let frontNode = closedSet[i];
                stroke("cyan")
                strokeWeight(size/2);
                line(backNode.x, backNode.y, frontNode.x, frontNode.y);
            }
            
            openSet = [];
            return;
        }

        findArrayPos(currentNode);

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
    } else if (!foundedPath && openSet.length === 0) {
        console.log(false);
        foundedPath = true;
    }
}