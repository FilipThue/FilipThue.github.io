let cookieEl = document.querySelector('.cookie')
let cookieCounterEl = document.querySelector('.counter')
let dpsCounterEl = document.querySelector('.dpsCounter')

//Jedi Jidrik
let buyClickBoostEl = document.querySelector('.jediDidrik')
let levelJediDidrikEl = document.querySelector('.levelJediDidrik')
let priceJediDidrikEl = document.querySelector('.priceJediDidrik')

const img = document.querySelector('img')
img.setAttribute("draggable", false);

function sleep(ms) {

        return new Promise(resolve => setTimeout(resolve, ms));
    
    }



if(!localStorage.cookies){
    localStorage.cookies = 21
}
if(!localStorage.clickBoost){
    localStorage.clickBoost = 0
    localStorage.priceClickBoost = 20
}

/* ---------------------------------------- */
if(localStorage.cookies){
    localStorage.cookies = 21
}
if(localStorage.clickBoost){
    localStorage.clickBoost = 1
    localStorage.priceClickBoost = 20
}
/* ---------------------------------------- */


update ()

cookieEl.addEventListener('click', tell)
buyClickBoostEl.addEventListener('click', buyClickBoost)


function update (){
    cookieCounterEl.innerHTML = `${localStorage.cookies} didriCoins`
    levelJediDidrikEl.innerHTML = `Level: ${localStorage.clickBoost}`
    priceJediDidrikEl.innerHTML = localStorage.priceClickBoost
}

function tell (){
    localStorage.cookies = Number(localStorage.cookies) + 1 * localStorage.clickBoost
    update ()
}

function buyClickBoost (){
    if (localStorage.cookies >= localStorage.priceClickBoost){
        localStorage.cookies -= localStorage.priceClickBoost
        localStorage.clickBoost = Number(localStorage.clickBoost) + 1
        localStorage.priceClickBoost = Math.round(20 *2**Number(localStorage.clickBoost))

        update ()

    }
    
}
//-------------------------------------------------

let discsEl = document.querySelector(".discs")
let andersClickEl = document.querySelector(".andersClick")

andersClickEl.onclick = newDisc

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
    imgEl.src = "./images/didrik_knapp.png"    
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







/* localStorage.removeItem('discs') */