const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

// Fórmula matemática del corazón
function heart(t) {
  let x = 16 * Math.pow(Math.sin(t), 3);
  let y = 13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);
  return { x, y };
}

// Crear partículas
for (let i = 0; i < Math.PI * 2; i += 0.05) {
  let pos = heart(i);

  particles.push({
    baseX: canvas.width / 2 + pos.x * 15,
    baseY: canvas.height / 2 - pos.y * 15,
    size: Math.random() * 3 + 1,
    offset: Math.random() * 100
  });
}

function animate(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    let pulse = Math.sin(time * 0.005 + p.offset) * 5;

    ctx.beginPath();
    ctx.arc(p.baseX, p.baseY + pulse, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "#ff4d6d";
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate(0);
