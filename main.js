
/* ================= CURSOR GLOW ================= */

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    glow.animate({
        left: e.clientX + "px",
        top: e.clientY + "px"
    },{
        duration:300,
        fill:"forwards"
    });

});


/* ================= CARD 3D HOVER EFFECT ================= */

const cards = document.querySelectorAll(".mini-card");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        card.style.transform =
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
        "perspective(800px) rotateX(0) rotateY(0) scale(1)";

    });

});


const motionVideos = document.querySelectorAll("#motion video");

const observer = new IntersectionObserver((entries)=>{
    
    entries.forEach(entry=>{
        
        if(entry.isIntersecting){
            entry.target.play();
        }else{
            entry.target.pause();
        }

    });

},{threshold:0.6});

motionVideos.forEach(video=>{
    observer.observe(video);
});


const canvas = document.getElementById("bg-animation");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];

for(let i=0;i<60;i++){
lines.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
dx:(Math.random()-0.5)*0.5,
dy:(Math.random()-0.5)*0.5,
length:Math.random()*120+50
});
}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.strokeStyle="rgba(0,200,255,0.25)";
ctx.lineWidth=1;

lines.forEach(line=>{

ctx.beginPath();
ctx.moveTo(line.x,line.y);
ctx.lineTo(line.x+line.length,line.y);
ctx.stroke();

line.x+=line.dx;
line.y+=line.dy;

if(line.x>canvas.width) line.x=0;
if(line.x<0) line.x=canvas.width;

if(line.y>canvas.height) line.y=0;
if(line.y<0) line.y=canvas.height;

});

requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize",()=>{
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
});



particlesJS("particles-js", {
  particles: {
    number: {
      value: 80,
      density: { enable: true, value_area: 800 }
    },
    color: { value: "#00f7ff" },
    shape: { type: "circle" },
    opacity: {
      value: 0.5,
      random: false
    },
    size: {
      value: 3,
      random: true
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#00f7ff",
      opacity: 0.3,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out"
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      }
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: { opacity: 0.7 }
      }
    }
  },
  retina_detect: true
});




const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
canvas: document.querySelector("#bg"),
alpha:true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

camera.position.z = 5;

// particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;

const posArray = new Float32Array(particlesCount * 3);

for(let i=0;i<particlesCount*3;i++){
posArray[i] = (Math.random() - 0.5) * 20;
}

particlesGeometry.setAttribute(
"position",
new THREE.BufferAttribute(posArray,3)
);

const particlesMaterial = new THREE.PointsMaterial({
size:0.02,
color:"#6c8cff"
});

const particlesMesh = new THREE.Points(
particlesGeometry,
particlesMaterial
);

scene.add(particlesMesh);

function animate(){
requestAnimationFrame(animate);

particlesMesh.rotation.y += 0.0007;
particlesMesh.rotation.x += 0.0003;

renderer.render(scene,camera);
}

animate();

window.addEventListener("resize",()=>{
renderer.setSize(window.innerWidth, window.innerHeight);
camera.aspect = window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
});
