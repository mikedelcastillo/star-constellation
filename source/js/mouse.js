const mouse = {
  down: false,
  dragging: false,
  downPosition: {x: 0, y: 0},
  upPosition: {x: 0, y: 0},
  position: {x: 0, y: 0}
};

mouse.getPosition = e => {
  return {
    x: e.pageX,
    y: e.pageY
  };
};

window.addEventListener("mousedown", e => {
  mouse.down = true;
  mouse.dragging = false;
  mouse.position = mouse.getPosition(e);
  mouse.downPosition = mouse.getPosition(e);
  // mouse.upPosition = mouse.getPosition(e);
}, false);

window.addEventListener("mousemove", e => {
  if(mouse.down) mouse.dragging = true;
  mouse.position = mouse.getPosition(e);
  // mouse.upPosition = mouse.getPosition(e);
}, false);

window.addEventListener("mouseup", e => {
  mouse.down = false;
  mouse.dragging = false;
  mouse.position = mouse.getPosition(e);
  mouse.upPosition = mouse.getPosition(e);
}, false);


module.exports = mouse;
