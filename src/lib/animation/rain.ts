/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

class RainSymbol {
  characters: string;

  x: number;

  y: number;

  fontSize: number;

  text: string;

  canvasHeight: number;

  constructor(x: number, y: number, fontSize: number, canvasHeight: number) {
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const ukranian = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
    const nums = '0123456789';
    // const emojis = '🌞🌝🌚🌑🌒🌓🌔🌕🌖🌗🌘🌙🌛🌜🌚🌙🌘🌗🌖🌕🌔🌓🌒🌑🌐🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜🌝🌞';
    this.characters = katakana + latin + nums + ukranian;
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = '';
    this.canvasHeight = canvasHeight;
    // this.canvasWidth = canvasHeight;

  }

  draw(context: CanvasRenderingContext2D): void {
    this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

class RainEffect {
  canvasWidth: number;

  canvasHeight: number;

  fontSize: number;

  columns: number;

  symbols: RainSymbol[];

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 30;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();

  }

  #initialize(): void {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new RainSymbol(i, 0, this.fontSize, this.canvasHeight);
    }

  }

  resize(width: number, height: number): void {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
  }

}

export function rain(isDark?: boolean): void {
  if (typeof window !== 'undefined') {
    const canvas = document.querySelector('[data-id="rain-canvas"]') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    const effect = new RainEffect(canvas.width, canvas.height);
    let lastTime = 0;
    const fps = 30;
    const nextFrame = 1000 / fps;
    let timer = 0;
    const gradient = ctx?.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient?.addColorStop(0, '#CA09F6');
    gradient?.addColorStop(0.5, '#0ff');
    gradient?.addColorStop(1, '#7c3aed');
    const fill = isDark ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';

    // eslint-disable-next-line no-inner-declarations
    function animate(timestamp: number): void {
      if (ctx !== null) {
        const deltaTime = timestamp - lastTime;

        lastTime = timestamp;
        if (timer > nextFrame) {
          // console.log(lastTime);
          ctx.fillStyle = fill;
          ctx.textAlign = 'center';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = gradient ?? '#000';
          ctx.font = `${effect.fontSize}px monospace`;
          // eslint-disable-next-line unicorn/no-array-for-each
          effect.symbols.forEach((symbol) => {
            symbol.draw(ctx);
          });
          timer = 0;
        } else {
          timer += deltaTime;
        }
      }
      requestAnimationFrame(animate);
      // console.log(ctx);

    }
    animate(0);

    window.addEventListener('resize', () => {
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
      effect.resize(canvas.width, canvas.height);
    });
  }
}