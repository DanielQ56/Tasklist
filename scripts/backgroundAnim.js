//taken from the youtuber Franks Laboratory in his video Particles JS effect with Pure Vanilla Javascript
window.addEventListener('resize', ResizeWindow);

const main = document.getElementById("main");
const canvas = document.getElementById("canvas1");
const content = document.getElementById("content");
const static = document.getElementById("static");

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var anim;
var timeOutID = 0;
var currBg = 0;
var AllParticleFunctions;

var isStatic = false;

var particleDivisor = 9000;

let particlesArray;

function ResizeWindow() 
{
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}


static.addEventListener("click", 
	function() {
		if(isStatic)
		{
			animate();
			if(currBg == 2)
			{
				for(var i = 0; i < particlesArray.length; ++i)
				{
					particlesArray[i].ResumeSparks();
				}
			}
			isStatic = false;
			this.value = "Static";
		}
		else
		{
			cancelAnimationFrame(anim);
			if(currBg == 2)
			{
				for(var i = 0; i < particlesArray.length; ++i)
				{
					particlesArray[i].StopSparks();
				}
			}
			isStatic = true;
			this.value = "Animate";
		}
	});

document.getElementById("switch").addEventListener("click",
	function() {
		cancelAnimationFrame(anim);
		clearTimeout(timeOutID);


		isStatic = false;
		static.value = "Static";

		currBg = (++currBg) % AllParticleFunctions.length;
		storage.setItem("currentBg", currBg);
		AllParticleFunctions[currBg]();
	})




/*  Init functions */

function BouncyBubblesInit() {
	particlesArray = [];
	canvas.style.background = "radial-gradient(#B7E9F7, #7AD7F0)";
	content.style.background = "rgba(99, 209, 244,1)";
	main.classList.remove("dark");
	ctx.globalAlpha = 1.0;
	let numberOfParticles = (canvas.height * canvas.width) / particleDivisor;
	let max = 50;
	let min = 10;
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

	animate();
}


function SnowflakesInit() {
	particlesArray = [];
	let numberOfParticles = (canvas.height * canvas.width) / particleDivisor;
	let s1 = 10;
	let s2 = 7;
	let s3 = 4;

	canvas.style.background = "#696969";
	content.style.background = "rgba(239, 231, 219,1)";
	main.classList.remove("dark");

	for (var i = 0; i < numberOfParticles; ++i)
	{
		var size, x, y, directionX, directionY, color, opacity;

		if(i < Math.floor(numberOfParticles / 3))
		{
			size = s1;
			x = Math.random() * innerWidth;
			y = Math.random() * innerHeight;
			directionX = (Math.random()) * (Math.random() < 0.5 ? 1 : -1);
			directionY = (Math.random() * 1.5 + 1);
			opacity = 1.0;
		}
		else if(i < 2 * Math.floor(numberOfParticles / 3))
		{
			size = s2;
			x = Math.random() * innerWidth;
			y = Math.random() * innerHeight;
			directionX = (Math.random()) * (Math.random() < 0.5 ? 1 : -1);
			directionY = (Math.random() * 1 + 0.5);
			opacity = 0.7;
		}
		else
		{
			size = s3;
			x = Math.random() * innerWidth;
			y = Math.random() * innerHeight;
			directionX = (Math.random()) * (Math.random() < 0.5 ? 1 : -1);
			directionY = 0.5;
			opacity = 0.4;
		}
		color = "#FFFFFF"


		particlesArray.push(new Snowflake(x, y, directionX, directionY, size, color, opacity));
	}


	animate();
}

function FireworksInit()
{
	particlesArray = [];
	let numberOfParticles = (canvas.height * canvas.width) / particleDivisor;

	canvas.style.background = "#000000";
	content.style.background = "rgba(96, 96, 96, 0.9)";
	main.classList.add("dark");

	FireOffFireworks(0,numberOfParticles / 5);
	animate();
}

function FireOffFireworks(index, particles)
{
	timeOutID = setTimeout(function() {
		if(index < particles)
		{
			var size = (Math.random() * 3) + 4

			var bit = Math.random();

			if(bit < 0.45)
			{
				var angle = Math.random()*(5 * Math.PI / 6 - 2 * Math.PI / 3) + (2 * Math.PI / 3);
			}
			else if(bit < 0.9)
			{
				var angle = Math.random()*(Math.PI / 3 -  Math.PI / 6) + (Math.PI / 6);				
			}
			else
			{
				var angle = Math.random()*(Math.PI / 3) + (Math.PI / 3);
			}

			var x = Math.random() * (canvas.width / 3) + canvas.width / 3;
			var y = canvas.height;

			directionX = Math.cos(angle);
			directionY = -1 * Math.sin(angle) * (Math.random() * 2 + 1);
			var color = '#'+Math.floor(Math.random()*16777215).toString(16);

			particlesArray.push(new Firework(x, y, directionX, directionY, size, color, Math.random() * canvas.height / 3 + canvas.height / 3));

			FireOffFireworks(++index, particles);
		}
	}, Math.random() * 500 + 500);
}

/*Animate functions*/

function animate() {
	anim = requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);
	for(var i = 0; i < particlesArray.length; ++i)
	{
		particlesArray[i].update();
	}
}


function Main() {
	AllParticleFunctions = [BouncyBubblesInit, SnowflakesInit, FireworksInit];
	currBg = (storage.getItem("currentBg") == null ? 0 : storage.getItem("currentBg"));
	AllParticleFunctions[currBg]();
}



Main();
