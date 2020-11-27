const dino = document.querySelector('.dino')
const grid = document.querySelector('.grid')
const alert = document.querySelector('#alert')
const textHighSec = document.querySelector('#textHighSec')
const gravity = 0.9

// localstorage
let highscore = { sec: 0 };
// 將 string 轉為 jason 變成可以提出的資料
let highscoreStorage = JSON.parse(localStorage.getItem("highscore"));
if (highscoreStorage !== null) {
    highscore = highscoreStorage;
    let dataSec = highscore.sec
    textHighSec.innerText = caltime(dataSec)
}


let isJump = false
let isGameOver = false

function control(e) {
    if(e.keyCode === 32) {
        if(isJump===false) {
            isJump = true
            jump()
        }
    }
}

// 監聽按下的是否為空白鍵 是的話執行jump()
document.addEventListener('keyup', control)

let position = 0
function jump() {
    let count = 0
    let timer = setInterval(()=> {
        // move down
        if(count===20) {
            clearInterval(timer)
            let timerDown = setInterval(()=> {
                if(count===0) {
                    clearInterval(timerDown)
                    isJump = false
                }
                count--
                position -= 1
                position = position * gravity
                dino.style.bottom = position + 'px'
            },15)
        }

        // move up
        count++
        position += 10
        position = position * gravity
        dino.style.bottom = position + 'px'
    },15)
}


// 設定障礙物
function generateCactus() {
    let randomTime = Math.random() * 4000
    const cactus = document.createElement('div')
    if(!isGameOver) cactus.classList.add('cactus')
    grid.appendChild(cactus)

    let cactusPosition = 580
    cactus.style.left = cactusPosition + 'px'

    let timer = setInterval(()=> {
        // 遊戲結束
        if(cactusPosition>0 && cactusPosition<40 && position<40) {
            clearInterval(timer)
            isGameOver = true
            clearInterval(timerPlayer)
            alert.innerText = 'Game Over'

            // localstorage
            if (highscoreStorage === null || highscore.sec < sec) {
                highscore.sec = sec;
                // 將 jason 轉為 string 放入localStorage
                localStorage.setItem("highscore", JSON.stringify(highscore));
                let dataSec = highscore.sec;
                textHighSec.innerText = caltime(dataSec)
            }
        }

        cactusPosition-=10
        cactus.style.left = cactusPosition + 'px'
    },30)


    if(!isGameOver) setTimeout(generateCactus, randomTime)
}
generateCactus()

// 計時
const currentSec = document.querySelector('#textCurrentSec')
let sec = '0000'
currentSec.innerText = sec
let timerPlayer = null

timerPlayer = setInterval(() => {
    sec++
    currentSec.innerText = caltime(sec)
},1000)


// 秒數前面加上000
function caltime(value) {
    if(value<10) return '000' + value
    if(value>=10 && value<100) return '00' + value
    if(value>=100 && value<1000) return '0' +value
}