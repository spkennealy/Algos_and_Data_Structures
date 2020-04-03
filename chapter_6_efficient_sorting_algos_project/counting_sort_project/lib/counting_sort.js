function countingSort(arr, max) {
    if (arr.length <= 1) return arr;
    
    let countArray = new Array(max + 1).fill(0);
    for (let i = 0; i < arr.length; i++) {
        countArray[arr[i]]++;
    }

    let result = [];
    for (let j = 0; j < countArray.length; j++) {
        while(countArray[j] > 0) {
            result.push(j);
            countArray[j]--;
        }
    }

    return result;
}


module.exports = {
    countingSort
};