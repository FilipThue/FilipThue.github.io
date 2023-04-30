const img = document.querySelector('img')
img.setAttribute("draggable", false);

/* window.localStorage.clear(); */

let activatedL = false
let activatedR = false

let clicks = 0

let cookieCounterEl = document.querySelector('.counter')
let dpsCounterEl = document.querySelector('.dpsAccount')

//click per second
let cpsEl = document.querySelector('.cps')
let fillEl = document.querySelector(':root')

let cookieDivEl = document.querySelector('.cookieDiv')
let cookieEl = document.querySelector('.cookie')

//menus
let shopBtn = document.querySelector('.shops')
let shopEl = document.querySelector('.shop')
let infoBtn = document.querySelector('.info')
let infoEl = document.querySelector('.informations')
let homeBtn = document.querySelector('.home')


let jediDidrikBtn = document.querySelector('.jediDidrik')
jediDidrikBtn.addEventListener('click', buyJD)

let matrixDidrikBtn = document.querySelector(".matrixDidrik")
matrixDidrikBtn.addEventListener('click', newDisc)

let blueFireDidrikBtn = document.querySelector('.blueFireDidrik')
blueFireDidrikBtn.addEventListener('click', buyBFD)

let Didrik147Btn = document.querySelector('.didrik147')
Didrik147Btn.addEventListener('click', buyD147)

//butikken:
let itemEls = document.querySelectorAll('.item')
let priceEls = document.querySelectorAll('.price')
let levelEls = document.querySelectorAll('.level')
let dpsEls = document.querySelectorAll('.dps')


//gif
let danseDidrikEl = document.querySelector('#gif')

//////////////////////////////////////////////////////////

// tar inn antall millisekunder programmet skal vente før funksjonen løses
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//////////////////////////////////////////////////////////

// localStorage til oppgraderingene
if(!localStorage.cookies){
    localStorage.cookies = 0
}

if (!localStorage.dps){
    localStorage.dps = 0
}


if (!localStorage.clickBoost){
    localStorage.clickBoost = 0
}

let discsEl = document.querySelector(".discs")
let discs = []
if(localStorage.discs){
    discs = JSON.parse(localStorage.discs)
}
let antallDiscs = discs.length
for(let i = 0; i < discs.length; i++){
    discsEl.innerHTML += discs[i]
}

if (!localStorage.blueFireDidrik){
    localStorage.blueFireDidrik = 0
}

if (!localStorage.didrik147){
    localStorage.didrik147 = 0
}


cookieEl.addEventListener('click', (e) => {
    count()
    plus(e)
})

shopBtn.addEventListener('click', activateShop)
infoBtn.addEventListener('click', activateInfo)
homeBtn.addEventListener('click', activateHome)

async function plus(e){
    console.log(e)

    let plus = document.createElement("p");
    plus.innerText = `+${1 + Number(localStorage.clickBoost)}`
    plus.classList.add('bonus')
    plus.style.top = `${e.clientY}px`
    plus.style.left = `${e.clientX}px`
    cookieDivEl.appendChild(plus)
    await sleep(1000)
    plus.remove()
    
    
}



let priceJediDidrik = Math.round(20*1.7**Number(localStorage.clickBoost))
let priceMatrixDidrik = Math.round(40*1.5**antallDiscs)
let priceBlueFireDidrik = Math.round(80*1.5**Number(localStorage.blueFireDidrik))
let priceDidrik147 = Math.round(100*1.5**Number(localStorage.didrik147))

let pricesArr = [priceJediDidrik, priceMatrixDidrik, priceBlueFireDidrik, priceDidrik147] 
let levelsArr = [localStorage.clickBoost, antallDiscs, localStorage.blueFireDidrik, localStorage.didrik147]

