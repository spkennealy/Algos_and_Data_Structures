# Dynamic Programming: Memoization

Dynamic Programming is a design pattern used to solve a large problem by dividing it into smaller subproblems that are more manageable. Dynamic Programming will solve the subproblems efficiently, meaning that we avoid duplicate calculations and only "solve" each subproblem once by storing subsolutions in some additional data structure. 

### **Memoization**

The underlying idea of memoization is this: every time we call a function with a particular argument, we expect to get the same result every time. Memoization allows us to store the result of a function in an object so it can be recalled later on. There are two features that comprise Memoization:

* the function is recursive
* the additional data structure used is typically an object (we refer to this as the memo!)

#### Memoizing Factorial (kind of)

```javascript
let memo = {}

function factorial(n) {
    // if we have calculated factorial(n) previously, fetch the stored result in memo
    if (n in memo) return memo[n];
    if (n === 1) return 1;

    // otherwise, we have not calculated factorial(n) previously, so calculate it now,
    // but store the result in case we need it again in the future
    memo[n] = n * factorial(n - 1);
    return memo[n]
}

factorial(6);       // => 720, requires 6 calls
factorial(6);       // => 720, requires 1 call
factorial(5);       // => 120, requires 1 call
factorial(7);       // => 5040, requires 2 calls

memo;   // => { '2': 2, '3': 6, '4': 24, '5': 120, '6': 720, '7': 5040 }
```

The memo object above will map an argument of factorial to it's return value. That is, the keys will be arguments and their values will be the corresponding results returned. By using the memo, we are able to avoid duplicate recursive calls! Here's some food for thought: By the time our first call to factorial(6) returns, we will not have just the arg 6 stored in the memo. Rather, we will have all args 2 to 6 stored in the memo.

#### Memoizing Fib (actually)

```javascript
function fastFib(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n === 1 || n === 2) return 1;

    memo[n] = fastFib(n - 1, memo) + fastFib(n - 2, memo);
    return memo[n];
}

fastFib(6);     // => 8
fastFib(50);    // => 12586269025
```