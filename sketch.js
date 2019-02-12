let backgroundCanvas;

let startingLimb;
let currentLimb;
let limbs = [];

let speed = 1;
let isRunning = true;
function setup() {
  createCanvas(600, 600);
  backgroundCanvas = createGraphics(600, 600);

  //testing
  startingLimb = setupStartingPoint();
  currentLimb = startingLimb;
  startingLimb.isSelected = true;
  let test = addLimb(startingLimb);
  let test2 = addLimb(test);
  // let test3 = addLimb(test2);
  // let test4 = addLimb(test3);

  startingLimb.angularVelocity = 0.005;
  test.angularVelocity = -0.03;
  test2.angularVelocity = 0.21;

  test2.isDrawing = true;
}

function draw() {
  // todo: isRunning should have effect only on drawing, not on limbs in app(e.g you should be able to change and immediately see
  // changes in attributes)
  if (isRunning) {
    for (let i = 0; i < speed; i++) {
      background(255);
      image(backgroundCanvas, 0, 0);
      limbs.forEach(entry => {
        entry.update();
      });
      startingLimb.draw(backgroundCanvas);
    }
  }
}

function setupStartingPoint() {
  let startingLimb = new Limb(1, { x: 300, y: 300 });
  startingLimb.length = 0;
  limbs.push(startingLimb);
  return startingLimb;
}

function addLimb(parent = currentLimb) {
  const child = new Limb(limbs[limbs.length - 1].id + 1);
  parent.children.push(child);
  limbs.push(child);
  updateLimbList();
  return child;
}

function resetCanvas() {
  backgroundCanvas.background(255);
}

function updateLimbList() {
  const limbsElement = document.getElementById("limbs");
  limbsElement.innerHTML = "";
  limbs.forEach(entry => {
    const node = document.createElement("label");

    if (entry.isSelected) {
      node.style.backgroundColor = "#00FF00";
    }
    node.classList.add("limb");
    node.onclick = changeSelected;

    const textnode = document.createTextNode(entry.id + ".limb");
    node.appendChild(textnode);
    limbsElement.appendChild(node);
  });
}

function changeSelected(e) {
  const splitElement = e.target.innerHTML.split(".");
  currentLimb.isSelected = false;
  limbs.forEach(entry => {
    if (entry.id == splitElement[0]) {
      currentLimb = entry;
      entry.isSelected = true;
    }
  });

  updateLimbList();
  updateAttributes();
}

function deleteLimb() {
  for (let i = 0; i < limbs.length; i++) {
    if (limbs[i].id === currentLimb.id) {
      limbs = limbs.splice(i, 1);
      i = 0;
    }
    for (let j = 0; j < limbs[i].children.length; j++) {
      if (limbs[i].children[j].id === currentLimb.id) {
        limbs[i].children = limbs[i].children.splice(j, 1);
      }
    }
  }
  currentLimb = limbs[0];
  updateLimbList();
}

function updateAttributes() {
  document.getElementById("speed").value = speed;
  document.getElementById("length").value = currentLimb.length;
  document.getElementById("angle").value = currentLimb.firstAngle;
  document.getElementById("angular-velocity").value =
    currentLimb.angularVelocity;
  document.getElementById("color").value = currentLimb.color;
}

function changedSpeed() {
  speed = parseFloat(document.getElementById("speed").value);
}

function changedLength() {
  currentLimb.length = parseFloat(document.getElementById("length").value);
}

function changedAngularVelocity() {
  currentLimb.angularVelocity = parseFloat(
    document.getElementById("angular-velocity").value
  );
}

function changedAngle() {
  currentLimb.angle = parseFloat(document.getElementById("angle").value);
}

function changedColor() {
  currentLimb.color = document.getElementById("color").value;
}

function addLimbButton() {
  addLimb();
}

function stop() {
  isRunning = false;
}

function start() {
  isRunning = true;
}
