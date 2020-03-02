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

### **Merge Sort JS Implementation**

Here is the full code for your reference:
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

### **Time and Space Complexity Analysis**

The complexity analysis of this algorithm is easier to explain through visuals, so we highly encourage you to watch the lecture that accompanies this reading. In any case, here is a summary of the complexity:

#### **Time Complexity: O(n log(n))**
* n is the length of the input array
* We must calculate how many recursive calls we make. The number of recursive calls is the number of times we must split the array to reach the base case. Since we split in half each time, the number of recursive calls is O(log(n)).
    * for example, say we had an array of length 32
    * then the length would change as 32 -> 16 -> 8 -> 4 -> 2 -> 1, we have to split 5 times before reaching the base case, log(32) = 5
    * in our algorithm, log(n) describes how many times we must halve n until the quantity reaches 1.
* Besides the recursive calls, we must consider the while loop within the merge function, which contributes O(n) in isolation
* We call merge in every recursive mergeSort call, so the total complexity is O(n * log(n))

#### **Space Complexity: O(n)**

Merge Sort is the first non-O(1) space sorting algorithm we've seen thus far.

The larger the size of our input array, the greater the number of subarrays we must create in memory. These are not free! They each take up finite space, and we will need a new subarray for each element in the original input. Therefore, Merge Sort has a linear space complexity, O(n).

#### **When should we use Merge Sort?**

Unless we, the engineers, have access in advance to some unique, exploitable insight about our dataset, it turns out that O(n log n) time is the best we can do when sorting unknown datasets.

That means that Merge Sort is fast! It's way faster than Bubble Sort, Selection Sort, and Insertion Sort. However, due to its linear space complexity, we must always weigh the tradeoff between speed and memory consumption when making the choice to use Merge Sort. Consider the following:
* If you have unlimited memory available, use it, it's fast!
* If you have a decent amount of memory available and a medium sized dataset, run some tests first, but use it!
* If you have very limited memory and you've got time to kill, maybe you should consider other options.
* If you have very limited memory and no time to kill...well, you're going to have to do some data analysis to look for some exploitable feature of the data set, but that takes human time.


## Quick Sort

Time for another efficient sorting algorithm! Let's learn quickSort. Like we did previously for mergeSort, let's build up the the algorithm together. You'll see that quickSort has a similar "divide and conquer" strategy to mergeSort. Here are a few key ideas that will motivate our design:
* it is easy to sort elements of an array relative to a particular target value
    * for example given [7, 3, 8, 9, 2] and a target of 5, we know [3, 2] are numbers less than 5 and [7, 8, 9] are numbers greater than 5.
* we can consider an array of 0 or 1 elements as already trivially sorted

### **How does it work?**

In general, the strategy is to divide the input array into two subarrays; one with the smaller elements, and one with the larger elements. Then, it recursively operates on the two new subarrays, and continues this process until we reach subarrays of length 1 or smaller. As we have seen with Merge Sort, arrays of such length are automatically sorted (for obvious reasons).

The steps, when discussed on a high level, are simple:
* Select one element called the "pivot". (This step varies by the implementation.)
    * Find the index in the final output at which the pivot element should end up. To do this:
* Move all elements smaller than the pivot to the pivot's left, and all elements greater than than the pivot to the pivot's right.
* Repeat the process, individually, for the left side, and then for the right side, by recursively calling Quick Sort on each subarray.

### **The Algorithm: "Divide and Conquer"**

Let's hone in on the first major point above. Formally, we want to partition elements of an array relative to a pivot value. That is, we want elements less than the pivot to be separated from elements that are greater than or equal to the pivot. Our goal is to create a function with this behavior:
```js
let arr = [7, 3, 8, 9, 2];
partition(arr, 5);  // => [[3, 2], [7,8,9]]
```

#### **Partition**

Seems simple enough! Let's implement it in JavaScript:
```js
// nothing fancy
function partition(array, pivot) {
    let left = [];
    let right = [];

    array.forEach(el => {
        if (el < pivot) {
            left.push(el);
        } else {
            right.push(el);
        }
    });

    return [ left, right ];
}

// if you fancy
function partition(array, pivot) {
    let left = array.filter(el => el < pivot);
    let right = array.filter(el => el >= pivot);
    return [ left, right ];
}
```

Both of the above implementations are correct, but we'll use the second one as it is cleaner. It's worth mentioning that the partition function will have a runtime of O(n). forEach and filter both have linear, O(n), time complexity. Although our fancy partition does filter twice, this is a constant we drop, O(2n) = O(n). Linear time is fast so we are quite happy with partition.

We won't be using an explicit partition helper function in our quickSort implementation, however we will borrow heavily from this pattern. As you design algorithms, it helps to think about key patterns in isolation, although your solution may not feature that exact helper. Some would say we like to divide and conquer :).

#### **Quick Sort Recursion**

