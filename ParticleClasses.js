class Particle {
	constructor(x, y, directionX, directionY, size, color) {
		this.x = x;
		this.y = y;
		this.directionX = directionX;
		this.directionY = directionY;
		this.size = size;
		this.color = color;
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
	}

	update() {
		if(this.x > canvas.width || this.x < 0) {
			this.directionX = -this.directionX;
		}
		if(this.y > canvas.height || this.y < 0) {
			this.directionY = -this.directionY;
		}

		this.x += this.directionX;
		this.y += this.directionY;
		this.draw();
	}
}


class Snowflake extends Particle {
	constructor(x, y, directionX, directionY, size, color, opac)
	{
		super(x, y, directionX, directionY, size, color);
		this.opac = opac;
	}

	update() {
		if(this.y > canvas.height)
		{
			this.y = 0;
		}
		if(this.x > canvas.width)
		{
			this.x = 0;
		}
		else if(this.x < 0)
		{
			this.x = canvas.width;
		}

		this.x += this.directionX;
		this.y += this.directionY;

		ctx.globalAlpha = this.opac;
		this.draw();
	}
}

class Firework extends Particle {
	constructor(x, y, directionX, directionY, size, color, targHeight)
	{
		super(x, y, directionX, directionY, size, color);
		this.targHeight = targHeight;
		this.sparks = [];
		this.animation = null;
		this.timerID;
		this.pause = false;
	}

	draw() {
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		ctx.lineWidth = this.size;
		ctx.moveTo(this.x - this.directionX * 100, this.y - this.directionY * 100);
		ctx.lineTo(this.x, this.y);
		ctx.stroke();
	}

	update() {
		if(this.y < this.targHeight)
		{
			this.SparkOutwards();

			this.x = Math.random() * (canvas.width / 3) + canvas.width / 3;
			this.y = canvas.height;
		}
		this.x += this.directionX;
		this.y += this.directionY;

		this.draw();
	}

	SparkOutwards() {
		var numSparks = Math.random() * 20 + 30;

		this.sparks = [];

		for(var i = 0; i < Math.floor(numSparks); ++i)
		{
			this.sparks.push(new FireworkSparks(this.x, this.y, (Math.random() * 1 + 0.1) * (Math.random() < 0.5 ? 1 : -1), (Math.random() * 1 + 0.1) * (Math.random() < 0.5 ? 1 : -1)  , Math.random() * 4 + 2, this.color))
		}

		if(this.pause)
		{
			return;
		}

		this.SparksFalling();
		this.SparkTimer();

	}

	SparksFalling() {
		this.animation = requestAnimationFrame(()=>this.SparksFalling());

		if(this.pause)
		{
			cancelAnimationFrame(this.animation);
		}

		for(var i = 0; i < this.sparks.length; ++i)
		{
			this.sparks[i].update();
		}

	}

	StopSparks() {
		clearTimeout(this.timerID);
		cancelAnimationFrame(this.animation);
		this.pause = true;
	}

	ResumeSparks() {
		this.SparksFalling();
		this.SparkTimer();
		this.pause = false;
	}

	SparkTimer() {
		this.timerID = setTimeout( () => {
			cancelAnimationFrame(this.animation);
		}, Math.random() * 1000 + 1000);
	}


}

class FireworkSparks extends Particle {
	constructor(x, y, directionX, directionY, size, color)
	{
		super(x, y, directionX, directionY, size, color);
	}
	update() {
		this.x += this.directionX;
		this.y += this.directionY;
		this.draw();
	}
}
