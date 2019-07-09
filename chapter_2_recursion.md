# Recursion

### Anatomy of a Recursive Function
In recursive functions, we need to implement a way to stop the recursive loop and prevent it from looping forever. We took care of the infinite loop issue in our `countDown` by using an if statement that prevents another recursive call. In general, we call such a statement the base case

```javascript
function countDown(num) {
    // base case
    if (num === 0) {
        console.log("Houston, we have lift-off!");
        return;
    }

    // recursive case
    console.log(num);
    countDown(num - 1);
}

countDown(10);  // prints numbers from 10 to 1, and finally "Houston, we have lift-off!"
```

A recursive function consists of two fundamental parts:
* the base case where we halt the recursion by not making a further call
* the recursive step where we continue the recursion by making another subsequent call

### **Recursive Factorial Example**
```javascript
// Write a method `factorial(n)` which takes a number and returns the factorial of n.
// A factorial is the product of all whole numbers between 1 and n, inclusive.
// For example, `factorial(5)` is 5 * 4 * 3 * 2 * 1 = 120.

function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}
```

### **Solving a Problem Recursively:**
Because every recursive problem must have a base and recursive case, we can follow these steps to help us write a recursive method:

1. Identify the base case in the problem and code it. The base case should explicity handle the scenario(s) where the arguments are so trivially "small", that we immediately know the result without further calculation. Be sure it works by testing it.
2. Solve the next level of the problem, using the result of the base case. Test it.
3. Modify the code in step 2, generalizing it for every level of the problem.

### **Recursive Fibonacci Example**
```javascript
// Write a method fib(n) that takes in a number and returns the nth number of
// the fibonacci sequence.
//
// In the fibonacci sequence, the 1st number is 1 and the 2nd number is 1. To generate the
// next number in the sequence, we take the sum of the previous two fibonacci numbers.
// For example the first 5 numbers of the fibonacci sequence are `1, 1, 2, 3, 5`

function fibonacci(n) {
    if (n <= 1 || n === 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
```

### **When is recursion appropriate?**
Recursion allows us to solve problems in an elegant way. However, recursion is a tool that is only appropriate for certain problems. Look to the struture of a problem to figure out if it can be solved recursively. Recursion is used to solve problems that can be decomposed into smaller versions of the same problem. For example we can decompose fib(n) into fib(n - 1) + fib(n - 2). Intuitively, we know that fib(n - 1) is a "smaller" or "easier" problem than fib(n). The easiest subproblem is fib(1) or fib(2) because the answer is simply 1; this is an assumption in the fibonacci sequence. We use the easiest subproblems as the base case in recursion.