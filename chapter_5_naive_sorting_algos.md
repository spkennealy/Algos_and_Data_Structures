# Naive Sorting Algorithms

## Bubble Sort

Bubble Sort is generally the first major sorting algorithm to come up in most introductory programming courses. Learning about this algorithm is useful educationally, as it provides a good introduction to the challenges we face when tasked with converting unsorted data into sorted data, such as conducting logical comparisons, making swaps while iterating, and making optimizations. It's also quite simple to implement, and can be done quickly.

However...to be quite honest...

Bubble Sort is almost never a good choice in industry. simply because:
* It is not efficient.
* It is not commonly used.
* There is some n00bish stigma attached to using it :)

So don't be that engineer.

That said, it is quite useful as an educational base for us, and as a conversational base for you while interviewing, because we can discuss how other more elegant and efficient algorithms improve upon it, and taking naive code and improving upon it by weighing the technical tradeoffs of your other options is 100% the name of the game when trying to level yourself up from a junior engineer to a senior engineer.

### **The Algorithm: "Bubbling Up"**

As we progress through the algorithms and data structures of this course, you'll eventually notice that there are some reoccuring funny terms. "Bubbling up" is one of those terms.

When we say that an item in a collection "bubbles up," we imply that:
* The item is in motion.
* The item is moving in some direction.
* The item has some final resting destination.

When invoking Bubble Sort, if we are sorting an array of integers so that they occur in ascending order, the largest integers will "bubble up" to the "top" (the end) of the array, one at a time.

The largest values are captured, put into motion in the direction defined by our desired sort (ascending right now), and traverse the array until they arrive at their end destination. 

As we iterate through the array, we compare each element to its right neighbor. If the current element is larger than its neighbor, we swap them.

Wash, rinse, repeat, until all elements of the array are sorted.

### **How does a pass of Bubble Sort work?**

Bubble sort works by performing multiple passes to move elements closer to their final positions. A single pass will iterate through the entire array once.

A pass works by scanning the array from left to right, two elements at a time, and checking if they are ordered correctly. To be ordered correctly the first element must be less than or equal to the second. If the two elements are not ordered properly, then we swap them to correct their order. Afterwards, we scan the next two numbers and continue repeat this process until we have gone through the entire array.

Let's see one pass of bubble sort on the array [2, 8, 5, 2, 6]. On each step the elements currently being scanned are in boldL

* 2, 8, 5, 2, 6 - ordered, so leave them alone
* 2, 8, 5, 2, 6 - not ordered, so swap
* 2, 5, 8, 2, 6 - not ordered, so swap
* 2, 5, 2, 8, 6 - not ordered, so swap
* 2, 5, 2, 6, 8 - our first pass is complete

### **How do we know when we are done Bubble Sorting?**

During Bubble Sort, we can tell if the array is in sorted order by checking if we made a swap during the previous pass performed. If a swap was not performed during the previous pass, then the array must be totally sorted and we can stop the algorithm.

You're probably wondering why that makes sense. Recall that a pass of Bubble Sort checks if any adjacent elements are out of order and swaps them if they are. If we don't make any swaps during a pass, then everything must be already in order, so our job is done. Let that marinate for a bit.

### **Swapping Elements**

Like we saw in the previous example, Bubble Sort manipulates the array by swapping the position of two elements. To implement Bubble Sort in JS, we'll need to perform this operation, so let's build a helper function. A key detail in this function is that we need an extra letiable to store one of the elements since we will be overwriting them in the array:
```js
function swap(array, idx1, idx2) {
  let temp = array[idx1];     // save a copy of the first ele
  array[idx1] = array[idx2];  // overwrite the first ele with the second ele
  array[idx2] = temp;         // overwrite the second ele with the first ele copy
}
```

Note that the swap function does not create or return a new array. It mutates the original array:
```js
let arr1 = [2, 8, 5, 2, 6];
swap(arr1, 1, 2);
arr1; // => [ 2, 5, 8, 2, 6 ]
```

### **Bubble Sort JS Implementation**

