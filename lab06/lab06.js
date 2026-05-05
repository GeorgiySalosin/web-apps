    // A R R A Y S

    function maxDifference(arr) {
    if (arr.length < 2) return 0;
    
    let min = arr[0];
    let max = arr[0];
    
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    
    return max - min;
}



function removeDuplicatesArray(arr) {
    let result = [];
    
    for (let i = 0; i < arr.length; i++) {
        let isDuplicate = false;
        
       
        for (let j = 0; j < result.length; j++) {
            if (result[j] === arr[i]) {
                isDuplicate = true;
                break;
            }
        }
        
        
        if (!isDuplicate) {
            result[result.length] = arr[i];
        }
    }
    
    return result;
}


function filterByDone(arr) {
    let result = [];
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].isDone === true) {
            result[result.length] = arr[i];
        }
    }
    
    return result;
}


alert('1.');
alert('Max difference for [10, 2, 8, 1, 15]:');
alert(maxDifference([10, 2, 8, 1, 15])); // 14

alert('Max difference for [5, 5, 5]:');
alert(maxDifference([5, 5, 5])); // 0

alert('\nRemove dublicates from [1, 2, 2, 3, 4, 4, 5]:');
alert(removeDuplicatesArray([1, 2, 2, 3, 4, 4, 5])); // [1, 2, 3, 4, 5]

alert('\nShow only done tasks');

let tasks = [
    {id: 1, isDone: true}, 
    {id: 2, isDone: false},
    {id: 3, isDone: true}
];

// alert(filterByDone(tasks));

let result = filterByDone(tasks);

let output = "";

// 
for (let i = 0; i < result.length; i++) {
    output += `Объект: id=${result[i].id}, isDone=${result[i].isDone}\n`;
}
alert(output);
