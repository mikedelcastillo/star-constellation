/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(1),
    canvas = _require.canvas,
    context = _require.context;

var game = __webpack_require__(2);

var Star = __webpack_require__(3);

game.addStar = function (x, y, hue) {
  var star = new Star(x, y, hue);

  game.stars.push(star);

  return star;
};

for (var x = 0; x < window.innerWidth; x += 50) {
  for (var y = 0; y < window.innerHeight; y += 50) {
    game.addStar(x, y, Math.floor(Math.random() * 360));
  }
}

loop();
function loop() {
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  game.stars.forEach(function (star) {
    star.update();
  });

  game.connections.forEach(function (con) {
    con.draw();
  });

  game.stars.forEach(function (star) {
    star.draw();
  });

  requestAnimationFrame(loop);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var resize = function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.addEventListener("resize", resize, false);
window.addEventListener("load", resize, false);

module.exports = {
  canvas: canvas, context: context, resize: resize
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var game = {
  stars: [],
  connections: [],
  camera: {
    x: 0,
    y: 0,
    scale: 1
  }
};

module.exports = game;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = __webpack_require__(4);

var _require = __webpack_require__(1),
    canvas = _require.canvas,
    context = _require.context;

var mouse = __webpack_require__(6);
var game = __webpack_require__(2);

var Connection = __webpack_require__(5);

module.exports = function () {
  function Star(x, y, hue) {
    _classCallCheck(this, Star);

    var initialOffset = utils.randomVector(Math.random() * 10);
    var initialVelocity = utils.randomVector(Math.random() * 2);

    this.position = {};
    this.anchor = {};

    this.velocity = initialVelocity;

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

  _createClass(Star, [{
    key: 'getColor',
    value: function getColor() {
      return 'hsl(' + this.hue + ', 90%, 60%)';
    }
  }, {
    key: 'draw',
    value: function draw() {
      context.beginPath();
      context.fillStyle = this.getColor();
      // context.lineWidth = 1;

      context.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);

      context.closePath();

      // context.stroke();
      context.fill();
    }
  }, {
    key: 'update',
    value: function update() {
      var mouseDistance = utils.distance(mouse.position, this.position);

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
  }, {
    key: 'findConnection',
    value: function findConnection() {
      var _this = this;

      if (this.tripwire) return;

      game.stars.forEach(function (star) {
        if (star == _this) return;
        if (_this.isConnectedTo(star)) return;

        var distance = utils.distance(star.anchor, _this.anchor);
        var hueDiference = Math.abs(_this.hue - star.hue);

        if (distance < 100 && hueDiference < 60) {
          _this.connect(star);
        }
      });

      this.tripwire = true;
    }
  }, {
    key: 'isConnectedTo',
    value: function isConnectedTo(star) {
      return !!this.connections.find(function (con) {
        return con.stars.indexOf(star) != -1;
      });
    }
  }, {
    key: 'connect',
    value: function connect(star) {
      if (!this.isConnectedTo(star)) {
        var con = new Connection([this, star]);

        game.connections.push(con);
      }
    }
  }]);

  return Star;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = {};

// utils.setPosition = (context, x, y){
//   context.x = x;
//   context.y = y;
// }

utils.randomVector = function (magnitude) {
  var angle = Math.random() * Math.PI * 2;
  return {
    x: Math.cos(angle) * magnitude,
    y: Math.sin(angle) * magnitude
  };
};

utils.distance = function (a, b) {
  return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
};

module.exports = utils;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(1),
    canvas = _require.canvas,
    context = _require.context;

module.exports = function () {
  function Connection(stars) {
    var _this = this;

    _classCallCheck(this, Connection);

    this.stars = stars;
    stars.forEach(function (star) {
      star.connections.push(_this);
    });

    this.hue = (this.stars[0].hue + this.stars[1].hue) / 2;
  }

  _createClass(Connection, [{
    key: 'getColor',
    value: function getColor() {
      return 'hsl(' + this.hue + ', 90%, 60%)';
    }
  }, {
    key: 'draw',
    value: function draw() {
      context.beginPath();
      context.strokeStyle = this.getColor();

      context.moveTo(this.stars[0].position.x, this.stars[0].position.y);

      context.lineTo(this.stars[1].position.x, this.stars[1].position.y);

      context.closePath();

      context.stroke();
    }
  }]);

  return Connection;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mouse = {
  down: false,
  dragging: false,
  downPosition: { x: 0, y: 0 },
  upPosition: { x: 0, y: 0 },
  position: { x: 0, y: 0 }
};

mouse.getPosition = function (e) {
  return {
    x: e.pageX,
    y: e.pageY
  };
};

window.addEventListener("mousedown", function (e) {
  mouse.down = true;
  mouse.dragging = false;
  mouse.position = mouse.getPosition(e);
  mouse.downPosition = mouse.getPosition(e);
  // mouse.upPosition = mouse.getPosition(e);
}, false);

window.addEventListener("mousemove", function (e) {
  if (mouse.down) mouse.dragging = true;
  mouse.position = mouse.getPosition(e);
  // mouse.upPosition = mouse.getPosition(e);
}, false);

window.addEventListener("mouseup", function (e) {
  mouse.down = false;
  mouse.dragging = false;
  mouse.position = mouse.getPosition(e);
  mouse.upPosition = mouse.getPosition(e);
}, false);

module.exports = mouse;

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map