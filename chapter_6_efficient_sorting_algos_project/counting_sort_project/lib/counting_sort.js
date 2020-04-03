function countingSort(arr, max) {
    if (arr.length <= 1) return arr;
    
    let countArray = Array.from({ length: max }, 0);
    for (let i = 0; i < arr.length; i++) {
        countArray[arr[i]] = arr[i];
    }

    let result = [];
    for (let j = 0; j < countArray.length; j++) {
        if (countArray[j] != 0) {
            while(countArray[j] > 0) {
                result.push(j);
                countArray[j]--;
            }
        }
    }

    return result;
}


module.exports = {
    countingSort
};