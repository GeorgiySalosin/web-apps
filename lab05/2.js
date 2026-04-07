 alert("task 2.1");

function firstUniqueChar(str) {
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        if (str.indexOf(char) === str.lastIndexOf(char)) {
            return char;
        }
    }
    return null;
}
a = prompt("Строка: ", "фывфавыапрс");

alert(firstUniqueChar(a));

 alert("task 2.2");
function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    return result;
}

a = Number(prompt("Длина паролля: ", 5));
alert(generateRandomString(a));


alert("task 2.3");
function getUniqueChars(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        if (result.indexOf(char) === -1) {
            result += char;
        }
    }
    return result;
}
a = prompt("Строка: ", "позволяеткопироватьтекстиз");
alert(getUniqueChars(a)); 