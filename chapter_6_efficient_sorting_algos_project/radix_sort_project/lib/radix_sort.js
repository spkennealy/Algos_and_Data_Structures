function radixSort(arr) {
    if (!Array.isArray(arr)) {
        return null;
    }

    
}

const getDigitFrom = (num, place) => Math.floor(Math.abs(num)) / Math.pow(10, place) % 10;


module.exports = {
    radixSort
};