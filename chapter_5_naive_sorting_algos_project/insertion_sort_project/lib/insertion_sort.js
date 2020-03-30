function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++)
    {
        let currEl = arr[i];
        for (var j = i - 1; j >= 0 && currEl < arr[j]; j--)
        {
            arr[j + 1] = arr[j];
        }

        arr[j + 1] = currEl;
    }

    return arr;
}

module.exports = {
    insertionSort
};