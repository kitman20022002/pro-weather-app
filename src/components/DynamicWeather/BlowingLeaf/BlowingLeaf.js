/*
|
| Blowing leaf particle
|
*/
import randomRange from '../Utility';

class BlowingLeaf {
  constructor(canvas, context, imageAssets, windSpeed) {
    this.canvas = canvas;
    this.context = context;
    this.imageAssets = imageAssets;

    this.type = 'blowing_leaf';
    this.width = randomRange(10, 20);
    this.height = this.width * 2.24;

    this.xVelocity = (windSpeed - randomRange(0, 20)) / 6;
    this.yVelocity = this.xVelocity / 6;

    this.rotation = Math.random() * 1;
    this.rotationVelocity = randomRange(-0.06, 0.06, false);

    if (this.xVelocity > 0) {
      // >>>
      this.x = randomRange(-50, -100);
    } else {
      // <<<
      this.x = randomRange(canvas.width, canvas.width + 100);
    }

    this.gravity = randomRange(-0.06, 0.06, false);
    this.y = randomRange(canvas.height - canvas.height / 4, canvas.height);
    this.yDirectionChangeLength = randomRange(20, 100);
    this.yDirectionTravelled = 0;
  }

  draw = function () {
    // save context
    this.context.save();

    // move x and y
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    // sway
    this.yVelocity = this.yVelocity + this.gravity + -0.01;

    this.yDirectionTravelled++;
    if (this.yDirectionTravelled > this.yDirectionChangeLength) {
      this.yDirectionTravelled = 0;
      this.gravity *= -1;
      this.yDirectionChangeLength = randomRange(20, 100);
    }

    // increment rotation
    this.rotation += this.rotationVelocity;

    // translate context
    const xOffset = this.width / 2;
    const yOffset = this.height / 2;

    this.context.translate(this.x + xOffset, this.y + yOffset);
    this.context.rotate(this.rotation);
    this.context.drawImage(
      this.imageAssets.leaf.image,
      0,
      0,
      100,
      224,
      0 - xOffset,
      0 - yOffset,
      this.width,
      this.height,
    );

    // restore context
    this.context.restore();

    if (this.xVelocity > 0) {
      // >>>
      if (this.x > this.canvas.width) {
        return false;
      }
    } else {
      // <<<
      if (this.x < -50) {
        return false;
      }
    }
    return true;
  };
}

export default BlowingLeaf;
