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

