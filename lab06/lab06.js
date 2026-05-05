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





//  T A S K  2



function findGreater(arr, num) {
    let result = [];
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > num) {
            result.push(arr[i]);
        }
    }
    
    return result;
}


function flattenArray(arr) {
    let result = [];
    
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            let flat = flattenArray(arr[i]);
            for (let j = 0; j < flat.length; j++) {
                result.push(flat[j]);
            }
        } else {
            result.push(arr[i]);
        }
    }
    
    return result;
}



alert('Find elems greater then a number');
let greaterResult = findGreater([1, 4, 6, 3, 2], 2);
let output3 = '';
for (let i = 0; i < greaterResult.length; i++) {
    output3 += greaterResult[i];
    if (i < greaterResult.length - 1) output3 += ', ';
}
alert('findGreater([1, 4, 6, 3, 2], 2) = [' + output3 + ']');



alert('Flatten array');
let nested = [1, 4, [34, 1, 20], [6, [6, 12, 8], 6]];
let flatResult = flattenArray(nested);
let output4 = '';
for (let i = 0; i < flatResult.length; i++) {
    output4 += flatResult[i];
    if (i < flatResult.length - 1) output4 += ', ';
}
alert('flattenArray([1, 4, [34, 1, 20], [6, [6, 12, 8], 6]]) = [' + output4 + ']');




// T A S K  3


function countZeroPairs(arr) {
    let count = 0;
    let used = [];
    
    for (let i = 0; i < arr.length; i++) {
        used[i] = false;
    }
    
    for (let i = 0; i < arr.length; i++) {
        if (used[i]) continue;
        
        for (let j = i + 1; j < arr.length; j++) {
            if (!used[j] && arr[i] + arr[j] === 0) {
                count++;
                used[i] = true;
                used[j] = true;
                break;
            }
        }
    }
    
    return count;
}



alert('Count of inverse pairs');

alert('countZeroPairs([-7, 12, 4, 6, -4, -12, 0]) = ' + countZeroPairs([-7, 12, 4, 6, -4, -12, 0]));
alert('countZeroPairs([-1, 2, 4, 7, -4, 1, -2]) = ' + countZeroPairs([-1, 2, 4, 7, -4, 1, -2]));
alert('countZeroPairs([-1, 1, 0, 1]) = ' + countZeroPairs([-1, 1, 0, 1]));
alert('countZeroPairs([-1, 1, -1, 1]) = ' + countZeroPairs([-1, 1, -1, 1]));
alert('countZeroPairs([1, 1, 1, 0, -1]) = ' + countZeroPairs([1, 1, 1, 0, -1]));
alert('countZeroPairs([0, 0]) = ' + countZeroPairs([0, 0]));
alert('countZeroPairs([]) = ' + countZeroPairs([]));

