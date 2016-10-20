// shell
// npm init -y
// npm install --save-dev browserify
// npm install --save-dev watchify babelify
// npm install --save-dev babel-preset-es2015

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
import scene from "./Scene.js";
import Bird from "./bird.js";
import Pipe from "./Pipe.js";
import PipeGenerator from "./PipeGenerator.js";
const pipes = [];

window.onload = function() {
    const bird = new Bird(70, 50);
    new PipeGenerator(pipes);
    function initGameLoop() {
      bird.detectCollision(pipes)
      if(!bird.dead){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        scene.update();
        scene.render(ctx);
        bird.update();
        bird.render(ctx);
        pipes.forEach(function(pipe, i){
          if(pipe.x < -pipe.width){
            delete pipes[i];
          }else{
            pipe.update();
            pipe.render(ctx);

          }


        });
        }
        else {
          ctx.font="50px Oswald"
          ctx.strokeText("is bad gamer", 500 , 300);
          document.getElementById('canvas').onclick = function(){
            window.location.reload()
          }


        }
        window.requestAnimationFrame(initGameLoop);
    }
    initGameLoop();
}
