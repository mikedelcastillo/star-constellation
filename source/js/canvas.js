const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.addEventListener("resize", resize, false);
window.addEventListener("load", resize, false);

module.exports = {
  canvas, context, resize
};
