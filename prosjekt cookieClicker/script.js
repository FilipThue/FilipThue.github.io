let cookieEl = document.querySelector('.cookie')
let cookieCounterEl = document.querySelector('.counter')
let dpsCounterEl = document.querySelector('.dpsCounter')

//Jedi Jidrik
let buyClickBoostEl = document.querySelector('.jediDidrik')
let levelJediDidrikEl = document.querySelector('.levelJediDidrik')
let priceJediDidrikEl = document.querySelector('.priceJediDidrik')




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
    cookieCounterEl.innerHTML = `${localStorage.cookies} Didriker`
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