Using swap and our newfound understanding of Bubble Sort, let's code! Take a look at the snippet below and try to understand how it corresponds to our conceptual understanding of the algorithm. Scroll down to the commented version when you get stuck.
```js
function bubbleSort(array) {
  let swapped = true;

  while(swapped) {
    swapped = false;

    for (let i = 0; i < array.length - 1; i++) {  
      if (array[i] > array[i+1]) {
        swap(array, i, i+1);
        swapped = true;
      }
    }
  }

  return array;
}
```

```js
// commented
function bubbleSort(array) {
  let swapped = true; // this variable will be used to track whether or not we made
                      // made a swap on the previous pass. If we did not make any
                      // swap on the previous pass, then the array must already be sorted

  // this while will keep doing passes if a swap was made on the previous pass
  while(swapped) {
    swapped = false;  // reset to swap to false

    // this for will perform a single pass
    for (let i = 0; i < array.length; i++) {  
      if (array[i] > array[i+1]) {  // if the two eles are not ordered...

        swap(array, i, i+1);          // swap them.

        swapped = true;               // since we made a swap, remember that we did so
                                      // b/c we should perform another pass after this one
      }
    }
  }

  return array;
}
```

## Time and Space Complexity Analysis

### **Time Complexity: O(n2)**

Picture the worst case scenario where our input array is completely unsorted. Let's say it's sorted in fully decreasing order, but our goal is to sort it in increasing order:
* n is the length of the inut array
* The inner for loop along contributes O(n) in isolation, this is plain to see
* The outer while loop contributes O(n) in isolation because a single iteration of the while loop will bring one element to it's final resting position. In other words, we keep running the while loop until the array is fully sorted. To fully sort the array we will need to bring all n elements into their final resting positions.
* Those two loops are nested so our total time complexity is O(n * n) = O(n2).

It's worst mentioning that the best case scenario is when the input array is already fully sorted. This will cause our for loop to conduct a single pass without performing any swap, so the while loop will not trigger further iterations. Thus means best case time complexity is O(n) for bubble sort. This best case linear time is probably the only advantage of bubble sort. We are mainly interested in the worst case as engineers, so overall we are not impressed.

### **Space Complexity: O(1)**

Bubble Sort is a constant space, O(1), algorithm. The amount of memory consumed by the algorithm does not increase relative to the size of the input array. We use the same amount of memory and create the same amount of letiables regardless of the size of our input, making this algorithm quite space efficient. The space efficiency mostly comes from the fact that we mutate the input array, in-place.

### **When should we use Bubble Sort?**

Nearly never, but it may be a good choice in the following list of special cases:
* When sorting really small arrays where run time will be negligible no matter what algorithm we choose.
* When sorting arrays that we expect to already be nearly sorted.
* At parties


## Selection Sort Notes

Selection Sort is very similar to Bubble Sort. The major difference between the two is that Bubble Sort bubbles the largest elements up to the end of the array, while Selection Sort selects the smallest elements of the array and directly places them at the beginning of the array in sorted position. Selection sort will utilize swapping just as bubble sort did. Let's carefully break this sorting algorithm down.

### **The Algorithm: "Select the next smallest"**

Selection sort works by maintaining a sorted region on the left side of the input array; this sorted region will grow by one element with every "pass" of the algorithm. A single "pass" of selection sort will select the next smallest element of unsorted region of the array and move it to the sorted region. Because a single pass of selection sort will move an element of the unsorted region into the sorted region, this means a single pass will shrink the unsorted region by 1 element whilst increasing the sorted region by 1 element. Selection sort is complete when the sorted region spans the entire array and the unsorted region is empty!

#### **Finding the Minimum Value**

Since a component of Selection Sort requires us to locate the smallest value in the array, let's focus on that pattern in isolation:
```js
function minumumValueIndex(arr) {
    let minIndex = 0;

    for (let j = 0; j < arr.length; j++) {
        if (arr[minIndex] > arr[j]) {
            minIndex = j;
        }
    }

    return minIndex;
}
```

Pretty basic code right? We won't use this explicit helper function to solve selection sort, however we will borrow from this pattern soon.

#### **Selection Sort JS Implementation**

We'll also utilize the classic swap pattern that we introduced in bubbleSort. To refresh:
```js
function swap(arr, index1, index2) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}
```

