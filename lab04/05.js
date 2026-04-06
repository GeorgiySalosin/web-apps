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
