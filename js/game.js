var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "img/background.png";

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};

var local_yoshi = localStorage.getItem("yoshi");

if (local_yoshi) {
	heroImage.src = "img/" + local_yoshi;
} else {
	heroImage.src = "img/greenyoshi.png";
}

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "img/yoshi_egg.png";

var hero = {
	speed: 256
};
var monster = {};
var monstersCaught = 0;

var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	monster.x = 10 + (Math.random() * (canvas.width - 68));
	monster.y = 10 + (Math.random() * (canvas.height - 80));
};

var update = function (modifier) {
	if (38 in keysDown) {
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) {
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) {
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) {
		hero.x += hero.speed * modifier;
	}

	if (
		hero.x <= (monster.x + 72)
		&& monster.x <= (hero.x + 80)
		&& hero.y <= (monster.y + 72)
		&& monster.y <= (hero.y + 80)
	) {
		++monstersCaught;
		console.log(monster.x)
		console.log(monster.y)
		console.log(hero.x)
		console.log(hero.y)

		reset();
		document.getElementById('audioplay').play();
	}
};

var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Comic Sans";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Eggs Collected: " + monstersCaught, 32, 32);
};

var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();

function changeImg(src) {
	localStorage.setItem('yoshi',src);
	location.reload(true);
}