Now for the punchline! Take a look at the snippet below and try to understand how it corresponds to our conceptual understanding of the selection sort algorithm. Scroll down to the commented version when you get stuck.
```js
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }

    swap(arr, i, minIndex);
  }
  return arr;
}
```

```js
// commented
function selectionSort(arr) {
    // the `i` loop will track the index that points to the first element of the unsorted region:
    //    this means that the sorted region is everything left of index i
    //    and the unsorted region is everything to the right of index i
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;

        // the `j` loop will iterate through the unsorted region and find the index of the smallest element
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }

        // after we find the minIndex in the unsorted region,
        // swap that minIndex with the first index of the unsorted region
        swap(arr, i, minIndex);
    }
    return arr;
}
```

### **Time and Space Complexity Analysis**

#### **Time Complexity**

Selection Sort runtime is O(n2) because:
* n is the length of the input array
* The outer loop i contributes O(n) in isolation, this is plain to see
* The inner loop j is more complicated, it will make one less iteration for every iteration of i.
  * for example, let's say we have an array of 10 elements, n = 10.
  * the first full cycle of j will have 9 iterations
  * the second full cycle of j will have 8 iterations
  * the third full cycle of j will have 7 iterations
  * ...
  * the last full cycle of j will have 1 iteration
  * This means that the inner loop j will contribute roughly O(n / 2) on average
* The two loops are nested so our total time complexity is O(n * n / 2) = O(n2)

You'll notice that during this analysis we said something silly like O(n / 2). In some analyses such as this one, we'll prefer to drop the constants only at the end of the sketch so you understand the logical steps we took to derive a complicated time complexity.

#### **Space Complexity: O(1)**

The amount of memory consumed by the algorithm does not increase relative to the size of the input array. We use the same amount of memory and create the same amount of variables regardless of the size of our input. A quick indicator of this is the fact that we don't create any arrays.

#### **When should we use Selection Sort?**

There is really only one use case where Selection Sort becomes superior to Bubble Sort. Both algorithms are quadratic in time and constant in space, but the point at which they differ is in the number of swaps they make.

Bubble Sort, in the worst case, invokes a swap on every single comparison. Selection Sort only swaps once our inner loop has completely finished traversing the array. Therefore, Selection Sort is optimized to make the least possible number of swaps.

Selection Sort becomes advantageous when making a swap is the most expensive operation in your system. You will likely rarely encounter this scenario, but in a situation where you've built (or have inherited) a system with suboptimal write speed ability, for instance, maybe you're sorting data in a specialized database tuned strictly for fast read speeds at the expense of slow write speeds, using Selection Sort would save you a ton of expensive operations that could potential crash your system under peak load.

Though in industry this situation is very rare, the insights above make for a fantastic conversational piece when weighing technical tradeoffs while strategizing solutions in an interview setting. This commentary may help deliver the impression that you are well-versed in system design and technical analysis, a key indicator that someone is prepared for a senior level position.


## Insertion Sort

With Bubble Sort and Selection Sort now in our tool box, we're starting to get some experience points under our belt! Let's a learn another sort to round out our naive, slow category of sorting algorithms!

### **The Algorithm: "Insert into the sorted region"**

Insertion Sort is similar to Selection Sort in that it gradually builds up a larger and larger sorted region at the left-most end of the array.

However, Insertion Sort differs from Selection Sort because this algorithm does not focus on searching for the right element to place (the next smallest in our Selection Sort) on each pass through the array. Instead, it focuses on sorting each element in the order they appear from left to right, regardless of their value, and inserting them in the most appropriate position in the sorted region.

#### **The Steps**

Insertion Sort grows a sorted array on the left side of the input array by:
* Iterating across the input array one element at a time
* Selecting the current element
* Finding the position in the left sorted region that our element can be inserted whilst maintaining sorted order
* And inserting the current element into that position.

These steps are easy to confuse with selection sort, so you'll want to watch the video lecture and drawing that accompanies this reading as always!

#### **Insertion Sort JS Implementation**

Take a look at the snippet below and try to understand how it corresponds to our conceptual understanding of the Insertion Sort algorithm. Scroll down to the commented version when you get stuck:
```js
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currElement = arr[i];
    for (var j = i - 1; j >= 0 && currElement < arr[j]; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = currElement;
  }
  return arr;
}
```