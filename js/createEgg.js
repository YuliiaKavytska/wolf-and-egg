// интервал создания яиц
function startPause(){
	timerEgg = setTimeout(function() {
		if(pause == 0) { // если нет паузы, то
			randomPozition();  //создаем яйцо
			if(speedEgg > 700){ // уменьшаем интервал между яицами
				speedEgg = speedEgg - 100;	
			}
			if(speedAnimal > 80){ // увеличиваем скорость анимации яиц
				speedAnimal = speedAnimal - 2;	
			}
		}
	}, speedEgg);	// временной интервал
}

//выбор позиции яйца и цвета
function randomPozition() {
	//yellow=1 green=2 red=3
	let color = random(2);
	switch(random(3)) {
		case 1: createBall(ballTopLeft, color);			//вверху слева 
		break;

		case 2: createBall(ballBottomLeft, color);		//внизу слева
		break;

		case 3: createBall(ballTopRight, color);		//вверху справа
		break;

		case 4: createBall(ballBottomRight, color);		//внизу справа
		break;

		default:
		break;
	}	
}

// случайное число до max
function random(max) {
	var rand = Math.random() * (max + 1); 
	rand = Math.floor(rand+1);	//округление до целого числа
	return rand;	//возврат случайного целого числа
}

// создаем яица
function createBall(pozEgg, colorEgg) {
	startPause();
	let isFall = 0;
	var ball = document.createElement("div");	// переменная для создания блока div
	ball.id = "egg";							// присваиваем id
	ball.className = pozEgg;					// добавляем тегу div => класс
	// назначаем цвет яйца - рандомный
	switch(colorEgg) {							
		case 1: 	//yellow
		ball.style.boxShadow = "inset 0px -20px 30px -15px rgb(253, 212, 30)";
		ball.style.border = "1px solid #f7a000";
		break;

		case 2: 	//green
		ball.style.boxShadow = "inset 0px -20px 30px -15px  rgb(50, 223, 15)";
		ball.style.border = "1px solid  rgb(50, 223, 15)";
		break;

		case 3: 	//red
		ball.style.boxShadow = "inset 0px -20px 30px -15px  rgb(223, 15, 15)";
		ball.style.border = "1px solid  rgb(223, 15, 15)";
		break;

		default:
		break;
	}
	game.appendChild(ball);						// добавляем елемент шарик в игровое поле
	var total = 0;								// переменная для угла вращения яйца
	//==============================
	// с помощью функции интервала создаем анимацию яиц и проверку условий
	timerBall = setInterval(function() {	// переменная интервала 
		// определяем по классу с какой стороны яйцо и меняем его позицию
		if (ball.className == "egg-left-top" || ball.className == "egg-left-bottom") {	// если слева, то
    		ball.style.top = ball.offsetTop + 3 + "px"; 				// сверху на 3px
    		ball.style.left = ball.offsetLeft + 10 + "px"; 				//слева на 10px
	        total += 45; 												// поворот вправо
	        ball.style.transform = "rotate(" + total + "deg)"; 			// применяем к стилю поворот яйца
	   }else{													// если справа, то
	        ball.style.top = ball.offsetTop + 3 + "px"; 				// сверху на 3px
	        ball.style.left = ball.offsetLeft - 10 + "px"; 				//слева на 10px
	        total -= 45; 												// поворот влево
	        ball.style.transform = "rotate(" + total + "deg)"; 			// применяем к стилю поворот яйца
		}
		// проверяем дошло ли яйцо до края
		if ((ball.offsetLeft >= pxLeft && ball.offsetLeft <= pxLeft + 10) 
			|| (ball.offsetLeft >= pxRight && ball.offsetLeft <= pxRight + 10)) {
				// проверяем есть ли в это месте корзинка
			if ((wolf.className == "wolf-left-top" && ball.className == "egg-left-top")
				|| (wolf.className == "wolf-left-bottom" && ball.className == "egg-left-bottom")
				|| (wolf.className == "wolf-right-top" && ball.className == "egg-right-top")
				|| (wolf.className == "wolf-right-bottom" && ball.className == "egg-right-bottom")) {
					music.play();	// при ловле яйца, воспроизводим звук
					music.volume = 0.7;	// громкость этого звука, половина
					switch(colorEgg) {							// назначаем цвет яйца - рандомный
						case 1: 	//yellow
						gameScore++;	// прибавляем очки
						score.innerText = gameScore;	// выводим на экран
						scoreLifes();	// тут увеличиваем жизни
						break;

						case 2: 	//green
						time.innerText = +time.innerText + 5; // прибавляем 5 секунд
						break;

						case 3: 	//red
						quantityLifes--; // удаляем 1 жизнь
						deleteLifes();	// функция удаления блока жизней
						createLifes();	// функция создания блока жизней
						break;

						default:
						break;
					}
				ball.remove();	//удаляем яйцо
			}else {	// если нет корзинки возле яйца, то убираем одну жизнь
				//======
				//если яйцо не ожидает удаления, то удаляем жизнь при его падении только 1 раз
				if(isFall != 1 && colorEgg != 3){ 
					quantityLifes--;
				}
				isFall = 1; // яйцо ожидает удаления
				//======
				fall(ball);
				
		}	// после того как яйцо дошло до края - удаляем его
			//=====================
		}
	}, speedAnimal);	// переменная времени интервала
}

