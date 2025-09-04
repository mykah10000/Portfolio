const canvas = document.getElementById("sphereCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
const numCircles = 12;
let angle = 0;

//sphere locations
const dots = [];
for (let sphereY = .1;sphereY<Math.PI;sphereY += Math.PI/15){
  for(let sphereX = 0;sphereX<Math.PI *2;sphereX +=Math.PI/10){
      dots.push({sphereY,sphereX})
  }
}

function draw(){
  //canvas background
  ctx.fillStyle = "#0D0D0D";
  ctx.fillRect(0,0,canvas.width, canvas.height);
  const cx = canvas.width/2;
  const cy = canvas.height/2;
  const radius = 200;

  for(let p of dots){
    //polar to cartesian
    let x = radius *Math.sin(p.sphereY)*Math.cos(p.sphereX);
    let y = radius * Math.cos(p.sphereY);
    let z = radius * Math.sin(p.sphereY) * Math.sin(p.sphereX);

    //rotation and scale
    const rotatedX = x * Math.cos(angle) - z * Math.sin(angle);
    const rotatedZ = x *Math.sin(angle) + z *Math.cos(angle);
    const scale = 300/(300 +rotatedZ);
    const screenX = cx +rotatedX *scale;
    const screenY = cy+ y *scale;
    let circleRadius = 5* scale;
    //drawing spheres
    ctx.beginPath();
    ctx.shadowBlur = 5;
    ctx.shadowColor = "white";
    ctx.arc(screenX,screenY,circleRadius* scale,0,Math.PI*2);
    ctx.fillStyle = "#00FF00";
    ctx.fill();
}
  angle += .01;
  requestAnimationFrame(draw);
}
draw();