class Limb {
    constructor(id, position = {x: 0, y: 0}) {
        this.id = id;
        this.position = position;
        this.children = [];

        this.length = 30;
        this.color = "black";
 
        this.angularVelocity = 0.00;
        this.previousAngle = 0;
        this.angle = 0;

        this.isDrawing = false;
    }

    update() {
        this.previousAngle = this.angle;
        this.angle += this.angularVelocity;
    }

    draw(backgroundCanvas, parentAngle = 0) {
        push();

        translate(this.position.x, this.position.y);
        rotate(this.angle);
        let previousVector = p5.Vector.fromAngle(this.previousAngle + parentAngle, this.length);
        let vector = p5.Vector.fromAngle(this.angle + parentAngle, this.length);
        
        backgroundCanvas.push();
        backgroundCanvas.translate(this.position.x, this.position.y);
        backgroundCanvas.rotate(this.angle);
        if(this.isDrawing)
            backgroundCanvas.line(previousVector.x, previousVector.y, vector.x, vector.y);
        
        push();
        
        translate(vector.x, vector.y);
        backgroundCanvas.translate(vector.x, vector.y);
        this.children.forEach((entry) => {
            let childVector = p5.Vector.fromAngle(entry.angle + this.angle, entry.length)
            line(0, 0, childVector.x, childVector.y);
            entry.draw(backgroundCanvas, this.angle);
        })

        pop();
        this.isDrawing ? fill('red') : fill('white');
        ellipse(vector.x, vector.y, 5, 5);
        backgroundCanvas.pop();
        pop();
    }
}