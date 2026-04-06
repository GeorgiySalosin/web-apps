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

let a = Number(100);

showPrimes(a); 