update ()
function update (){
    pricesArr = [priceJediDidrik, priceMatrixDidrik, priceBlueFireDidrik, priceDidrik147] 
    levelsArr = [localStorage.clickBoost, antallDiscs, localStorage.blueFireDidrik, localStorage.didrik147]

    
    cookieCounterEl.innerHTML = `${Math.floor(localStorage.cookies)} DidriCoins`
    dpsCounterEl.innerHTML = `${Math.floor(Number(localStorage.dps)*10)/10} DPS`

    for (let i = 0; i<priceEls.length; i++){
        priceEls[i].innerHTML = pricesArr[i]
        levelEls[i].innerHTML = `Level: ${Number(levelsArr[i]) + 1}`
    }
    dpsEls[0].innerHTML = `Click: ${Number(localStorage.clickBoost) + 2}`
    dpsEls[1].innerHTML = `DPS: 0.1`
    dpsEls[2].innerHTML = `DPS: 0.3`
    dpsEls[3].innerHTML = `DPS: 0.5`

    for (let i = 0; i < pricesArr.length; i++){
        if (localStorage.cookies >= pricesArr[i]){
            priceEls[i].classList.add('affordable')
        }else{
            priceEls[i].classList.remove('affordable')
        }
    } 

    if(antallDiscs >= 36){
        priceEls[1].classList.add('gray')
        dpsEls[1].innerHTML = `DPS: MAX`
        levelEls[1].innerHTML = `Level: MAX`
        matrixDidrikBtn.classList.add('gray')

    }

}

setInterval (dpsFunc, 1000)

function dpsFunc (){
    localStorage.cookies = Number(localStorage.cookies) + Number(localStorage.dps)
    update()

}

function count (){
    localStorage.cookies = Number(localStorage.cookies) + 1 + Number(localStorage.clickBoost)
    clicks = clicks + 1
    update ()
}

function activateShop(){
    if (!activatedL){
        activatedL = true
        activatedR = false
        infoEl.classList.remove('presentMenu')
        shopEl.classList.add('presentMenu')
    } else{
        activatedL = false
        activatedR = false
        shopEl.classList.remove('presentMenu')
        infoEl.classList.remove('presentMenu')
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

function buyJD (){
    console.log('klikkes')
    if (localStorage.cookies >= priceJediDidrik){
        localStorage.cookies -= priceJediDidrik
        localStorage.clickBoost ++
        priceJediDidrik = Math.round(20 *1.7**Number(localStorage.clickBoost))

        update ()

    }
    
}

function buyBFD (){
    if (localStorage.cookies >= priceBlueFireDidrik){
        localStorage.cookies -= priceBlueFireDidrik
        localStorage.blueFireDidrik ++
        localStorage.dps = Number(localStorage.dps) + 0.3
        priceBlueFireDidrik = Math.round(80*1.5**Number(localStorage.blueFireDidrik))
        update ()

    }
}

function buyD147 (){
    console.log('kjøper D147')
    if (localStorage.cookies >= priceDidrik147){
        localStorage.cookies -= priceDidrik147
        localStorage.didrik147 ++
        localStorage.dps = Number(localStorage.dps) + 0.5
        priceDidrik147 = Math.round(100*1.5**Number(localStorage.didrik147))
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



function newDisc(){
    if(antallDiscs < 36 && localStorage.cookies >= priceMatrixDidrik){
        let discEls = document.querySelectorAll('.disc')

        for(let i = 0; i < discEls.length; i++){
            discEls[i].classList.remove('trykkes')
        }    
        localStorage.cookies -= priceMatrixDidrik

        antallDiscs += 1    
        priceMatrixDidrik = Math.round(40*1.5**antallDiscs)

        console.log(antallDiscs)    
        let imgEl = document.createElement('img')    
        imgEl.src = "./images/skytedidrik.png"    
        imgEl.classList.add('disc') 
        imgEl.style.transform = `rotate(${antallDiscs*10-10}deg)` 
                
        discsEl.innerHTML += imgEl.outerHTML    
        discs.push(imgEl.outerHTML)    
        localStorage.discs = JSON.stringify(discs)
        localStorage.dps = Number(localStorage.dps) + 0.1
        update()
        
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

//////////////////////////////////////////////////////////////////////////


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
// blue didrik

let timerId = setInterval(dancingDidrik, 30000)







async function dancingDidrik(){
    if(clicks>50){
        localStorage.cookies = Math.round(Number(localStorage.cookies) * 1.05)
        update ()
        clicks = 0
        danseDidrikEl.classList.add('show')
        canvas.classList.add('show')
        await sleep(6000)
        danseDidrikEl.classList.remove('show')
        canvas.classList.remove('show')
    } else{
        clicks = 0
    }

}


//--------------------------------------------------------

