import Limb from "./Limb";

const setup = p5 => {
  p5.createCanvas(600, 600);
  p5.background(255);
};

const draw = p5 => {

};

new p5(p5 => {
  p5.setup = () => {
    setup(p5);
  };

  p5.draw = () => {
    draw(p5);
  };
});