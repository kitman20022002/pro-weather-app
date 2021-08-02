import randomRange from '../Utility';

class Lightning {
  constructor(canvas, context) {
    this.type = 'lightning';
    this.x = randomRange(0, canvas.width);
    this.age = 0;
    this.life = 20;
    this.drawFrom = 0;
    this.drawTo = 0;
    this.canvas = canvas;
    this.context = context;
    this.points = [[this.x, 0]];
    this.totalPoints = 0;
    this.opacity = 0.7;

    this.flashed = false;
    this.flashOpacity = 0;

    let nextPointX = 0;
    let nextPointY = 0;
    while (nextPointY < canvas.height) {
      const lastPoint = this.points[this.points.length - 1];
      nextPointX =
        lastPoint[0] > this.x ? randomRange(this.x, this.x + 35) : randomRange(this.x + 35, this.x);
      nextPointY = lastPoint[1] + randomRange(10, 50);

      if (nextPointY > canvas.height) {
        nextPointY = canvas.height;
      }

      this.totalPoints++;
      this.points.push([nextPointX, nextPointY]);
    }
  }

  draw = function () {
    if (this.drawTo < this.points.length) {
      this.drawTo += 2;
      if (this.drawTo > this.points.length) {
        this.drawTo = this.points.length;
      }
    } else {
      this.opacity -= 0.02;

      if (!this.flashed) {
        this.flashed = true;
        this.flashOpacity = 1;
      }
    }

    if (this.opacity < 0) {
      return false;
    }

    if (this.flashOpacity > 0) {
      this.context.fillStyle = `rgba(255, 255, 255, ${this.flashOpacity})`;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.flashOpacity -= 0.1;
    }

    this.context.beginPath();
    this.context.moveTo(this.points[this.drawFrom][0], this.points[this.drawFrom][1]);

    for (let i = this.drawFrom; i < this.drawTo; i++) {
      this.context.lineTo(this.points[i][0], this.points[i][1]);
    }

    this.context.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
    this.context.lineWidth = 3;
    this.context.stroke();

    return true;
  };
}

export default Lightning;
