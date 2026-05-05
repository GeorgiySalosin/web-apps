alert("task 5.");

let number;
do 
{
    number = prompt("Введите число больше 100", 0);
    if (number === null) break; 
} 
while (Number(number) <= 100);

if (number !== null) 
{
    alert(`Вы ввели ${number}`);
}



alert("task 6.");

function showPrimes(n) 
{
    for (let i = 2; i <= n; i++) 
    {
        let isPrime = true;
        
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        
        if (isPrime) 
        {
            alert(i);
        }
    }
}

a = Number(30);

showPrimes(a); 