function swap(arr, index1, index2) {
    let temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    return arr;
}

function selectionSort(arr) {

}

module.exports = {
    selectionSort,
    swap
};