Let's begin structuring the recursion. The base case of any recursive problem is where the input is so trivial, we immediately know the answer without calculation. If our problem is to sort an array, what is the trivial array? An array of 1 or 0 elements! Let's establish the code:
```js
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }
    // ...
}
```

If our base case pretains to an array of a very small size, then the design of our recursive case should make progress toward hitting this base scenario. In other words, we should recursively call quickSort on smaller and smaller arrays. This is very similar to our previous mergeSort, except we don't just split the array down the middle. Instead we should arbitrarily choose an element of the array as a pivot and partition the remaining elements relative to this pivot:
```js
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let pivot = array.shift();
    let left = array.filter(el => el < pivot);
    let right = array.filter(el => el >= pivot);
    // ...
```

Here is what to notice about the parition step above: 1. the pivot is an element of the array; we arbitrarily chose the first element 2. we removed the pivot from the master array before we filter into the left and right partitions

Now that we have the two subarrays of left and right we have our subproblems! To solve these subproblems we must sort the subarrays. I wish we had a function that sorts an array...oh wait we do, quickSort! Recursively:
```js
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let pivot = array.shift();
    let left = array.filter(el => el < pivot);
    let right = array.filter(el => el >= pivot);

    let leftSorted = quickSort(left);
    let rightSorted = quickSort(right);
    // ...
```

Okay, so we have the two sorted partitions. This means we have the two subsolutions. But how do we put them together? Think about how we partitioned them in the first place. Everything in leftSorted is guaranteed to be less than everything in rightSorted. On top of that, pivot should be placed after the last element in leftSorted, but before the first element in rightSorted. So all we need to do is to combine the elements in the order "left, pivot, right"!
```js
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let pivot = array.shift();
    let left = array.filter(el => el < pivot);
    let right = array.filter(el => el >= pivot);

    let leftSorted = quickSort(left);
    let rightSorted = quickSort(right);

    return leftSorted.concat([pivot]).concat(rightSorted);
}
```

That last concat line is a bit clunky. Bonus JS Lesson: we can use the spread ... operator to elegantly concat arrays. In general:
```js
let one = ['a', 'b']
let two = ['d', 'e', 'f']
let newArr = [ ...one, 'c', ...two  ];
newArr; // =>  [ 'a', 'b', 'c', 'd', 'e', 'f' ]
```

Utilizing that spread pattern gives us this final implementation:
```js
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let pivot = array.shift();
    let left = array.filter(el => el < pivot);
    let right = array.filter(el => el >= pivot);

    let leftSorted = quickSort(left);
    let rightSorted = quickSort(right);

    return [ ...leftSorted, pivot, ...rightSorted ];
}
```

#### **Quicksort Sort JS Implementation**

That code was so clean we should show it again. Here's the complete code for your reference, for when you ctrl+F "quicksort" the night before an interview:
```js
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let pivot = array.shift();
    let left = array.filter(el => el < pivot);
    let right = array.filter(el => el >= pivot);

    let leftSorted = quickSort(left);
    let rightSorted = quickSort(right);

    return [ ...leftSorted, pivot, ...rightSorted ];
}
```

### **Time and Space Complexity Analysis**

The complexity analysis of this algorithm is easier to explain through visuals, so we highly encourage you to watch the lecture that accompanies this reading. In any case, here is a summary of the complexity.

#### **Time Complexity**
* Avg Case: O(n log(n))
* Worst Case: O(n2)

The runtime analysis of quickSort is more complex than mergeSort
* n is the length of the input array
* The parititon step alone is O(n)
* We must calculate how many recursive calls we make. The number of recursive calls is the number of times we must split the array to reach the base case. This is dependent on how we choose the pivot. Let's analyze the best and worst case:
    * Best Case: We are lucky and always choose the median as the pivot. This means the left and right partitions will have equal length. This will halve the array length at every step of the recursion. We benefit from this halving with O(log(n)) recursive calls to reach the base case.
    * Worst Case: We are unlucky and always choose the min or max as the pivot. This means one partition will contain everything, and the other partition is empty. This will decrease the array length by 1 at every step of the recursion. We suffer from O(n) recursive calls to reach the base case.
* The parition step occurs in every recursive call, so our total complexities are:
    * Best Case: O(n * log(n))
    * Worst Case: O(n2)

Although we typically take the worst case when describing Big-O for an algorithm, much research on quickSort has shown the worst case to be an exceedingly rare occurance even if we choose the pivot at random. Because of this we still consider quickSort an efficient algorithm. This is a common interview talking point, so you should be familiar with the relationship between the choice of pivot and efficiency of the algorithm.

Just in case: A somewhat common question a student may ask when studying quickSort is, "If the median is the best pivot, why don't we always just choose the median when we partition?" Don't overthink this. To know the median of an array, it must be sorted in the first place.]

#### **Space Complexity**

