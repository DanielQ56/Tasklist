//taken from the youtuber Franks Laboratory in his video Particles JS effect with Pure Vanilla Javascript
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var body = document.querySelector("body");

var anim;

var isStatic = false;
var AnimatedBackground = true;

document.getElementById("static").addEventListener("click", 
	function() {
		if(AnimatedBackground)
		{
			if(isStatic)
			{
				animate();
				isStatic = false;
				this.value = "Static";
			}
			else
			{
				cancelAnimationFrame(anim);
				isStatic = true;
				this.value = "Animate";
			}
		}
		else
		{
			init();
			isStatic = false;
			this.value = "Static";
			AnimatedBackground = true;
			animate();
		}
	});

document.getElementById("switch").addEventListener("click",
	function() {
		StaticInit();
		AnimatedBackground = false;
		cancelAnimationFrame(anim);
	})

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
	let numberOfParticles = (canvas.height * canvas.width) / particleDivisor;
	for (var i = 0; i < numberOfParticles; ++i)
	{
		var size = (Math.random() * (max - min)) + min;
		var x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
		var y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
		directionX = (Math.random() * 3) - 1.5;
		directionY = (Math.random() * 3) - 1.5;
		var color = '#'+Math.floor(Math.random()*16777215).toString(16);

		particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
	}
}

function animate() {
	anim = requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);
	for(var i = 0; i < particlesArray.length; ++i)
	{
		particlesArray[i].update();
	}
}


function StaticInit() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	particlesArray = [];
	numberOfParticles = (canvas.height * canvas.width) / (particleDivisor/2);
	for(var i = 0; i < numberOfParticles; ++i)
	{
		var size = (Math.random() * (max * 2 - (max))) + (max);
		var x = (Math.random() * innerWidth);
		var y = (Math.random() * innerHeight);

		var color = '#'+Math.floor(Math.random()*16777215).toString(16);

		particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
	}
	for(var i = 0; i < particlesArray.length; ++i)
	{
		particlesArray[i].update();
	}
}

function ResizeWindow() 
{
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}


window.addEventListener('resize', ResizeWindow);

init();
animate();
