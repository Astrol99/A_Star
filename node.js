class Node {
    constructor(x, y, width, color, state) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.color = color;
        this.state = state;
    }

    render() {
        fill(color(this.color));
        noStroke();
        ellipse(this.x, this.y, this.width);
    }
}