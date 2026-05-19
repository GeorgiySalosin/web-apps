// TASK 1

//1
function counter(n) {
  let current = n;
  
  const intervalId = setInterval(() => {
    console.log(current);
    
    if (current === 0) {
      clearInterval(intervalId);
    }
    
    current--;
  }, 1000);
}

