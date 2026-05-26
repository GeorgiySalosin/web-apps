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


// TASK 2


//1

function delay(seconds) {
    return new Promise(resolve => {
        setTimeout(resolve, seconds * 1000);        // settimeout вызовется через seconds
    });
}

async function runDelayCounter() {
    const n = parseInt(document.getElementById('delayCounterN').value);
    const outputDiv = document.getElementById('delayCounterOutputContent');
    
    outputDiv.innerHTML = `Запуск<br>`;
    
    for (let i = n; i >= 0; i--) {
        outputDiv.innerHTML += `${i}<br>`;
        await delay(1);
    }
    
    outputDiv.innerHTML += `✅<br>`;
}

//2

async function getFirstRepo() {
    const username = document.getElementById('githubUsername').value;
    const outputDiv = document.getElementById('githubOutputContent');
    
    
    try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        
        if (!userRes.ok) {
            outputDiv.innerHTML += `${username} не найден<br>`;
            return;
        }
        
        const user = await userRes.json();
        outputDiv.innerHTML += `Найден: ${user.name || user.login}<br>`;
        
        const reposRes = await fetch(user.repos_url);
        const repos = await reposRes.json();
        
        if (repos.length === 0) {
            outputDiv.innerHTML += `Нет репозиториев<br>`;
            return;
        }
        
        outputDiv.innerHTML += `Первый репозиторий: <strong>${repos[0].name}</strong><br>`;
        outputDiv.innerHTML += `Звёзд: ${repos[0].stargazers_count || 0}<br>`;
        
    } catch (error) {
        outputDiv.innerHTML += `Ошибка: ${error.message}<br>`;
    }
}






class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  const response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

// ask for login until object return
async function getGithubUser() {
  while (true) {
    let name = prompt("Введите логин?", "iliakan");
    
    try {
      const user = await loadJson(`https://api.github.com/users/${name}`);
      alert(`Полное имя: ${user.name}.`);
      return user;
    } catch (err) {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
        // continue - продолжаем цикл
      } else {
        throw err;
      }
    }
  }
}

// 
async function searchGithubUser() {
  const login = document.getElementById('githubLogin').value.trim();
  const outputDiv = document.getElementById('asyncOutputContent');
  
  if (!login) {
    outputDiv.innerHTML = '<span class="error">Пожалуйста, введите логин пользователя</span>';
    return;
  }
  
  outputDiv.innerHTML = 'Загрузка информации о пользователе...';
  
  try {
    const user = await loadJson(`https://api.github.com/users/${login}`);
    outputDiv.innerHTML = `
      <strong>Пользователь найден!</strong><br>
      <strong>Логин:</strong> ${user.login}<br>
      <strong>Полное имя:</strong> ${user.name || 'Не указано'}<br>
      <strong>Локация:</strong> ${user.location || 'Не указана'}<br>
      <strong>Репозиториев:</strong> ${user.public_repos}<br>
      <strong>Подписчиков:</strong> ${user.followers}<br>
      <strong>GitHub:</strong> <a href="${user.html_url}" target="_blank">${user.html_url}</a>
    `;
  } catch (err) {
    if (err instanceof HttpError && err.response.status == 404) {
      outputDiv.innerHTML = `<span class="error"> Пользователь "${login}" не найден на GitHub</span>`;
    } else {
      outputDiv.innerHTML = `<span class="error"> Ошибка: ${err.message}</span>`;
      console.error(err);
    }
  }
}
