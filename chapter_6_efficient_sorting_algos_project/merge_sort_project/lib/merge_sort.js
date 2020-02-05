function merge(array1, array2) {
    let merged = [];

    while (array1.length || array2.length)
    {
        if (array1[0] > array2[0])
        {
            merged.push(array2.shift);
        }
        else
        {
            merged.push(array1.shift);
        }
    }

    return merged.contact(array1.concat(array2));
}

function mergeSort(array) {

}

module.exports = {
    merge,
    mergeSort
};