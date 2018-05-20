const utils = {};

// utils.setPosition = (context, x, y){
//   context.x = x;
//   context.y = y;
// }

utils.randomVector = (magnitude) => {
  const angle = Math.random() * Math.PI * 2;
  return {
    x: Math.cos(angle) * magnitude,
    y: Math.sin(angle) * magnitude
  };
};

utils.distance = (a, b) => Math.sqrt(
  (a.x - b.x) * (a.x - b.x) +
  (a.y - b.y) * (a.y - b.y)
);

module.exports = utils;
