import Limb from "./Limb.js";

const limbs = [];
let currentLimb;
let backgroundCanvas;
let speed = 10;

const setup = (p5) => {
  p5.createCanvas(600, 600);
  backgroundCanvas = p5.createGraphics(600,600);
  p5.background(255);
  let test1 = new Limb();
  currentLimb = test1;
  let test2 = new Limb(test1);
  let test3 = new Limb(test2);
  let test4 = new Limb(test3);
  let test5 = new Limb(test4);
  test1.color = "black";
  test2.color = "red";
  test3.color = "green";
  test4.color = "yellow";
  test5.angularVelocity = -0.03;
  limbs.push(test1, test2, test3, test4, test5);
}

const draw = (p5, background) => {

  for(let i = 0; i < speed; i++)
  {
    p5.background(255);
    p5.image(background, 0, 0);

    
  
    limbs.forEach(limb => {
      limb.update(p5);
    });
  
    limbs.forEach(limb => {
      limb.draw(p5, background);
    });
  }

};

new p5(p5 => {
  p5.setup = () => {
    setup(p5, backgroundCanvas);
  };

  p5.draw = () => {
    draw(p5, backgroundCanvas);
  };
});
