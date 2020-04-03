# Binary Search

We've explored many ways to sort arrays so far, but why did we go through all of that trouble? By sorting elements of an array, we are organizing the data in a way that gives us a quick way to look up elements later on. For simplicity, we have been using arrays of numbers up until this point. However, these sorting concepts can be generalized to other data types. For example, it would be easy to modify our comparison-based sorting algorithms to sort strings: instead of leveraging facts like 0 < 1, we can say 'A' < 'B'.

Think of a dictionary. A dictionary contains alphabetically sorted words and their definitions. A dictionary is pretty much only useful if it is ordered in this way. Let's say you wanted to look up the definition of "stupendous." What steps might you take?
* you open up the dictionary at the roughly middle page
    * you land in the "m" section
* you know "s" comes somewhere after "m" in the book, so you disregard all pages before the "m" section. Instead, you flip to the roughly middle page between "m" and "z"
    * you land in the "u" section
* you know "s" comes somewhere before "u", so you can disregard all pages after the "u" section. Instead, you flip to the roughly middle page between the previous "m" page and "u"
* ...

You are essentially using the binarySearch algorithm in the real world.

## The Algorithm: "check the middle and half the search space"

Formally, our binarySearch will seek to solve the following problem:
```js
/// Given a sorted array of numbers and a target num, return a boolean indicating whether or not that target is contained in the array.
```

Programmatically, we want to satisfy the following behavior:
```js
binarySearch([5, 10, 12, 15, 20, 30, 70], 12);  // => true
binarySearch([5, 10, 12, 15, 20, 30, 70], 24);  // => false
```

Before we move on, really internalize the fact that binarySearch will only work on sorted arrays! Obviously we can search any array, sorted or unsorted, in O(n) time. But now our goal is be able to search the array with a sub-linear time complexity (less than O(n)).