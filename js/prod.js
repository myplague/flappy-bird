(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function Pipe(x, y, speed, width, heigth) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.width = width;
  this.height = heigth;
}
Pipe.prototype.update = function () {
  this.x -= this.speed;
};
Pipe.prototype.render = function (ctx) {
  ctx.save();
  ctx.fillStyle = "#00E800";
  ctx.fillRect(this.x, this.y, this.width, this.height);
  ctx.lineWidth = 10;
  ctx.strokeRect(this.x, this.y, this.width, this.height);
  if (this.y < 100) {
    ctx.fillRect(this.x - 20, this.y + this.height - 70, this.width + 40, 70);
    ctx.strokeRect(this.x - 20, this.y + this.height - 70, this.width + 40, 70);
  } else {
    ctx.fillRect(this.x - 20, this.y, this.width + 40, 70);
    ctx.strokeRect(this.x - 20, this.y, this.width + 40, 70);
  }
  ctx.restore();
};
exports.default = Pipe;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Pipe = require("./Pipe.js");

var _Pipe2 = _interopRequireDefault(_Pipe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PipeGenerator(pipes) {
  var _this = this;

  this.pipes = pipes;
  this.generatePipe(pipes);
  setInterval(function () {
    _this.generatePipe();
  }, 3000);
}

PipeGenerator.prototype.generatePipe = function () {
  var heightTop = Math.random() * 250 + 50;
  var heightBottom = 600 - heightTop - 250;
  var pipeTop = new _Pipe2.default(1000, -10, 3, 150, heightTop);
  var pipeBottom = new _Pipe2.default(1000, 610 - heightBottom, 3, 150, heightBottom);
  this.pipes.push(pipeTop);
  this.pipes.push(pipeBottom);
};
exports.default = PipeGenerator;

},{"./Pipe.js":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function Scene(mw) {
  this.bg = document.getElementById("bg");
  this.xOffset = 0;
  this.maxWidth = mw;
}
Scene.prototype.update = function () {
  if (this.xOffset <= -450) this.xOffset = 0;
  this.xOffset--;
};
Scene.prototype.render = function (ctx) {
  for (var i = 0; i + this.xOffset <= this.maxWidth; i += 449) {
    ctx.drawImage(this.bg, i + this.xOffset, 0, 450, 600);
  }
};
exports.default = new Scene(1000);

},{}],4:[function(require,module,exports){
"use strict";

var _Scene = require("./Scene.js");

var _Scene2 = _interopRequireDefault(_Scene);

var _bird = require("./bird.js");

var _bird2 = _interopRequireDefault(_bird);

var _Pipe = require("./Pipe.js");

var _Pipe2 = _interopRequireDefault(_Pipe);

var _PipeGenerator = require("./PipeGenerator.js");

var _PipeGenerator2 = _interopRequireDefault(_PipeGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// shell
// npm init -y
// npm install --save-dev browserify
// npm install --save-dev watchify babelify
// npm install --save-dev babel-preset-es2015

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var pipes = [];

window.onload = function () {
  var bird = new _bird2.default(70, 50);
  new _PipeGenerator2.default(pipes);
  function initGameLoop() {
    bird.detectCollision(pipes);
    if (!bird.dead) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      _Scene2.default.update();
      _Scene2.default.render(ctx);
      bird.update();
      bird.render(ctx);
      pipes.forEach(function (pipe, i) {
        if (pipe.x < -pipe.width) {
          delete pipes[i];
        } else {
          pipe.update();
          pipe.render(ctx);
        }
      });
    } else {
      ctx.font = "50px Oswald";
      ctx.strokeText("is bad gamer", 500, 300);
      document.getElementById('canvas').onclick = function () {
        window.location.reload();
      };
    }
    window.requestAnimationFrame(initGameLoop);
  }
  initGameLoop();
};

},{"./Pipe.js":1,"./PipeGenerator.js":2,"./Scene.js":3,"./bird.js":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function Bird(x, y) {
    this.x = x;
    this.y = y;
    this.velY = 0;
    this.gravity = 1;
    this.sprites = [document.getElementById("bird1"), document.getElementById("bird2"), document.getElementById("bird3")];
    this.currentSprite = 0;
    this.updates = 0;
    this.angle = 0;
    this.spriteWidth = 90;
    this.spriteHeight = 64;
    this.initControls();
}

Bird.prototype.update = function () {
    this.updates++;
    this.angle = this.velY * Math.PI / 100;
    if (this.updates % 18 === 0) this.currentSprite = (this.currentSprite + 1) % this.sprites.length;
    this.velY += this.gravity;
    this.y += this.velY;
};
Bird.prototype.render = function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(this.sprites[this.currentSprite], -this.spriteWidth / 2, -this.spriteHeight / 2, this.spriteWidth, this.spriteHeight);
    ctx.restore();
};
Bird.prototype.initControls = function () {
    var _this = this;

    window.addEventListener("keydown", function (e) {
        // console.log(e.keyCode);
        if (e.keyCode === 32) {
            _this.velY = -17;
        }
    });
    window.addEventListener("touchstart", function (e) {
        _this.velY = -17;
    });
};

Bird.prototype.detectCollision = function (pipes) {
    var _this2 = this;

    pipes.forEach(function (pipe, index) {
        var collisionDetected = false;
        if (pipe.y < 10) {
            var a = _this2.x + _this2.spriteWidth / 2;
            var b = _this2.y + _this2.spriteHeight / 2;
            var x0 = pipe.x;
            var y0 = pipe.y + pipe.height;
            var x1 = pipe.x + pipe.width;
            if (a > x0 && a < x1 && b < y0) collisionDetected = true;
        } else {
            var _a = _this2.x + _this2.spriteWidth / 2;
            var _b = _this2.y + _this2.spriteHeight / 2;
            var _x = pipe.x;
            var _x2 = pipe.x + pipe.width;
            var y1 = pipe.y;
            if (_a > _x && _a < _x2 && _b > y1) collisionDetected = true;
        }
        if (collisionDetected) {
            _this2.dead = true;
        }
    });
};

exports.default = Bird;

},{}]},{},[4]);
