/* eslint-disable @typescript-eslint/explicit-member-accessibility */

export function starfield(): void {
  const COUNT = 800;
  const SPEED = 0.1;

  type IStar = {
    x: number;
    y: number;
    z: number;
    xPrev: number;
    yPrev: number;
  }
  class Star {
    x: number;

    y: number;

    z: number;

    xPrev: number;

    yPrev: number;

    constructor(x: number, y: number, z: number) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.xPrev = x;
      this.yPrev = y;
    }

    update(width: number, height: number, speed: number): void {
      this.xPrev = this.x;
      this.yPrev = this.y;
      this.z += speed * 0.0675;
      this.x += this.x * (speed * 0.0225) * this.z;
      this.y += this.y * (speed * 0.0225) * this.z;
      if (
        this.x > width / 2 ||
        this.x < -width / 2 ||
        this.y > height / 2 ||
        this.y < -height / 2
      ) {
        this.x = Math.random() * width - width / 2;
        this.y = Math.random() * height - height / 2;
        this.xPrev = this.x;
        this.yPrev = this.y;
        this.z = 0;
      }
    }

    draw(context: CanvasRenderingContext2D): void {
      context.lineWidth = this.z;
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineTo(this.xPrev, this.yPrev);
      context.stroke();
    }
  }

  const stars = Array.from({ length: COUNT }, () => new Star(0, 0, 0));
  let rafId: number;

  const canvas = document.querySelector("#starfield-canvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d");

  const container = document.querySelector("#starfield");
  if (container === null) return

  function frame(): void {
    if (container === null) return
    if (context === null) return
    const { clientWidth: width, clientHeight: height } = container;

    for (const star of stars) {
      star.update(width, height, SPEED);
      star.draw(context);
    }

    context.fillRect(-width / 2, -height / 2, width, height);
    rafId = requestAnimationFrame(frame);
  }

  function setup(): void {
    if (container === null) return
    if (context === null) return
    if (rafId) cancelAnimationFrame(rafId);
    const { clientWidth: width, clientHeight: height } = container;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.scale(dpr, dpr);

    for (const star of stars) {
      star.x = Math.random() * width - width / 2;
      star.y = Math.random() * height - height / 2;
      star.z = 0;
    }

    context.translate(width / 2, height / 2);
    context.fillStyle = "rgba(0, 0, 0, 0.4)";
    context.strokeStyle = "white";
    rafId = requestAnimationFrame(frame);
  }
  const resizeObserver = new ResizeObserver(setup);
  resizeObserver.observe(container);
}