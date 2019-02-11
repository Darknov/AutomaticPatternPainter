let backgroundCanvas;

let startingLimb;

const limbs = [];
const speed = 50;
function setup() {
  createCanvas(600, 600);
  backgroundCanvas = createGraphics(600, 600);
  //backgroundCanvas.ellipse(backgroundCanvas.width / 2, backgroundCanvas.height / 2, 50, 50);
  startingLimb = setupStartingPoint();
  let test = addLimb(startingLimb);
  let test2 = addLimb(test);
  let test3 = addLimb(test2);
  let test4 = addLimb(test3);

  startingLimb.angularVelocity = 0.005;
  test.angularVelocity = -0.03;
  test2.angularVelocity = 0.21;
  // startingLimb.isDrawing = true;

  // test.length = 80;
  // test3.length = 10;

  // test3.angularVelocity = 0.1;
  // test4.angularVelocity = 0.05;
  // test3.isDrawing = true;
  test4.isDrawing = true;
  console.log(limbs);
}

function draw() {

  for(let i = 0; i < speed; i++){
    background(255);
    image(backgroundCanvas, 0, 0);
    limbs.forEach((entry) => {
      entry.update();
    });
    startingLimb.draw(backgroundCanvas);
  }
}

function setupStartingPoint() {
  let startingLimb = new Limb(0, {x: 300, y: 300});
  startingLimb.length = 0;
  limbs.push(startingLimb);
  return startingLimb;
} 

function addLimb(parent) {
  const child = new Limb(limbs[limbs.length - 1].id + 1);
  parent.children.push(child);
  limbs.push(child);
  return child;
}