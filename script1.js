// Setup
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//ctx.fillStyle = "black"; // Particle's color
//ctx.strokeStyle = "black"; // Particle's line color
let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, "DarkGray");
gradient.addColorStop(0.5, "Gray");
gradient.addColorStop(1, "DimGray");
ctx.fillStyle = gradient;

ctx.lineWidth = 0.2;

class Particle {
  constructor(effect) {
    this.effect = effect;
    this.radius = Math.random() * 0 + 1;

    this.centerX = this.effect.width / 2;
    this.centerY = this.effect.height / 2;

    const angle = Math.random() * Math.PI * 2;
    const maxDistance = Math.min(this.centerX, this.centerY) - this.radius * 2;

    const randomDistance =
      Math.random(this.centerX, this.centerY) + 0 + 360 * maxDistance;

    this.x = this.centerX + randomDistance * Math.cos(angle);
    this.y = this.centerY + randomDistance * Math.sin(angle);

    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    const maxDistance = Math.min(this.centerX, this.centerY) - this.radius;
    const distanceToCenter = Math.sqrt(
      (this.x - this.centerX) ** 2 + (this.y - this.centerY) ** 2
    );

    if (distanceToCenter > maxDistance) {
      const angleToCenter = Math.atan2(
        this.y - this.centerY,
        this.x - this.centerX
      );

      this.x = this.centerX + maxDistance * Math.cos(angleToCenter);
      this.y = this.centerY + maxDistance * Math.sin(angleToCenter);

      this.vx = Math.random() * 2 - 1;
      this.vy = Math.random() * 2 - 1;
    }
  }
}

class Effect {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberOfParticles = 100;
    this.createParticles();
    this.lineColor = "grey";

    window.addEventListener("resize", () => {
      this.resizeCanvas();
    });
  }

  createParticles() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }

  handleParticles(context) {
    this.connectParticles(context);
    this.particles.forEach((particle) => {
      particle.update();
      particle.draw(context);
    });
  }

  connectParticles(context) {
    const maxDistance = 150;
    context.strokeStyle = this.lineColor;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const particleA = this.particles[i];
        const particleB = this.particles[j];

        const dx = particleA.x - particleB.x;
        const dy = particleA.y - particleB.y;
        const distance = Math.hypot(dx, dy);

        if (distance < maxDistance) {
          context.save();
          const opacity = 1 - distance / maxDistance;
          context.globalAlpha = opacity;
          context.beginPath();
          context.moveTo(particleA.x, particleA.y);
          context.lineTo(particleB.x, particleB.y);
          context.stroke();
          context.restore();
        }
      }
    }
  }

  resizeCanvas() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Update the gradient colors
    const gradient = this.context.createLinearGradient(
      0,
      0,
      this.width,
      this.height
    );
    gradient.addColorStop(0, "DarkGray");
    gradient.addColorStop(0.5, "Gray");
    gradient.addColorStop(1, "DimGray");
    this.context.fillStyle = gradient;

    this.particles.forEach((particle) => {
      const angle = Math.random() * Math.PI * 2;
      const maxDistance =
        Math.min(this.width / 2, this.height / 2) - particle.radius;
      const randomDistance = Math.random() * maxDistance;

      particle.centerX = this.width / 2;
      particle.centerY = this.height / 2;
      particle.x = particle.centerX + randomDistance * Math.cos(angle);
      particle.y = particle.centerY + randomDistance * Math.sin(angle);
    });
  }
}

const effect1 = new Effect(canvas, ctx);
effect1.resizeCanvas();

// Animation
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect1.handleParticles(ctx);
  requestAnimationFrame(animate);
}

animate();
