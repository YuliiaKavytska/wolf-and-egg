var speedEgg = 200;
var ballTopLeft = "egg-left-top";
var ballBottomLeft = "egg-left-bottom";
var ballTopRight = "egg-right-top";
var ballBottomRight = "egg-right-bottom";
var timerBall = null;
var pxLeft = 410;
var pxRight = 550;
var pxLeftCreate = 400;
var pxRightCreate = 570;
var music = new Audio('audio/click.mp3');
var countEgg = 1;

// случайное число до max
function random(max) {
	var rand = Math.random() * (max + 1); 
  rand = Math.floor(rand+1);	//округление до целого числа
  return rand;	//возврат случайного целого числа
}

//поворот яйца вправо
function randomPozition() {
	var napravlenie = random(3);
	if (napravlenie == 1) {				//если 1, то 
		createBall(ballTopLeft);	//вверху слева
	}
	if (napravlenie == 2) {				//если 2, то
		createBall(ballBottomLeft);	//внизу слева
	}
	if (napravlenie == 3) {				//если 3, то
		createBall(ballTopRight);	//вверху справа
	}
	if (napravlenie == 4) {				//если 1, то
		createBall(ballBottomRight);	//внизу справа
	}	
}


/*
<div id="egg" class= соответственно месту появления >
классы: 
		"egg-left-top";
		"egg-left-bottom";
		"egg-right-top";
		"egg-right-bottom";
</div>
*/
// создаем шарики
function createBall(poz) {
	var isFall = 0;
	if(quantityLifes>0) {
		var ball = document.createElement("div"); //создаем блок div
		ball.id = "egg";	// присваиваем id
		ball.className = poz;	//добавляем тегу div => класс
		game.appendChild(ball);//добавляем елемент шарик в игровое поле
		var total = 0;
		timerBall = setInterval(function() {
			
			if (ball.className == "egg-left-top" || ball.className == "egg-left-bottom") {
        		ball.style.top = ball.offsetTop + 3 + "px"; // сверху на 3px
        		ball.style.left = ball.offsetLeft + 10 + "px"; //слева на 10px
		        total += 45; // поворот вправо
		        ball.style.transform = "rotate(" + total + "deg)"; // применяем к стилю поворот яйца
		    } else {
		        ball.style.top = ball.offsetTop + 3 + "px"; // сверху на 3px
		        ball.style.left = ball.offsetLeft - 10 + "px"; //слева на 10px
		        total -= 45; // поворот влево
		        ball.style.transform = "rotate(" + total + "deg)"; // применяем к стилю поворот яйца
		    }

			//==========================
			// для создания следующего яйца делаем проверку, чтобы с одной стороны не было больше 1 яйца
			if((ball.offsetLeft >= pxLeftCreate && ball.offsetLeft <= pxLeftCreate+6) 
				|| (ball.offsetLeft <= pxRightCreate && ball.offsetLeft >= pxRightCreate-6)) {	
					randomPozition();	//создаем шарик
			}
			// проверяем дошло ли яйцо до края
			if((ball.offsetLeft >= pxLeft && ball.offsetLeft <= pxLeft+10) 
				|| (ball.offsetLeft >= pxRight && ball.offsetLeft <= pxRight+10)) {
				// проверяем есть ли в это месте корзинка
			if((wolf.className == "wolf-left-top" && ball.className == "egg-left-top")
				|| (wolf.className == "wolf-left-bottom" && ball.className == "egg-left-bottom")
				|| (wolf.className == "wolf-right-top" && ball.className == "egg-right-top")
				|| (wolf.className == "wolf-right-bottom" && ball.className == "egg-right-bottom")) {
					gameScore++;	// если есть, то прибавляем очки
				score.innerText = gameScore;	// выводим на экран
				// при ловле яйца, воспроизводим звук
				music.play();
				// громкость этого звука, половина
				music.volume = 0.5;
				scoreLifes();	// тут увеличиваем жизни
				ball.remove();	//удаляем шарик
			}
			else {	// если нет, то убираем одну жизнь
				fall(ball);
				if(isFall != 1){
					quantityLifes -= 1;
				}
				isFall = 1;
				deleteLifes();
				createLifes();
				if (quantityLifes == 0){ // если жизни закончились, то
					clearInterval(timerBall);	// очищаем таймер создания яиц
					gameEnd();	// запуск коцна игры
				}
			}
				speedGame();	//меняем скорость
				//=====================
			}
		}, speedEgg);
	}
}

