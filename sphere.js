//disappearing curser
const letter =document.getElementById("letter");
const download = document.getElementById("download-button")
let visible = true;
setInterval(() => {
  visible = !visible;
  letter.style.visibility = visible ? "visible" : "hidden";
  download.style.textDecoration = visible ? "underline" : "none";
}, 500);

const canvas = document.getElementById("sphereCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight*.9;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
const numCircles = 12;
let angle = 0;
let scaleNum = 0.5;
let count =0;

//sphere locations
const dots = [];
for (let sphereY = .1;sphereY<Math.PI;sphereY += Math.PI/15){
  for(let sphereX = 0;sphereX<Math.PI *2;sphereX +=Math.PI/12){
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
    ctx.shadowBlur = 8;
    ctx.shadowColor = "white";
    ctx.arc(screenX,screenY,circleRadius* scale,0,Math.PI*2);
    ctx.fillStyle = "#00FF00";
    ctx.fill();
}
angle += 0.012;
  requestAnimationFrame(draw);
}
draw();

//resume color switch
const img = new Image();
img.src = "Micah Luck Resume.jpg";
img.onload = function(){
  const resume = document.getElementById("resume1");
  const pic = resume.getContext("2d");
  resume.width = img.width;
  resume.height = img.height;
  pic.imageSmoothingEnabled = true;
  pic.imageSmoothingQuality = "high";
  pic.drawImage(img, 0, 0, img.width, img.height);
  const imgData = pic.getImageData(0,0,resume.width, resume.height);
  const data = imgData.data;
  const target = {r: 255, g: 255, b: 255};
  const newColor = {r: 13, g: 13, b: 13};
  for(let i = 0; i<data.length; i+=4){
    const r = data[i];
    const g = data[i+1];
    const b = data[i+2]
    if (Math.abs(r-target.r)<60 && Math.abs(g-target.g)<60 && Math.abs(b-target.b)<60){
      data[i] = newColor.r;
      data[i+1] = newColor.g;
      data[i+2] = newColor.b;
    }
    else if (r<60 && g<60 && b<60){
      data[i] = 255;
      data[i+1] = 255;
      data[i+2] = 255;
    }
  }
    pic.putImageData(imgData,0,0);
}