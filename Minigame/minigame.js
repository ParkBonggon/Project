const itemsize = 50;
const star_Count = 7;
const cloud_Count = 10;
const GAME_TIME = 20;

const field = document.querySelector('.game-field');
const fieldRect = field.getBoundingClientRect();
const playBtn = document.querySelector('.game-pause');
const gameTimer = document.querySelector('.game-time');
const gameScore = document.querySelector('.game-score');

const menu = document.querySelector('.game-menu');
const menuText = document.querySelector('.game-result');
const retryBtn = document.querySelector('.game-retry');

const cloudSound = new Audio('./Sound/cloud.mp3');
const bgSound = new Audio('./Sound/rain.mp3');
const btnSound = new Audio('./Sound/btn.mp3');
const clearSound = new Audio('./Sound/clear.mp3');
const failSound = new Audio('./Sound/fail.mp3');

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFieldClick);

playBtn.addEventListener('click', () => {
    playSound(btnSound);
    if(started) {
        stopGame();
    } else {
        startGame();
    }
    started = !started;
});
// playBtn
function startGame() {
    setObj();
    changeStopBtn();
    showUI();
    startGameTimer();
    playSound(bgSound);
}

function stopGame() {
    changeStartBtn();
    stopGameTimer();
    hideGameBtn();
    showmenu('REPLAY?');
    stopSound(bgSound);
}

function finishGame(win){
    hideGameBtn();
    if(win) {
        playSound(clearSound);
    }else {
        playSound(failSound);
    }
    stopSound(bgSound);
    showmenu(win? 'Great! 😎': 'Try again 😑 ' );
}

retryBtn.addEventListener('click', () => {
    started = false;
    field.innerHTML = '';
    clsoseUI();
    visibleGameBtn();
    hidemenu();
    changeStartBtn();
    score = 0;
    stopSound(bgSound);
    playSound(btnSound);
})

// Btn option
function changeStopBtn(){
    const icon = playBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function changeStartBtn() {
    const icon = playBtn.querySelector('.fa-solid');
    icon.classList.add('fa-play');
    icon.classList.remove('fa-stop');
}

function hideGameBtn() {
    playBtn.style.visibility='hidden';
}

function visibleGameBtn() {
    playBtn.style.visibility='visible';
}

function showUI() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function clsoseUI(){
    gameTimer.style.visibility = 'hidden';
    gameScore.style.visibility = 'hidden';
}

function startGameTimer() {
    let TimeLimit = GAME_TIME;
    updateTimerText(TimeLimit);
    timer = setInterval(()=> {
        if(TimeLimit <= 0) {
            clearInterval(timer);
            finishGame(cloud_Count === score);
            return;
        }
        updateTimerText(--TimeLimit);
    }, 1000);
}

function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerHTML = `${minutes}:${seconds}`;
}

function showmenu(text) {
    menuText.innerHTML = text;
    menu.classList.remove('game-menu-hide');
}

function hidemenu() {
    menu.classList.add('game-menu-hide');

}


// system 
function setObj() {
    field.innerHTML = '';
    gameScore.innerHTML = cloud_Count;
    //게임 내 오브젝트 생성후 랜덤 배치
    addItem('star', star_Count, './Image/star.png');
    addItem('cloud', cloud_Count, './Image/storm.png');
}

function onFieldClick(event){
    if(!started){
        return;
    }
    const target = event.target;
    if(target.matches('.cloud')) {
        target.remove();
        score++;
        playSound(cloudSound);
        updateSocreBoard();
        if(score === cloud_Count) {
            stopGameTimer();
            finishGame(true);
        }
    } else if(target.matches('.star')){
        stopGameTimer();
        finishGame(false);
    }
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}

function updateSocreBoard() {
    gameScore.innerHTML = cloud_Count - score;
}

function addItem(objName, num, imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - itemsize;
    const y2 = field.clientHeight - itemsize;
    for (let i = 0; i < num; i++){
        const item = document.createElement('img');
        item.setAttribute('class', objName);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        if (objName === 'cloud'){
            item.style.width = `50px`;
            item.style.height = `50px`;
        }else {
            item.style.width = `40px`;
            item.style.height = `40px`;
        }
        field.appendChild(item);
    }
}
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}