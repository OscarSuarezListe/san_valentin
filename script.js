const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function heartFunction(t) {
  let x = 16 * Math.pow(Math.sin(t), 3);
  let y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t)
      - 2 * Math.cos(3 * t) - Math.cos(4 * t));
  return { x, y };
}

for (let i = 0; i < Math.PI * 2; i += 0.05) {
  let pos = heartFunction(i);
  particles.push({
    x: canvas.width / 2 + pos.x * 15,
    y: canvas.height / 2 + pos.y * 15
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.fillStyle = "#ff4d6d";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

draw();
