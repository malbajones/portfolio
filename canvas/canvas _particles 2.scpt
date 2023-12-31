JsOsaDAS1.001.00bplist00�Vscript_A//setup

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const point = Math.min(canvas.width, canvas.height) / 3;
ctx.fillStyle = "white"; //particle's color

/*ctx.strokeStyle = "red"; // particle's lineas color
ctx.lineWidth = 5; //particle's lineas size */

// =========  Particle desing===========

class particle {
  constructor(effect) {
    this.effect = effect;
    this.radius = 15;
    this.x =
      this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y =
      this.radius + Math.random() * (this.effect.height - this.radius * 2);
    this.vx = Math.random() * 4 - 2; //speed of the particles
    this.vy = Math.random() * 4 - 2; //speed of the particles
  }

  draw(context) {
    /*context.fillStyle = "hsl(" + Math.random() * 100 + ", 10%, 30%)"; */ // change particle's color for a mixing of colors
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
  }
  update() {
    this.x += this.vx;
    if (this.x > this.effect.width - this.radius || this.x < this.radius)
      this.vx *= -1;
    this.y += this.vy;
    if (this.y > this.effect.height - this.radius || this.y < this.radius)
      this.vy *= -1;
  }
}

// ============  Canvas's frame and Particles fabric ========

class effect {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberOfParticles = 20;
    this.createParticles();
  }
  createParticles() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new particle(this));
    }
  }
  handleParticles(context) {
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
  }
}

const effect1 = new effect(canvas);

// Animation

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect1.handleParticles(ctx);
  requestAnimationFrame(animate);
}

animate();
                              W jscr  ��ޭ