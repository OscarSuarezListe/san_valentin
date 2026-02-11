const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let heartParticles = [];

/* =========================
   🌌 CREAR ESTRELLAS
========================= */

for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speed: Math.random() * 0.5 + 0.2
  });
}

/* =========================
   💖 FUNCIÓN CORAZÓN
========================= */

function heart(t) {
  let x = 16 * Math.pow(Math.sin(t), 3);
  let y = 13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);
  return { x, y };
}

/* =========================
   💘 CREAR PARTÍCULAS CORAZÓN
========================= */

for (let i = 0; i < Math.PI * 2; i += 0.05) {
  let pos = heart(i);

  heartParticles.push({
    baseX: canvas.width / 2 + pos.x * 15,
    baseY: canvas.height / 2 - pos.y * 15,
    size: Math.random() * 2 + 1,
    offset: Math.random() * 100
  });
}

/* =========================
   🎬 ANIMACIÓN
========================= */

function animate(time) {

  // Fondo oscuro
  ctx.fillStyle = "rgba(0, 0, 30, 0.4)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  /* 🌌 Dibujar estrellas */
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

  /* 💖 Dibujar corazón */
  heartParticles.forEach(p => {
    let pulse = Math.sin(time * 0.005 + p.offset) * 5;

    ctx.beginPath();
    ctx.arc(p.baseX, p.baseY + pulse, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "#ff4d6d";
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate(0);
