function radixSort(arr) {
    if (!Array.isArray(arr)) {
        return null;
    }

    
}

const getDigitFrom = (num, place) => Math.floor(Math.abs(num)) / Math.pow(10, place) % 10;

const getIntLength = (num) => (num == 0) ? 1 : Math.floor(Math.log10(Math.abs(num))) + 1;

module.exports = {
    radixSort
};