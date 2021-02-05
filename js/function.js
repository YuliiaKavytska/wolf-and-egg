// Это файл для вызова всех функций проекта, они должены идти сразу же после оглашения переменных

// /* =======================================
// Функции для создания игры
// =======================================*/

//Функция создания стартового блока игры:
function createStartGameBlock(){
	// Создаем элемент див (это стартовый блок)
	startBlock = document.createElement("div");
	// Присваеваем ему айди старт
	startBlock.id = "start";
	// Создаем кнопку для старта
	startBtn = document.createElement("button");
	// Присваеваем этой кнопке айди
	startBtn.id = "start-btn";
	// Добавляем текст внутрь кнопки
	startBtn.innerHTML = "Н<span>а</span><span>ч</span><span>а</span><span>т</span><span>ь</span><span>!</span>";
	// Добаляем кнопку внутрь стартового блока
	startBlock.appendChild(startBtn);
	// Добавляем заставку старта в нашу игру
	game.appendChild(startBlock);
}

// Функция для создания блока с правилами
function createRules(){
	// В документе создаем блок див.
	// Используем локальные переменные так как в других функциях эти значения мы использовать не будем
	var rules = document.createElement("div");
	// Присваевам этому диву класс rules
	rules.className = "rules";
	// добавляем этот элемент к нашему полю игры
	game.appendChild(rules);
	// Создаем ссылку на которую мы будем нажимать для открытия правил
	var openRule = document.createElement("a");
	// помещаем внутрь текст и
	openRule.innerText = "i";
	// присваеваем этому элементу ссылку на айди блока с правилами
	openRule.href = "#info";
	// добавляем в наш блок правил нашу ссылку (кнопку)
	rules.appendChild(openRule);
	// создаем внутренний блок который будет содержвать правила
	var information = document.createElement("div");
	// присваеваем ему айди, этот айди должен равняться нашей ссылку
	information.id = "info";
	// добавляем класс для стилизации этого блока
	information.className = "info-body";
	// добавляем этот блок в общий блок правил
	rules.appendChild(information);
	// создаем кнопку (ссылку) для закрытия нашего окошка с правилами
	var closeRule = document.createElement("a");
	// пишем внутри Х, для крестика закрытия
	closeRule.innerText = "X";
	// присваиваем ссылку чтобы это окошко пропадало при нажатии
	closeRule.href = "#";
	// добавляем крестику класс для стилизации
	closeRule.className = "close-rules";
	// добавляем этот крестик в наш блок с правилами
	information.appendChild(closeRule);
	// создаем пправила игры 1-3
	var par1 = document.createElement("p");
	// добавляем каждое правила в блк правил
	par1.innerText = "Волк должен ловить яица.";
	information.appendChild(par1);
	var par3 = document.createElement("p");
	par3.innerText = "Каждые 20 очков прибавляется 1 жизнь, а каждые 50 уменьшается скорость.";
	information.appendChild(par3);
	var par4 = document.createElement("p");
	par3.innerText = "Желтые яица прибавляют 1 очко, зеленые - прибавляет 5 секунд к таймеру, красные - отнимают 1 жизнь.";
	information.appendChild(par3);
	var par5 = document.createElement("p");
	par5.innerText = "Игра заканчивается если уронить 3 яйца или по окончанию таймера.";
	information.appendChild(par5);
	var par6 = document.createElement("p");
	par6.innerText = "Пробел - это ПАУЗА. На паузе дособерите яица.";
	information.appendChild(par6);
}

// функиця для создания блока включения и выключения звука
function createSoundBlock(){
	// создаем блок для звука
	soundBtn = document.createElement("div");
	// при создании блока, проверяем выключил ли пользватель звук
	if(varSoung == "on"){
		// если звук не выключен, стили включеного звка
		soundBtn.style.background = "url('img/sound.svg') center/ 70% no-repeat";
	}else{
		// если пользователь отключил звук ранее, добаляем стили выключеного звука
		soundBtn.style.background = "url('img/sound.svg') center/ 70% no-repeat, red";
	}
	// присвиваем ему айди
	soundBtn.id = "sound";
	// добавляем этот блок в поле игры
	game.appendChild(soundBtn);
	// ппри клике на кнопку вызываем функцию включения выключения музыки
	soundBtn.onclick = function(){
		// передаем нашу песню туда
		onOffMusic();
	}
}

