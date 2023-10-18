//setup

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
ctx.fillStyle = 'black' //particle's color
ctx.strokeStyle = 'black' // particle's lineas color

/*ctx.lineWidth = 5; //particle's lineas size */

// =========  Particle desing===========

class particle {
  constructor(effect) {
    this.effect = effect
    this.radius = Math.random() * 5 + 2
    this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2)
    this.y =
      this.radius + Math.random() * (this.effect.height - this.radius * 2)
    this.vx = Math.random() * 0.5 - 1 //speed of the particles
    this.vy = Math.random() * 0.5 - 1 //speed of the particles
  }

  draw(context) {
    /*context.fillStyle = "hsl(" + Math.random() * 100 + ", 10%, 30%)"; */ // change particle's color for a mixing of colors
    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    context.fill()
    /*context.stroke(); */
  }
  update() {
    this.x += this.vx
    if (this.x > this.effect.width - this.radius || this.x < this.radius)
      this.vx *= 1
    this.y += this.vy
    if (this.y > this.effect.height - this.radius || this.y < this.radius)
      this.vy *= 1
  }
  reset() {
    this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2)
    this.y =
      this.radius + Math.random() * (this.effect.height - this.radius * 2)
  }
}

// ============  Canvas's frame and Particles fabric ========

class effect {
  constructor(canvas, context) {
    this.canvas = canvas
    this.context = context
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.particles = []
    this.numberOfParticles = 200
    this.createParticles()

    window.addEventListener('resize', (e) => {
      this.resize(e.target.window.innerWidth, e.target.window.innerHeight)
    })
  }
  createParticles() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new particle(this))
    }
  }
  handleParticles(context) {
    this.connectParticles(context)
    this.particles.forEach((particle) => {
      particle.draw(context)
      particle.update()
    })
  }

  // ======== connexion lineas for the particles ====

  connectParticles(context) {
    const maxDistance = 100
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        const dx = this.particles[a].x - this.particles[b].x
        const dy = this.particles[a].y - this.particles[b].y
        const distance = Math.hypot(dx, dy)
        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance
          context.globalAlpha = opacity
          context.beginPath()
          context.moveTo(this.particles[a].x, this.particles[a].y)
          context.lineTo(this.particles[b].x, this.particles[b].y)
          context.stroke()
          context.restore()
        }
      }
    }
  }
  resize(width, height) {
    this.canvas.width = width
    this.canvas.height = height
    this.width = width
    this.height = height
    this.context.fillStyle = 'black'
    this.context.strokeStyle = 'black'
    this.particles.forEach((particle) => {
      particle.reset()
    })
  }
}

const effect1 = new effect(canvas, ctx)

// Animation

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  effect1.handleParticles(ctx)
  requestAnimationFrame(animate)
}

animate()
