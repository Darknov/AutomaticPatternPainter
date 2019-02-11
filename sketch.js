let backgroundCanvas;

let startingLimb;

const limbs = [];

function setup() {
  createCanvas(600, 600);
  backgroundCanvas = createGraphics(600, 600);
  //backgroundCanvas.ellipse(backgroundCanvas.width / 2, backgroundCanvas.height / 2, 50, 50);
  startingLimb = setupStartingPoint();
  let test = addLimb(startingLimb);
  let test2 = addLimb(test);
  let test3 = addLimb(test2);
  let test4 = addLimb(test3);
  let test5 = addLimb(test4);
  // startingLimb.angularVelocity = 0.01;
  // test.angularVelocity = 0.02;
  // test3.angularVelocity = 0.03;
  // test4.angularVelocity = 0.05;
  // test5.angularVelocity = 0.5;
  test5.length = 10;
  test5.isDrawing = true;
  console.log(limbs);
}

function draw() {
  background(255);
  image(backgroundCanvas, 0, 0);
  limbs.forEach((entry) => {
    entry.update();
  });
  startingLimb.draw(backgroundCanvas);
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