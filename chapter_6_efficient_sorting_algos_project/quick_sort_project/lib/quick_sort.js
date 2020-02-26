function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let pivot = array.slice();
    let left = array.filter(a => a < pivot);
    let right = array.filter(b => b >= pivot);

    
}


module.exports = {
    quickSort
};