// функиця создания блока очков
function createScore(){
	// создаем блок для очков
	score = document.createElement("div");
	// даем этому блоку айди
	score.id = "score";
	// добавляем тестовое значение
	score.innerText = gameScore;
	// добавляем этот блок в нашу игру
	game.appendChild(score);
}

// функция для создания таймера
function createTimer(){
	// создаем див для таймера
	timer = document.createElement("div");
	// внутри пишем время
	timer.innerText = "Время: ";
	// даем идентификатор для блока
	timer.id = "timer";
	// добавляем наш таймер в игру
	game.appendChild(timer);
	// создаем спан в отором будет счетчик
	time = document.createElement("span");
	// помещаем внутрь тестов е время
	time.innerText = "60";
	// даем блоку идентификатор
	time.id = "time";
	// добавляем спан с таймером внутрь блока таймер
	timer.appendChild(time);
}

// функция для создания жизней
function createLifes(){
	// создаем блок с жизнями
	life = document.createElement("div");
	// присваиваем айди для этого блока
	life.id = "lifes";
	// добавляем блок жизней в игру
	game.prepend(life);
	// делаем цикл для создания количества жизней
	if(quantityLifes == 0){
		gameEnd();
	}
	for(let i = 0; i < quantityLifes; i++){
		// слздаем локальную переменную в которую помещаем жизнь
		var lifeImage = document.createElement("img");
		// добавляем ссылку на картинку
		lifeImage.src = "img/live.svg";
		// добавляем жизнь в блок жизней
		life.appendChild(lifeImage);
	}
}

// функция создания волка
function createWolf(){
	// Создаем блок для волка
	wolf = document.createElement("div");
	// добавляем волку идентификатор
	wolf.id = "wolf";
	// добавляем класс
	wolf.className = "wolf-left-top";
	// добавляем волка в игру
	game.appendChild(wolf);
}

// функция создания блока с курицами
function createHens(){
	// создаем блок с курицами
	hens = document.createElement("div");
	// добавляем ему айди
	hens.id = "hens";
	// создаем блоки куриц с разных сторон ( все аналогично)
	createLeftTopHen();
	createRightTopHen();
	createLeftBottomHen();
	createRightBottomHen();
	// добавляем блок куриц в игру
	game.appendChild(hens);
}

// функция создания блока с верхней левой курицей
function createLeftTopHen(){
	// создаем блок для курочки (это именно те блоки, на которые мы будем наводить)
	leftTop = document.createElement("div");
	// задаем этому блоку айди, потому что мы будем на него наводить
	leftTop.id = "left-top";
	// добавляем этот блок с курцией в общий блок куриц
	hens.appendChild(leftTop);
	// создаем прямую палку
	var board = document.createElement("div");
	// задаем ей классы для стилей
	board.className = "board board-left-top";
	// добавляем парку в блок курицы
	leftTop.appendChild(board);
	// создаем палку под наклоном
	var boardDeg = document.createElement("div");
	// задаем ей классы
	boardDeg.className = "down-board down-board-left-top";
	// добавляем ее в блок курицы
	leftTop.appendChild(boardDeg);
	// создем картинку курицы
	var hen = document.createElement("img");
	// задаем ей классы стилей
	hen.className = "hen hen-left-top";
	// задаем картинку
	hen.src = "img/hen.png";
	// добавляем блок в блок куриц
	leftTop.appendChild(hen);
	// при наведении на блок, волк к нему поворачивается
	leftTop.onmouseover = wolfLeftTop;
}

// АНАЛОГИЧНО
// функция создания блока с верхней правой курицей
function createRightTopHen(){
	rightTop = document.createElement("div");
	rightTop.id = "right-top";
	hens.appendChild(rightTop);
	var board = document.createElement("div");
	board.className = "board board-right-top";
	rightTop.appendChild(board);
	var boardDeg = document.createElement("div");
	boardDeg.className = "down-board down-board-right-top";
	rightTop.appendChild(boardDeg);
	var hen = document.createElement("img");
	hen.className = "hen hen-right-top";
	hen.src = "img/hen.png";
	rightTop.appendChild(hen);
	rightTop.onmouseover = wolfRightTop;
}

