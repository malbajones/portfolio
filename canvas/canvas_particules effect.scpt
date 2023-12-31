JsOsaDAS1.001.00bplist00�Vscript_K// setup
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = "red";
console.log(ctx);

class particle {
  constructor(effect) {
    this.effect = effect;
    this.x = Math.random() * this.effect.width;
    this.y = Math.random() * this.effect.height;
    this.radius = 9;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
}

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
    });
  }
}

const effect1 = new effect(canvas);
effect1.handleParticles(ctx);

function animate() {}
                              a jscr  ��ޭ