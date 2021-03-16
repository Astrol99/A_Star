class Node {
    constructor(x, y, width, state, parent=null) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.state = state;
        this.parent = parent;

        this.arrayPos = [Math.ceil((this.x/(width*2))-1), Math.ceil((this.y/(width*2))-1)];

        this.g = 0;
        this.h = 0;
        this.f = 0;
    }

    render() {
        switch (this.state) {
            case "start":
                this.color = "lime";
                break;
            case "end":
                this.color = "red";
                break;
            case "obstacle":
                this.color = "gray";
                break;
            case "free":
                this.color = "black";
                break;
            case "searched":
                this.color = "blue";
                break;
            case "child":
                this.color = "lime";
                break;
            default:
                this.color = "pink";
        }

        fill(this.color);
        noStroke();
        ellipse(this.x, this.y, this.width);
    }
}