// функция создания блока с нижней левой курицей
function createLeftBottomHen(){
	leftBottom = document.createElement("div");
	leftBottom.id = "left-bottom";
	hens.appendChild(leftBottom);
	var board = document.createElement("div");
	board.className = "board board-left-bottom";
	leftBottom.appendChild(board);
	var boardDeg = document.createElement("div");
	boardDeg.className = "down-board down-board-left-bottom";
	leftBottom.appendChild(boardDeg);
	var hen = document.createElement("img");
	hen.className = "hen hen-left-bottom";
	hen.src = "img/hen.png";
	leftBottom.appendChild(hen);
	leftBottom.onmouseover = wolfLeftBottom;
}

// функция создания блока с нижней правой курицей
function createRightBottomHen(){
	rightBottom = document.createElement("div");
	rightBottom.id = "right-bottom";
	hens.appendChild(rightBottom);
	var board = document.createElement("div");
	board.className = "board board-right-bottom";
	rightBottom.appendChild(board);
	var boardDeg = document.createElement("div");
	boardDeg.className = "down-board down-board-right-bottom";
	rightBottom.appendChild(boardDeg);
	var hen = document.createElement("img");
	hen.className = "hen hen-right-bottom";
	hen.src = "img/hen.png";
	rightBottom.appendChild(hen);
	rightBottom.onmouseover = wolfRightBottom;
}


// функция создания заставки конца игры
function createEndGameBlock(){
	// создаем блок конца игры
	endBlock = document.createElement("div");
	// добавляем ему айди
	endBlock.id = "end";
	// добаляем этот блок в игру
	game.appendChild(endBlock);
	// создаем  надпись о конце игры
	var parEnd = document.createElement("p");
	// пишем внутренний текст
	parEnd.innerText = "Игра окончена!"
	// доавляем в блок конца игры
	endBlock.appendChild(parEnd);
	// создаем надспись со счетом
	var parEnd2 = document.createElement("p");
	// пишем внутри текст
	parEnd2.innerText = "Ваш счет: ";
	// добаляем в блок игры
	endBlock.appendChild(parEnd2);
	var record = document.createElement("p");
  // пишем внутри текст
	checkMaxScore();
	record.innerText = "Рекорд: " + maxScore;
  // добаляем в блок игры
	endBlock.appendChild(record);
	// делаем спан для счета
	var endScore = document.createElement("span");
	// присваиваем количество набраных очков
	endScore.innerText = gameScore;
	// добавляем это чисто в надпись с количествои набраных очков
	parEnd2.appendChild(endScore);
	// создаем кнопку рестарта
	restartBtn = document.createElement("button");
	// добавляем ей ади
	restartBtn.id = "restart-btn";
	// помеаем внтурь разноцветный текст
	restartBtn.innerHTML = "З<span>а</span><span>н</span><span>о</span><span>в</span><span>о</span><span>!</span>";
	// добавляем кнопку в конце игры
	endBlock.appendChild(restartBtn);
}

// /* =======================================
// функции для работы с музыкой
// =======================================*/

// включаем музыку, сонг это путь к файлу
function musicOn(song){
	// Создаём новый элемент Audio
	audio = new Audio(); 
	// Указываем путь к звуку "клика"
	audio.src = song; 
	// Автоматически запускаем
	audio.setAttribute("autoplay", "true");
	// зацикливаем музыку
	audio.setAttribute("loop", "true");
	// громкость звука
	audio.volume = 0.15;
	// проверка глобальной перемннной, выключил ли пользователь звук? если да
	if(varSoung == "on"){
		// проигрываем песню
		audio.play();
	}else{
		// если нет. тоесть офф, выключаем песню
		audio.pause();
	}
}

// функция для включения или выключения музыки (срабатывает при нажатии на блок звука)
function onOffMusic(){
	// глобальная переменная для проверки включен звук или выключен. 
	// если звук включен 
	if(varSoung == "on"){
		// звук выключен везде
		varSoung = "off";
		// стили выклченого звука
		soundBtn.style.background = "url('img/sound.svg') center/ 70% no-repeat, red";
		// аудио существует?
		if(audio != null){
			// если да, стивим его на паузу
			audio.pause();
		}
	}else{
		// включаем звук
		varSoung = "on";
		// меняем стили на вклченый звук
		soundBtn.style.background = "url('img/sound.svg') center/ 70% no-repeat";
		// если аудио существует, включаем его
		if(audio != null){
			audio.play();
		}
	}
}

