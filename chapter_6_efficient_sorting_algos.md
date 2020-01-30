# Efficient Sorting Algorithms

## Merge Sort

We've explored a few sorting algorithms already, all of them being quite slow with a runtime of O(n2). It's time to level up and learn our first time efficent sorting algorithm! We'll explore mergeSort in detail soon, but let's jot down some key ideas for now. The following points are not steps to algorithm yet, rather they are ideas that will motivate how we will design this algorithm:
* it is easy to merge elements of two sorted arrays into a single sorted array
* we can consider an array containing only a single element as already trivially sorted
    * we can also consider an empty array as trivially sorted

### **The Algorithm: "Divide and Conquer"**

We're going to need a helper function that solves the first major point from above. How might we merge two sorted arrays? In other words we want a `merge` function that will behave like so:
```js
let arr1 = [1, 5, 10, 15];
let arr2 = [0, 2, 3, 7, 10];
merge(arr1, arr2); // => [0, 1, 2, 3, 5, 7, 10, 10, 15]
```

### **Merge**

Merging two sorted arrays is simple. Since both arrays are sorted, we know the smallest numbers to always be at the front of the arrays. We can construct the new array by comparing the first elements of both input arrays. We remove the smaller element from it's respective array and add it to our new array. Do this until both input arrays are empty:
```js
function merge(array1, array2) {
    let merged = [];

    while (array1.length || array2.length) {
        let ele1 = array1.length ? array1[0] : Infinity;
        let ele2 = array2.length ? array2[0] : Infinity;

        let next;
        if (ele1 < ele2) {
            next = array1.shift();
        } else {
            next = array2.shift();
        }

        merged.push(next);
    }

    return merged;
}
```

If your JavaScript is rusty, don't freak out! Here are a few cool JS patterns that we leverage above.
* 0 is considered a falsey value, meaning it acts like false when used in boolean expressions. All other numbers are truthy.
* Infinity is a value that is guaranteed to be greater than any other quantity
* shift is an array method that removes and returns the first element

Is the code still hazy? Let's look at an annotated version:
```js
// commented
function merge(array1, array2) {
    let merged = [];

    // keep running while either array still contains elements
    while (array1.length || array2.length) {
        // if array1 is nonempty, take its the first element as ele1
        // otherwise array1 is empty, so take Infinity as ele1
        let ele1 = array1.length ? array1[0] : Infinity;
        
        // do the same for array2, ele2
        let ele2 = array2.length ? array2[0] : Infinity;

        let next;
        // remove the smaller of the eles from it's array
        if (ele1 < ele2) {
            next = array1.shift();
        } else {
            next = array2.shift();
        }

        // and add that ele to the new array
        merged.push(next);
    }

    return merged;
}
```

By using Infinity as the default ele when an array is empty, we are able to elegantly handle the scenario where one array empties before the other. We know that any actual element will be less than Infinity so we will continually take the other element into our merged array.

In other words, we can safely handle this edge case:
```js
merge([10, 13, 15, 25], []);    // => [10, 13, 15, 25]
```

Nice! We now have a way to merge two sorted arrays into a single sorted array. It's worth mentioning that merge will have a O(n) runtime where n is the combined length of the two input arrays. This is what we meant when we said it was "easy" to merge two sorted arrays; linear time is fast! We'll find fact this useful later.

### **Merge Sort Recursion**

Now that we satisfied the merge idea, let's handle the second point. That is, we say an array of 1 or 0 elements is already sorted. This will be the base case of our recursion. Let's begin adding this code:
```js
function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }
    // ....
}
```

If our base case pretains to an array of a very small size, then the design of our recursive case should make progress toward hitting this base scenario. In other words, we should recursively call mergeSort on smaller and smaller arrays. A logical way to do this is to take the input array and split it into left and right halves.
```js
function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let midIdx = Math.floor(array.length / 2);
    let leftHalf = array.slice(0, midIdx);
    let rightHalf = array.slice(midIdx);

    let sortedLeft = mergeSort(leftHalf);
    let sortedRight = mergeSort(rightHalf);
    // ...
}
```

Here is the part of the recursion where we do a lot of hand waving and we take things on faith. We know that mergeSort will take in an array and return the sorted version; we assume that it works. That means the two recursive calls will return the sortedLeft and sortedRight halves.

Okay, so we have two sorted arrays. We want to return one sorted array. So merge them! Using the `merge` function we designed earlier:
```js
function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let midIdx = Math.floor(array.length / 2);
    let leftHalf = array.slice(0, midIdx);
    let rightHalf = array.slice(midIdx);

    let sortedLeft = mergeSort(leftHalf);
    let sortedRight = mergeSort(rightHalf);
    
    return merge(sortedLeft, sortedRight);
}

```

Wow. that's it. Notice how light the implementation of mergeSort is. Much of the heavy lifting (the actually comparisons) is done by the merge helper.

`mergeSort` is a classic example of a "Divide and Conquer" algorithm. In other words, we keep breaking the array into smaller and smaller sub arrays. This is the same as saying we take the problem and break it down into smaller and smaller subproblems. We do this until the subproblems are so small that we trivially know the answer to them (an array length 0 or 1 is already sorted). Once we have those subanswers we can combine to reconstruct the larger problems that we previously divided (merge the left and right subarrays).