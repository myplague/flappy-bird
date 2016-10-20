import Pipe from "./Pipe.js";

function PipeGenerator(pipes){
  this.pipes = pipes;
  this.generatePipe(pipes);
  setInterval(()=>{
    this.generatePipe();
  }, 3000);
}

PipeGenerator.prototype.generatePipe = function(){
  let heightTop = Math.random()*250+50;
  let heightBottom = 600 - heightTop -250;
  let pipeTop = new Pipe(1000, -10 , 3, 150, heightTop);
  let pipeBottom = new Pipe(1000, 610 - heightBottom, 3, 150, heightBottom);
  this.pipes.push(pipeTop);
  this.pipes.push(pipeBottom);
}
export default PipeGenerator;
