# Dynamic Programming: Tabulation

There are two main features that comprise the Tabulation strategy:

* the function is iterative and not recursive
* the additional data structure used is typically an array (we refer to this as the table!)

### **Tabulating Fib**

Tabulation is all about creating a table (array) and filling it out with elements. In general, we will complete the table by filling entries from left to right. This means that the first entry of our table (first element of the array) will correspond to the smallest subproblem. Naturally, the final entry of our table (last element of the array) will correspond to the largest problem, which is also our final answer.

```javascript
function tabulatedFib(n) {
    // create a blank array of length `n`
    let table = new Array(n);

    // seed the first two values
    table[0] = 0;               
    table[1] = 1;

    // complete the table by moving from left to right,
    // following the fibonacci pattern
    for (let i = 2; i <= n; i++) {
        table[i] = table[i - 1] + table[i - 2];
    }

    return table[n];
}

console.log(tabulatedFib(7));      // => 13
```

#### Complexity Analysis

The dominant operation in the function is the loop used to fill out the entire table. The length of the table is roughly `n` elements long, so our algorithm will have an O(n) runtime. The space taken by our algorithm is also O(n) due to the size of the table. 

#### Refactoring for O(1) Space

```javascript
function fib(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;

    let secondLast = 0
    let last = 1;

    for (let i = 2; i <= n; i++) {
        let temp = last;
        last = last + secondLast;
        secondLast = temp;
    }

    return last;
}
```

Note that this strategy is not quite Tabulation, since there is no table array being used. However, this still falls under the overarching category of Dynamic Programming since we saved previous subproblem results in order to calculate the final answer.

### **The Tabulation Formula**

Bear in mind that Dynamic Programming (whether it be by Tabulation or Memoization) is only applicable to problems that can be divided into many subproblems of similar structure. This is just a general recipe so adjust for taste depending on your problem:

1. Create the table array based off of the size of the input
    * this isn't always straightforward if you have multiple args
2. Initialize some values in the table that "answer" the trivially small subproblem
    * usually this means initializing the first entry of the table
3. Iterate through the array and fill in remaining entries
    * calculating the next entry should require using other entries of the table
4. Your final answer is the last entry in the table (usually)