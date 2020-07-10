//taken from the youtuber Franks Laboratory in his video Particles JS effect with Pure Vanilla Javascript
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var max = 50;
var min = 5;
var particleDivisor = 9000;

let particlesArray;

let mouse = {
	x: null,
	y: null, 
	radius: (canvas.height/80) * (canvas.width/80)
}

window.addEventListener('mousemove', function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
});

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

function init() {
	particlesArray = [];
	let numberOfParticles = (canvas.height * canvas.width) / 11000;
	for (var i = 0; i < numberOfParticles; ++i)
	{
		var size = (Math.random() * (max - min)) + min;
		var x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
		var y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
		directionX = (Math.random() * 3) - 1.5;
		directionY = (Math.random() * 3) - 1.5;
		var color = '#'+Math.floor(Math.random()*16777215).toString(16);

		console.log(color);

		particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
	}
}

function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);
	for(var i = 0; i < particlesArray.length; ++i)
	{
		particlesArray[i].update();
	}
}

init();
animate();
