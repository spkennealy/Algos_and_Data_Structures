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