Our implementation of quickSort uses O(n) space because of the partition arrays we create. There is an in-place version of quickSort that uses O(log(n)) space. O(log(n)) space is not huge benefit over O(n). You'll also find our version of quickSort as easier to remember, easier to implement. Just know that a O(logn) space quickSort exists.

#### **When should we use Quick Sort?**
* When you are in a pinch and need to throw down an efficent sort (on average). The recursive code is light and simple to implement; much smaller than mergeSort.
* When constant space is important to you, use the in-place version. This will of course trade off some simplicity of implementation.

If you know some constraints about dataset you can make some modifications to optimize pivot choice. Here's some food for thought. Our implementation of quickSort will always take the first element as the pivot. This means we will suffer from the worst case time complexity in the event that we are given an already sorted array (ironic isn't it?). If you know your input data to be mostly already sorted, randomize the choice of pivot - this is a very easy change. Bam. Solved like a true engineer.


## Radix Sort Notes

Radix Sort is a non-comparison, integer sorting algorithm. Its time complexity is superior to every other sorting algorithm we've encountered thus far, but it can only be used in the special case where we are strictly sorting integer data.

Radix Sort is most often used on lists of binary numbers, but that doesn't mean that its only application is to sort cryptic machine code! All sorts of data can be converted into binary format before being processed, including long strings of text and image data. Regardless of the type of data we'd like to sort, it is critical that all data be converted to binary (or some other integer representation) before Radix Sort is invoked.

But have no fear! For the sake of simplicity, we'll be exploring Radix Sort while working with standard base 10 integers, rather than with binary numbers.

### **Why Integer Data?**

The reason we can only run Radix Sort on integer data is because it works by exploiting some specific properties of that data type. Numbers have meta information about themselves baked into their representation - and we're going to take advantage of it.

Claim: We can determine the relative size of an integer based on the number of digits it has.

When working with positive numbers, we know that any 3 digit number is greater than any other 2 digit number. The individual digits themselves are irrelevant. We can write our algorithm without actually comparing any values, simply sorting based on an integer's digit-length.

If we are clever, we can do the same for lists of integers that include both positive and negative numbers.

### **How Does it work?**

Radix sort is actually pretty simple. Given a list of integers:

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/efficient_sorting_algorithms/radix_sort/images/Radix-Sort-1.png)

**Step 1:**

First, we create ten buckets, each representing a single digit from 0-9:

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/efficient_sorting_algorithms/radix_sort/images/Radix-Sort-2.png)

Next, we iterate across the entire list of integers, looking only at the digit in the one's place for each integer:

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/efficient_sorting_algorithms/radix_sort/images/Radix-Sort-3.png)

* If the digit in the one's place is a 0, we add that integer to the 0 bucket.
* If the digit in the one's place is a 1, we add that integer to the 1 bucket.
* If the digit in the one's place is a 2, we add that integer to the 2 bucket.
* ...
* If the digit in the one's place is a 9, we add that integer to the 9 bucket.

After we've addressed all integers in the list, we wind up with something like this:

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/efficient_sorting_algorithms/radix_sort/images/Radix-Sort-4.png)

NOTE: The integers in each bucket need not be sorted! We are simply grouping integers by their one's place digit.

Finally, we create new list by extracting each number from the buckets, 0-9, in the order which they appear. Now we have a list of numbers sorted by their last digit only!

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/efficient_sorting_algorithms/radix_sort/images/Radix-Sort-4_5.png)

**Step 2:**

If there are any integers in our input that have two or more digits, we must repeat this process for the 10's place.

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/efficient_sorting_algorithms/radix_sort/images/Radix-Sort-5.png)

If an integer doesn't have a digit in the 10's place (e.g. 3 or 7), we consider that integer's 10's place digit to be 0.

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/efficient_sorting_algorithms/radix_sort/images/Radix-Sort-6.png)

Now we have a list of numbers sorted by their last two digits only!

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/efficient_sorting_algorithms/radix_sort/images/Radix-Sort-7.png)

**Step 3:**

If there are any integers in our input that have three or more digits, we must repeat this process for the 100's place.

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/efficient_sorting_algorithms/radix_sort/images/Radix-Sort-8.png)

If an integer doesn't have a digit in the 100's place (e.g. 33 or 77), we consider that integer's 100's place digit to be 0.

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/efficient_sorting_algorithms/radix_sort/images/Radix-Sort-9.png)

Now we have a list of numbers sorted by their last three digits only!

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/efficient_sorting_algorithms/radix_sort/images/Radix-Sort-10.png)

This process continues until we have addressed all digits of the largest integer in our list.

NOTE: Not a single logical comparison (===, !==, >, <, >=, <=, etc.) was made. We completed our process exclusively by exploiting a special property of the given data type (integers).

**Final Step:**

Return the final copy of your list. It's sorted!

See if you can observe the behavior described above in the following animation:

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/efficient_sorting_algorithms/radix_sort/images/RadixSort.gif)