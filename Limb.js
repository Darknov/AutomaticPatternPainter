class Limb {
  constructor(id, position = { x: 0, y: 0 }) {
    this.id = id;
    this.position = position;
    this.children = [];

    this.length = 30;
    this.color = "black";

    this.angularVelocity = 0.2;
    this.previousAngle = 0;
    this.angle = 0;
    this.firstAngle = 1;

    this.isDrawing = false;
    this.isSelected = false;
  }

  update() {
    this.angle += this.angularVelocity;
  }

  draw(backgroundCanvas, parentAngle = 0) {
    push();
    backgroundCanvas.push();
    let vector = p5.Vector.fromAngle(parentAngle + this.firstAngle, this.length);
    translate(vector.x + this.position.x, vector.y + this.position.y);
    backgroundCanvas.translate(
      vector.x + this.position.x,
      vector.y + this.position.y
    );
    if(this.isSelected) {
      fill("#00FF00");
      rect(-6, -6, 12, 12);
    } 
    if (this.isDrawing) backgroundCanvas.point(0, 0);

    this.children.forEach(entry => {
      let childVector = p5.Vector.fromAngle(
        this.angle + parentAngle + this.firstAngle,
        entry.length
      );
      line(0, 0, childVector.x, childVector.y);
      entry.draw(backgroundCanvas, this.angle + parentAngle);
    });

    this.isDrawing ? fill("red") : fill("white");
    ellipse(0, 0, 5, 5);
    backgroundCanvas.pop();
    pop();
  }
}
