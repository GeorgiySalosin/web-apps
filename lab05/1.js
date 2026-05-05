// валидация на тип данных  без разницы ??


// 1
alert("task 1");
let a = prompt("Число?", 123);
function reverseNumber(num) {
    return parseInt(num.toString().split('').reverse().join(''));
}

alert("реверснуто: " + reverseNumber(a));

// 2
alert("task 2");
function removeDuplicates(num) {
    let str = num.toString();
    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (result.indexOf(str[i]) === -1) {
            result += str[i];
        }
    }
    return parseInt(result);
}

a = prompt("Число?", 111333456);
alert("очищено от дубликатов: " + removeDuplicates(a)); 



//3
alert("task 3");
function countDigit(num, digit) {
    let count = 0;
    let str = num.toString();
    let digitStr = digit.toString();
    for (let i = 0; i < str.length; i++) {
        if (str[i] === digitStr) {
            count++;
        }
    }
    return count;
}
a = prompt("Число?", 1355567);
let b = prompt("Повторяющаяся цифра?", 5);
alert("цифра повторяется " + countDigit(1355567, 5)); 


// 4
alert("task 4");

function longestSequence(num) {

    let binary = num.toString(2);
    let maxLength = 0;
    let currentLength = 1;
    
    for (let i = 1; i < binary.length; i++) {
        if (binary[i] === binary[i-1]) {
            currentLength++;
        } else {
            maxLength = Math.max(maxLength, currentLength);
            currentLength = 1;
        }
    }
    maxLength = Math.max(maxLength, currentLength);
    
    return maxLength;
}

a = Number(prompt("Число?", 125));

alert("самая длинная последовательность нулей или единиц: " + longestSequence(a) + 
      "\nчисло: " + a.toString(2));