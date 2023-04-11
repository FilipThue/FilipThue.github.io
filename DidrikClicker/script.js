const img = document.querySelector('img')
img.setAttribute("draggable", false);

/* window.localStorage.clear(); */

let activatedL = false
let activatedR = false

let cookieCounterEl = document.querySelector('.counter')
let dpsCounterEl = document.querySelector('.dpsCounter')

//click per second
let cpsEl = document.querySelector('.cps')
let fillEl = document.querySelector(':root')

let cookieEl = document.querySelector('.cookie')

//menus
let shopBtn = document.querySelector('.shops')
let shopEl = document.querySelector('.shop')

let infoBtn = document.querySelector('.info')
let infoEl = document.querySelector('.informations')

let homeBtn = document.querySelector('.home')

let andersClickEl = document.querySelector(".andersClick")

//Jedi Jidrik
let buyClickBoostEl = document.querySelector('.jediDidrik')
let levelJediDidrikEl = document.querySelector('.levelJediDidrik')
let priceJediDidrikEl = document.querySelector('.priceJediDidrik')

//////////////////////////////////////////////////////////

// tar inn antall millisekunder programmet skal vente før funksjonen løses
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//////////////////////////////////////////////////////////

if(!localStorage.cookies){
    localStorage.cookies = 21
}
if(!localStorage.clickBoost){
    localStorage.clickBoost = 0
    priceClickBoost = 20
}else{
    priceClickBoost = Math.round(20 *1.7**Number(localStorage.clickBoost))
}

/* ---------------------------------------- */
if(localStorage.cookies){
    localStorage.cookies = 500
}
if(localStorage.clickBoost){
    localStorage.clickBoost = 0
    priceClickBoost = 20
}
/* ---------------------------------------- */


update ()

cookieEl.addEventListener('click', tell)
shopBtn.addEventListener('click', activateShop)
infoBtn.addEventListener('click', activateInfo)
homeBtn.addEventListener('click', activateHome)
buyClickBoostEl.addEventListener('click', buyClickBoost)

andersClickEl.addEventListener('click', newDisc)


function update (){
    cookieCounterEl.innerHTML = `${localStorage.cookies} DidriCoins`
    levelJediDidrikEl.innerHTML = `Level: ${Number(localStorage.clickBoost) + 1}`
    priceJediDidrikEl.innerHTML = priceClickBoost
}

function tell (){
    localStorage.cookies = Number(localStorage.cookies) + 1 + Number(localStorage.clickBoost)
    update ()
}

function activateShop(){
    if (!activatedL){
        activatedL = true
        activatedR = false
        infoEl.classList.remove("presentMenu")
        shopEl.classList.add("presentMenu")
    } else{
        activatedL = false
        activatedR = false
        shopEl.classList.remove("presentMenu")
        infoEl.classList.remove("presentMenu")
    }
}

function activateInfo(){
    if (!activatedR){
        activatedR = true
        activatedL = false
        shopEl.classList.remove("presentMenu")
        infoEl.classList.add("presentMenu")
    } else{
        activatedR = false
        activatedL = false
        infoEl.classList.remove("presentMenu")
        shopEl.classList.remove("presentMenu")
    }
}

function activateHome(){
    activatedL = false
    activatedR = false
    infoEl.classList.remove("presentMenu")
    shopEl.classList.remove("presentMenu")
}


//-----------------------------

function buyClickBoost (){
    if (localStorage.cookies >= priceClickBoost){
        localStorage.cookies -= priceClickBoost
        localStorage.clickBoost ++
        priceClickBoost = Math.round(20 *1.7**Number(localStorage.clickBoost))

        update ()

    }
    
}


//-----------------------------




let cpsHeight = 0

let aClicks = 0
let bClicks = 0
let cClicks = 0
let dClicks = 0

let cps = 0

cookieEl.addEventListener('click', addClick)


setInterval (calculateCPS, 250)

function addClick() {
    aClicks++
}



function calculateCPS (){
    a = aClicks
    b = bClicks
    c = cClicks
    d = dClicks

    cps = a+b+c+d;

/*     cpsEl.innerHTML = `CPS: ${cps}` */
    cpsHeight = (cps/7)*100
    if (cpsHeight > 100){
        cpsHeight = 100
    }
    fillEl.style.setProperty('--fill', `${cpsHeight}%`)


    dClicks=c
    cClicks=b
    bClicks=a
    aClicks=0


}

//andersClick:   /////////////////////////////////////////////////////////////////////

let discsEl = document.querySelector(".discs")
let discs = []


if(localStorage.discs){
    discs = JSON.parse(localStorage.discs)
}

let antallDiscs = discs.length

for(let i = 0; i < discs.length; i++){
    discsEl.innerHTML += discs[i]
}

function newDisc(){
    if(antallDiscs < 36){
        let discEls = document.querySelectorAll('.disc')

        for(let i = 0; i < discEls.length; i++){
            discEls[i].classList.remove('trykkes')
        }    

        antallDiscs += 1    
        console.log(antallDiscs)    
        let imgEl = document.createElement('img')    
        imgEl.src = "./images/skytedidrik.png"    
        imgEl.classList.add('disc') 
        imgEl.style.transform = `rotate(${antallDiscs*10-10}deg)` 
                
        discsEl.innerHTML += imgEl.outerHTML    
        discs.push(imgEl.outerHTML)    
        localStorage.discs = JSON.stringify(discs)
        
    }

}


setInterval(trykk, 500)

let trykkes = 0

async function trykk(){
    if(discs.length > 0){
        let discEls = document.querySelectorAll('.disc')
        if(discEls[trykkes]){
            discEls[trykkes].classList.add('trykkes')
            await sleep(150)
            discEls[trykkes].classList.remove('trykkes')
        }
        trykkes = (trykkes + 1) % discs.length
    }

}

// Initialising the canvas ----------------------
var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

// Setting the width and height of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Setting up the letters
var letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
letters = letters.split('');

// Setting up the columns
var fontSize = 10,
    columns = canvas.width / fontSize;

// Setting up the drops
var drops = [];
for (var i = 0; i < columns; i++) {
  drops[i] = 1;
}

// Setting up the draw function
function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, .1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < drops.length; i++) {
    var text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillStyle = '#0f0';
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    drops[i]++;
    if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
      drops[i] = 0;
    }
  }
}

// Loop the animation
setInterval(draw, 33);
//-----------------------------------------------