const {canvas, context} = require('./canvas.js');
const game = require('./game.js');

const Star = require('./objects/Star.js');

game.addStar = (x, y, hue) => {
  const star = new Star(x, y, hue);

  game.stars.push(star);

  return star;
};

for(let x = 0; x < window.innerWidth; x += 50){
  for(let y = 0; y < window.innerHeight; y += 50){
    game.addStar(x, y, Math.floor(Math.random() * 360));
  }
}

loop();
function loop(){
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  game.stars.forEach(star => {
    star.update();
  });

  game.connections.forEach(con => {
    con.draw();
  });

  game.stars.forEach(star => {
    star.draw();
  });

  requestAnimationFrame(loop);
}
