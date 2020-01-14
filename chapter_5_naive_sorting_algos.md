# Naive Sorting Algorithms

### **Bubble Sort**

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

