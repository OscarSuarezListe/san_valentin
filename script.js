const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let particles = [];
let targets = [];

/* =====================
   🌌 ESTRELLAS
===================== */
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speed: Math.random() * 0.5 + 0.2
  });
}

/* =====================
   💘 GENERAR FORMA TEXTO
===================== */
function createTextTargets(text, yOffset) {
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");

  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;

  tempCtx.fillStyle = "white";
  tempCtx.font = "bold 120px Arial";
  tempCtx.textAlign = "center";
  tempCtx.fillText(text, canvas.width / 2, yOffset);

  const data = tempCtx.getImageData(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y += 8) {
    for (let x = 0; x < canvas.width; x += 8) {
      const index = (y * canvas.width + x) * 4;
      if (data.data[index + 3] > 128) {
        targets.push({ x, y });
      }
    }
  }
}

/* =====================
   💖 GENERAR CORAZÓN GRANDE
===================== */
function heartShape(t) {
  let x = 16 * Math.pow(Math.sin(t), 3);
  let y = 13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);
  return { x, y };
}

// Centro del corazón (más abajo)
const heartCenterX = canvas.width / 2;
const heartCenterY = canvas.height * 0.55; // 🔥 más abajo

for (let i = 0; i < Math.PI * 2; i += 0.05) {
  let pos = heartShape(i);

  targets.push({
    x: heartCenterX + pos.x * 15,
    y: heartCenterY - pos.y * 15  // 🔥 aquí va RESTANDO
  });
}
createTextTargets("TE AMO" , canvas.height * 0.25);
/* =====================
   🚀 CREAR PARTÍCULAS DESDE CAÑÓN
===================== */

function createParticle(target) {
  const cannonX = canvas.width - 80;
  const cannonY = canvas.height - 80;

  return {
    x: cannonX,
    y: cannonY,
    targetX: target.x,
    targetY: target.y,
    size: 16,
    speed: Math.random() * 2 + 2
  };
}

targets.forEach(t => {
  particles.push(createParticle(t));
});

/* =====================
   🎬 ANIMACIÓN
===================== */

function animate() {

  ctx.fillStyle = "rgba(0,0,30,0.4)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 🌌 Estrellas
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });

  // 🚀 Dibujar cañón
  ctx.fillStyle = "#888";
  ctx.fillRect(canvas.width - 90, canvas.height - 60, 60, 20);

  // 💘 Partículas ❤️
  particles.forEach(p => {
    let dx = p.targetX - p.x;
    let dy = p.targetY - p.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 1) {
      p.x += dx / dist * p.speed;
      p.y += dy / dist * p.speed;
    }

    ctx.font = p.size + "px Arial";
    ctx.fillText("❤️", p.x, p.y);
  });

  requestAnimationFrame(animate);
}

animate();
