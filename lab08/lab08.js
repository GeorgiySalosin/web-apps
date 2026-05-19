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



// TASK 3

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
    return await response.json();
  } else {
    throw new HttpError(response);
  }
}



// 
async function searchGithubUser() {
  const loginInput = document.getElementById('githubLogin');
  const outputDiv = document.getElementById('asyncOutputContent');
  const login = loginInput.value.trim();
  
  if (!login) {
    outputDiv.innerHTML = '<span style="color: red;">введите логин</span>';
    return;
  }
  
  // Показываем индикатор загрузки
  outputDiv.innerHTML = '<span style="color: blue;">Загрузка</span>';
  
  try {
    const user = await loadJson(`https://api.github.com/users/${login}`);
    
    // Отображаем информацию о пользователе
    outputDiv.innerHTML = `
      <div style="display: flex; align-items: center; gap: 15px;">
        <img src="${user.avatar_url}" width="60" height="60" style="border-radius: 50%;">
        <div>
          <strong>Пользователь найден!</strong><br>
          <strong>Логин:</strong> ${user.login}<br>
          <strong>Полное имя:</strong> ${user.name || 'не указано'}<br>
          <strong>Репозитории:</strong> ${user.public_repos}<br>
          <strong>Подписчики:</strong> ${user.followers}<br>
          <a href="${user.html_url}" target="_blank">Профиль на GitHub</a>
        </div>
      </div>
    `;
    
  } catch (err) {
    if (err instanceof HttpError && err.response.status == 404) {
      outputDiv.innerHTML = `
        <span style="color: red;">Пользователь "${login}" не найден на GitHub!</span><br>
        <small>Пожалуйста, проверьте логин и попробуйте снова.</small>
      `;
    } else {
      console.error(err);
      outputDiv.innerHTML = `
        <span style="color: red;">Ошибка при загрузке данных: ${err.message}</span>
      `;
    }
  }
}

// Функция для демонстрации работы с циклом (аналог getGithubUser с prompt)
async function demoGithubUserWithLoop() {
  const outputDiv = document.getElementById('asyncOutputContent');
  
  while (true) {
    let name = prompt("Введите логин пользователя GitHub:", "octocat");
    
    if (!name) {
      outputDiv.innerHTML = '<span style="color: orange;">⏸️ Поиск отменён</span>';
      return null;
    }
    
    outputDiv.innerHTML = `<span style="color: blue;">Поиск пользователя "${name}"...</span>`;
    
    try {
      const user = await loadJson(`https://api.github.com/users/${name}`);
      
      outputDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
          <img src="${user.avatar_url}" width="60" height="60" style="border-radius: 50%;">
          <div>
            <strong>Успех!</strong><br>
            <strong>Полное имя:</strong> ${user.name || 'не указано'}<br>
            <strong>Логин:</strong> ${user.login}
          </div>
        </div>
      `;
      alert(`Полное имя: ${user.name || 'не указано'}`);
      return user;
      
    } catch (err) {
      if (err instanceof HttpError && err.response.status == 404) {
        alert(`Пользователь "${name}" не существует, пожалуйста, повторите ввод.`);
        // Продолжаем цикл - запрашиваем логин снова
        continue;
      } else {
        outputDiv.innerHTML = `<span style="color: red;">Ошибка: ${err.message}</span>`;
        throw err;
      }
    }
  }
}