// выключить музыку после окончания игры или блока конца игры
function musicOff(){
	// усли музыка существует
	if(audio != null){
		audio.pause();
	}
}

// /* =======================================
// функция для считки клавиш клавиатуры
// =======================================*/

function checkKey(e) {
	// считываем событие
	e = e || window.event;
	// пробел - пауза
	if (e.keyCode == '32') {
		if(pause == 0) {
			pause = 1;
			createPause();
		}else{
			pause = 0;
			startPause();
			deletePause();
		}
	}
	// кнопка на клаве номер 38 (вверх)
	if (e.keyCode == '38') {
		// up arrow
		// если волк слева внизу
		if(wolf.className == "wolf-left-bottom"){
			// поднимаем его слева вверх
			wolfLeftTop();
		// если он справа внизу
	}else if(wolf.className == "wolf-right-bottom"){
			// перемещаем его справа вверх
			wolfRightTop();
		}
	}
	// аналогично остальное
	else if (e.keyCode == '40') {
		// down arrow
		if(wolf.className == "wolf-left-top"){
			wolfLeftBottom();
		}else if(wolf.className == "wolf-right-top"){
			wolfRightBottom();
		}
	}
	else if (e.keyCode == '37') {
		// left arrow
		if(wolf.className == "wolf-right-top"){
			wolfLeftTop();
		}else if(wolf.className == "wolf-right-bottom"){
			wolfLeftBottom();
		}
	}
	else if (e.keyCode == '39') {
		// right arrow
		if(wolf.className == "wolf-left-top"){
			wolfRightTop();
		}else if(wolf.className == "wolf-left-bottom"){
			wolfRightBottom();
		}
	}
}

// /* =======================================
// функции перемещения волка по сторонам
// =======================================*/

// перемещение влево вверх
function wolfLeftTop(){
	// перемещаем вего вверх слева
	wolf.className = "wolf-left-top";
}

// аналогично
function wolfRightTop(){
	wolf.className = "wolf-right-top";
}

function wolfLeftBottom(){
	wolf.className = "wolf-left-bottom";
}

function wolfRightBottom(){
	wolf.className = "wolf-right-bottom";
}

// /* =======================================
// Функции для удаления элементов игры
// =======================================*/

// функция удаления блока для старта игры
function deleteStartBlock(){
	// удаляем весь блок старта игры
	startBlock.remove();
}

// функция удаления блока очков
function deleteScore(){
	// удаляем весь блок со счетом
	score.remove();
}

// функция удаления блока таймера
function deleteTimer(){
	// удаляем весь блок с таймером
	timer.remove();
	clearInterval(t);					// очищаем таймер
	clearInterval(timerBall);			// очищаем таймер анимации яиц
	clearTimeout(timerEgg);				// очищаем таймер создания яиц
}

// функция удаления блока жизней
function deleteLifes(){
	// удаляем весь блок с жизнями
	life.remove();
}

// функция удаления блока с волком
function deleteWolf(){
	// удаляем весь блок сволком
	wolf.remove();
}

// функция удаления блока куриц
function deleteHen(){
	// удаляем весь блок с курицами
	hens.remove();
}

// функция удаления яйца
function deleteEgg(){
	// удаляем весь блок с яйцами
	egg.remove();
}

// функция удаления блока конца игры
function deleteEndGameBlock(){
	// удаляем весь блок с концом
	endBlock.remove();
}

// функция для обнуления перемменных, для новой игры, вызываем при рестарте
function recountVariables(){
	// очки 0
	gameScore = 0;
	// жизни 3
	quantityLifes = 3;
	// обнуляем скорость
	speedAnimal = 200;	// переменная времени в мсек. интервала для функции анимации яиц
	speedEgg = 3000;	// переменная интервала для создания яиц
}

// фцнкция обнуления поля.
function gameFild(){
	game.innerHTML = "";
}

//функция создания паузы. аналогична созданию других элементов
function createPause(){
	pauseBlock = document.createElement("div");
	pauseBlock.className = "pause";
	pauseBlock.innerText = "ПАУЗА";
	game.appendChild(pauseBlock);
}
// фцнкция даления паузы
function deletePause(){
	pauseBlock.remove();
}

// функция закрытия правил если они отрыты
function checkOpenRules(){
	// ищем подстроку в ссылке, если она найдена, убираем правила
	if(location.href.indexOf("#info") != -1){
		location.href = "index.html#";
	}
}