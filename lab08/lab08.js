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
let counterTimer = null;
let currentNum = 0;
let startNum = 0;

function createAndStart() {
    if (counterTimer) {
        clearInterval(counterTimer);
        counterTimer = null;
    }
    
    startNum = parseInt(document.getElementById('counterValue').value);
    currentNum = startNum;
    
    if (isNaN(startNum) || startNum < 0) {
        alert('Введите корректное число');
        return;
    }
    
    const outputDiv = document.getElementById('counterOutputContent2');
    outputDiv.innerHTML = '';
    outputDiv.innerHTML += `Счёт от ${startNum} до 0:<br>`;
    
    document.getElementById('pauseBtn').disabled = false;
    document.getElementById('resumeBtn').disabled = true;
    document.getElementById('stopBtn').disabled = false;
    document.getElementById('counterStatus').innerHTML = 'Запуск:';
    
    counterTimer = setInterval(() => {
        if (currentNum >= 0) {
            const outputDiv = document.getElementById('counterOutputContent2');
            outputDiv.innerHTML += `${currentNum}<br>`;
            
            if (currentNum === 0) {
                clearInterval(counterTimer);
                counterTimer = null;
                document.getElementById('counterStatus').innerHTML = '✅';
                document.getElementById('pauseBtn').disabled = true;
                document.getElementById('resumeBtn').disabled = true;
                document.getElementById('stopBtn').disabled = true;
            }
            
            currentNum--;
        }
    }, 1000);
}

function pauseCounter() {
    if (counterTimer) {
        clearInterval(counterTimer);
        counterTimer = null;
        document.getElementById('counterStatus').innerHTML = `пауза (${currentNum + 1})`;
        document.getElementById('pauseBtn').disabled = true;
        document.getElementById('resumeBtn').disabled = false;
    }
}

function resumeCounter() {
    if (!counterTimer && currentNum >= 0) {
        counterTimer = setInterval(() => {
            if (currentNum >= 0) {
                const outputDiv = document.getElementById('counterOutputContent2');
                outputDiv.innerHTML += `${currentNum}<br>`;
                
                if (currentNum === 0) {
                    clearInterval(counterTimer);
                    counterTimer = null;
                    document.getElementById('counterStatus').innerHTML = '✅';
                    document.getElementById('pauseBtn').disabled = true;
                    document.getElementById('resumeBtn').disabled = true;
                    document.getElementById('stopBtn').disabled = true;
                }
                
                currentNum--;
            }
        }, 1000);
        
        document.getElementById('counterStatus').innerHTML = 'запущен';
        document.getElementById('pauseBtn').disabled = false;
        document.getElementById('resumeBtn').disabled = true;
    }
}

function stopCounter() {
    if (counterTimer) {
        clearInterval(counterTimer);
        counterTimer = null;
    }
    
    currentNum = startNum;
    
    const outputDiv = document.getElementById('counterOutputContent2');
    outputDiv.innerHTML = `Счёт сброшен до ${startNum}<br>`;
    
    document.getElementById('counterStatus').innerHTML = 'убит';
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('resumeBtn').disabled = true;
    document.getElementById('stopBtn').disabled = true;
}




