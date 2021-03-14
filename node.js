class Node {
    constructor(x, y, width, state) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.state = state;
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
                this.color = "white";
                break;
            case "free":
                this.color = "blue";
                break;
            default:
                this.color = "gray";
        }

        fill(this.color);
        noStroke();
        ellipse(this.x, this.y, this.width);
    }
}