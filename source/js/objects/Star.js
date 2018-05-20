const utils = require('../utils.js');
const {canvas, context} = require('../canvas.js');
const mouse = require('../mouse.js');
const game = require('../game.js');

const Connection = require('./Connection.js');

module.exports = class Star{
  constructor(x, y, hue){
    let initialOffset = utils.randomVector(Math.random() * 10);
    let initialVelocity = utils.randomVector(Math.random() * 2);

    this.position = {};
    this.anchor = {};

    this.velocity = initialVelocity

    this.friction = {
      x: 0.95, y: 0.95
    };

    this.position.x = x + initialOffset.x;
    this.position.y = y + initialOffset.y;

    this.anchor.x = x;
    this.anchor.y = y;

    this.hue = hue;

    this.size = 2;

    this.connections = [];

    this.tripwire = false;
  }

  getColor(){
    return `hsl(${this.hue}, 90%, 60%)`;
  }

  draw(){
    context.beginPath();
    context.fillStyle = this.getColor();
    // context.lineWidth = 1;

    context.arc(
      this.position.x, this.position.y,
      this.size, 0, 2 * Math.PI
    );

    context.closePath();

    // context.stroke();
    context.fill();
  }

  update(){
    const mouseDistance = utils.distance(mouse.position, this.position);

    this.velocity.x += (this.anchor.x - this.position.x) / 20;
    this.velocity.y += (this.anchor.y - this.position.y) / 20;

    this.velocity.x += (mouse.position.x - this.position.x) / mouseDistance;
    this.velocity.y += (mouse.position.y - this.position.y) / mouseDistance;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.x *= this.friction.x;
    this.velocity.y *= this.friction.y;

    this.findConnection();

  }

  findConnection(){
    if(this.tripwire) return;

    game.stars.forEach(star => {
      if(star == this) return;
      if(this.isConnectedTo(star)) return;

      const distance = utils.distance(star.anchor, this.anchor);
      const hueDiference = Math.abs(this.hue - star.hue);

      if(distance < 100 && hueDiference < 60){
        this.connect(star);
      }
    });

    this.tripwire = true;
  }

  isConnectedTo(star){
    return !!this.connections.find(con => con.stars.indexOf(star) != -1);
  }

  connect(star, ){
    if(!this.isConnectedTo(star)){
      let con = new Connection([this, star]);

      game.connections.push(con);
    }
  }
}