function addLifes() {
	var chicken = document.createElement("div"); //создаем блок div
	chicken.id = "chicken";	// присваиваем id
	// chicken.className = poz;	//добавляем тегу div => класс
	game.appendChild(chicken);//добавляем елемент шарик в игровое поле
	var timerChicken = setInterval(function() {
		if (chicken.offsetLeft < 935){
			chicken.style.left = chicken.offsetLeft + 8 + "px"; //слева на 10px	
			chicken.style.width = chicken.offsetWidth - 1 + "px";
			chicken.style.height = chicken.offsetHeight - 1 + "px";
		}
		else{
			if (chicken.offsetTop > 15) {
				chicken.style.top = chicken.offsetTop - 2 + "px"; // сверху на 3px
			}
			else {
				clearInterval(timerChicken);	// очищаем таймер создания яиц
				chicken.remove();
			}
		} 
	}, 10)
}

// функция падаения
function fall(egg){
	var t = setInterval(() => {
		egg.style.top = egg.offsetTop + 3 + "px"; // сверху на 3px
		if(egg.offsetTop >= 500){
			clearInterval(t);
			egg.remove();
			if(egg.className == "egg-left-top" || egg.className == "egg-left-bottom"){
				crashEgg("broken-egg-left");
			}else{
				crashEgg("broken-egg-right");
			}		
		}
	}, 10);
}

function crashEgg(side) {
	let step = 0;
	var broken = document.createElement("div"); //создаем блок div
	broken.className = side;	// присваиваем класс
	game.appendChild(broken);//добавляем елемент шарик в игровое поле
	var timerBroken = setInterval(function() {
		if (step == 1) {
			broken.style.top = broken.offsetTop + 2 + "px"; //слева на 10px
			step = 2;
		}
		else {
			broken.style.top = broken.offsetTop - 2 + "px"; //слева на 10px
			step = 1;
		}	
		if (broken.className == "broken-egg-left") {
			if (broken.offsetLeft > -41){
				broken.style.left = broken.offsetLeft - 8 + "px"; //слева на 10px	
			}
			else {
        		clearInterval(timerBroken);	// очищаем таймер создания яиц
        		broken.remove();
        	}
        }
        else {
        	if (broken.offsetLeft < 1000){
				broken.style.left = broken.offsetLeft + 8 + "px"; //слева на 10px
			}
			else {
        		clearInterval(timerBroken);	// очищаем таймер создания яиц
        		broken.remove();
        	}
        }

    }, 70)
}
// каждые 50 очков прибавляем жизнь и замедляем
function scoreLifes() {
	if(countEgg >= 1) {
		countEgg = 1;	
		quantityLifes++;
		addLifes();
		setTimeout(function() {
			deleteLifes();
			createLifes();		
		}, 750)
		speedEgg = 200;
	}
	else {
		countEgg++;
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}




// для создания нового яйца меняем растояние между ними
// и уменьшаем таймер между созданием яиц
function speedGame() {
	if (pxLeftCreate>270){
		pxLeftCreate = pxLeftCreate - 5;
	}
	else {
		if (speedEgg>80) {
			speedEgg = speedEgg - 2;	
		}
	}
	if (pxRightCreate<700){
		pxRightCreate = pxRightCreate + 5;
	}
	else {
		if (speedEgg>80) {
			speedEgg = speedEgg - 2;	
		}
	}	
}