// функция падаения
function fall(egg){
	// задаем интервал для падения
	var t = setInterval(() => {
		egg.style.top = egg.offsetTop + 3 + "px"; // добавляем 3 каждые 5 милисек
		egg.style.left = egg.offsetLeft; // останавливаем увеличение левой стороны
		if(egg.offsetTop >= 500){ // если яйцо достигло 500 пискселей от верха
			clearInterval(t); //очищаем интервал
			egg.remove(); //удаляем яйцо
			deleteLifes();	// функция удаления блока жизней
			createLifes();	// функция создания блока жизней
			//если яйцо с левой стороны, то 
			if(egg.className == "egg-left-top" || egg.className == "egg-left-bottom"){ 
				crashEgg("broken-egg-left"); //вызываем цыпленка для левой стороны
			}else{
				crashEgg("broken-egg-right"); // если справа то правого цыпленка
			}		
		}
	}, 3);
}

// функци анимации когда цыпленок убегает
function crashEgg(side) {
	let step = 0;									// переменная для эффекта прыжка цыпленка
	sound.play();	// при ловле яйца, воспроизводим звук
	sound.volume = 0.3;	// громкость этого звука, половина
	var broken = document.createElement("div"); 	//создаем блок div
	broken.className = side;						// присваиваем класс
	game.appendChild(broken);						//добавляем елемент цыпленок в игровое поле
	//=====================
	// с помощью функции интервала создаем анимацию убегания цыпленка
	var timerBroken = setInterval(function() {
		if(quantityLifes == 0){
			broken.remove();								// удаляем элеммент цыпленка
		}
		if(step == 1){		
			broken.style.top = broken.offsetTop + 2 + "px"; //ввех на 2px
			step = 2;
		}else{
			broken.style.top = broken.offsetTop - 2 + "px"; //вниз на 2px
			step = 1;
		}	
		if(broken.className == "broken-egg-left"){ 				// если цыпленок слева, 
			if (broken.offsetLeft > -41){							// бежит за границу левого поля игры
				broken.style.left = broken.offsetLeft - 8 + "px";	// шаг 8px	
			}else{
        		clearInterval(timerBroken);							// очищаем таймер создания яиц
        		broken.remove();									// удаляем элеммент цыпленка
			}
      }else{														// если цыпленок слева, 
        	if(broken.offsetLeft < 1000){							// бежит за границу правого поля игры
				broken.style.left = broken.offsetLeft + 8 + "px";	// шаг 8px
			}else{
        		clearInterval(timerBroken);							// очищаем таймер создания яиц
        		broken.remove();									// удаляем элеммент цыпленка
			}
		}
	}, 70)
}

// функция анимация добавления жизни
function addLifes() {
	var chicken = document.createElement("div"); 	//создаем блок div
	chicken.id = "chicken";							// присваиваем id
	game.appendChild(chicken);						//добавляем елемент цыпленка для жизни в игровое поле
	//=====================
	// с помощью функции интервала создаем анимацию добавления жизни
	var timerChicken = setInterval(function() {		// переменная интервала
		// двигаем вправо и уменьшаем картинку
		if(chicken.offsetLeft < 935){				
			chicken.style.left = chicken.offsetLeft + 8 + "px"; 	// вправо на 8px	
			chicken.style.width = chicken.offsetWidth - 1 + "px";	// уменьшаем ширину
			chicken.style.height = chicken.offsetHeight - 1 + "px";	// уменьшаем высоту
		}
		else{
			// когда дошли до правого края - поднимаем вверх
			if(chicken.offsetTop > 15){
				chicken.style.top = chicken.offsetTop - 2 + "px"; // сверху на 3px
			}else{
				deleteLifes();		// функция удаления блока жизней
				createLifes();		// функция создания блока жизней
				clearInterval(timerChicken);	// очищаем таймер создания яиц
				chicken.remove();				// удаляем блок с цыпленком для жизни
			}
		} 
	}, 10)	// временной интервал 
}

// каждые 20 очков прибавляем жизнь и при 50 замедляем скорость
function scoreLifes() {
	if(gameScore % 20 == 0 && gameScore != 0){	// если досчитали до 20, то:
		quantityLifes++;	// прибавляем жизнь
		addLifes();			// функция анимация добавления жизни 	
	}else if(gameScore % 50 == 0 && gameScore != 0){ //если счет кратный 50
		// замедляем скорость появления яиц с помощью временного интервала
		speedAnimal = 200;	// переменная времени в мсек. интервала для функции анимации яиц
		speedEgg = 1500;	// переменная интервала для создания яиц
	}
}

function checkMaxScore(){
	if(gameScore > maxScore){
		maxScore = gameScore;
	}
}