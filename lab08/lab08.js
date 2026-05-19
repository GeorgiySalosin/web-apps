// TASK 1

//1
let simpleInterval = null;

function runCounter() {
    const n = parseInt(document.getElementById('counterN').value);
    const outputDiv = document.getElementById('counterOutputContent1');
    
    outputDiv.innerHTML = '';
    outputDiv.innerHTML += `Запуск:<br>`;
    
    if (simpleInterval) clearInterval(simpleInterval);
    
    let current = n;
    simpleInterval = setInterval(() => {
        outputDiv.innerHTML += `${current}<br>`;
        
        if (current === 0) {
            clearInterval(simpleInterval);
            outputDiv.innerHTML += ` Готово!<br>`;
        }
        current--;
    }, 1000);
}



//2
let timer = null;
let num = 0;
let maxNum = 0;

function createAndStart() {
    if (timer) clearInterval(timer);
    
    maxNum = parseInt(document.getElementById('createCounterN').value);
    num = maxNum;
    
    document.getElementById('createCounterOutputContent').innerHTML = `Счёт от ${maxNum} до 0:<br>`;
    
    timer = setInterval(() => {
        if (num >= 0) {
            document.getElementById('createCounterOutputContent').innerHTML += `${num}<br>`;
            if (num === 0) clearInterval(timer);
            num--;
        }
    }, 1000);
}

function pauseCounter() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function resumeCounter() {
    if (!timer && num >= 0) {
        timer = setInterval(() => {
            if (num >= 0) {
                document.getElementById('createCounterOutputContent').innerHTML += `${num}<br>`;
                if (num === 0) clearInterval(timer);
                num--;
            }
        }, 1000);
    }
}

function stopCounter() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    num = maxNum;
    document.getElementById('createCounterOutputContent').innerHTML = `Сброшено до ${maxNum}<br>`;
}


