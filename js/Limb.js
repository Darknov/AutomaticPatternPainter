export default class Limb {
    constructor(parent = startingLimb) {
      this.id = ++Limb.amount;
      this.parent = parent;
      console.log(this.parent);
      this.position = {
        x: 0 + parent.position.x,
        y: 0 + parent.position.y
      }
      
      this.length = 50;
      this.angularVelocity = 0.01;
      this.angle = 0;
      this.startingAngle = 50;
      this.color = "blue";
      this.size = 0.5;
      this.isDrawing = true;
      this.toDelete = false;
    }

    update(p5) {
      const relativePosition = {x: this.length * Math.cos(this.getAngle()), y: this.length * Math.sin(this.getAngle())}
      
      this.position.x = this.parent.position.x + relativePosition.x;
      this.position.y = this.parent.position.y + relativePosition.y;

      this.angle += this.angularVelocity;
    }

    draw(p5, background) {
      p5.image(background, 0, 0);

      p5.line(this.parent.position.x, this.parent.position.y, this.position.x, this.position.y);
      p5.ellipse(this.position.x, this.position.y, 5, 5);
      if(this.isDrawing) {
        background.stroke(this.color);
        background.fill(this.color);
        background.circle(this.position.x, this.position.y, this.size);
      }


    }

    getAngle() {
      return this.angle + this.startingAngle + this.parent.getAngle();
    }
}

Limb.amount = 0;



const startingLimb = {
  position: {
    x: 300,
    y: 300
  },
  length: 0,
  angularVelocity: 0,
  angle: 0,
  getAngle: function() {
    return this.angle;
  }
}

