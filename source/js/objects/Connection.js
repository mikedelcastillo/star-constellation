const {canvas, context} = require('../canvas.js');

module.exports = class Connection{
  constructor(stars){
    this.stars = stars;
    stars.forEach(star => {
      star.connections.push(this);
    });

    this.hue = (
      this.stars[0].hue +
      this.stars[1].hue
    ) / 2;
  }

  getColor(){
    return `hsl(${this.hue}, 90%, 60%)`;
  }

  draw(){
    context.beginPath();
    context.strokeStyle = this.getColor();

    context.moveTo(
      this.stars[0].position.x,
      this.stars[0].position.y
    );

    context.lineTo(
      this.stars[1].position.x,
      this.stars[1].position.y
    );

    context.closePath();

    context.stroke();
  }
}
