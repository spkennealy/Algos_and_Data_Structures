# Complexity Analysis

| Growth Rate  | Function    | Function Notation                                          | Big O Notation   |
|--------------|-------------|------------------------------------------------------------|------------------|
| small growth | Constant    | f(n) = 1                                                   | O(1)             |
| -----↓-----  | Logarithmic | f(n) = log(n)                                              | O(log(n))        |
| -----↓-----  | Linear      | f(n) = n                                                   | O(n)             |
| -----↓-----  | Loglinear   | f(n) = n * log(n)                                          | O(nlog(n))       |
| -----↓-----  | Polynomial  | f(n) = n<sup>2</sup> or n<sup>3</sup> or n<sup>4</sup> ... | O(n<sup>2</sup>) |
| -----↓-----  | Exponential | f(n) = 2<sup>n</sup> or 3<sup>n</sup> or 4<sup>n</sup> ... | O(2<sup>n</sup>) |
| large growth | Factorial   | f(n) = n!                                                  | O(n!)            |

"The job of the software engineer is to focus on the software detail and not necessarily the hardware it will run on."


### Big O Notation

1. The function should be defined in terms of the size of the input(s).
2. A smaller Big-O function is more desirable than a larger one. Intuitively, we want our algorithms to use the minimal amount of time and memory possible.
3. Big-O describes the worst case scenario, also known as the upper-bound. We prepare our algorithm for the worst-case, because the best-case is a luxury we can't guarantee.
4. A Big-O function should be simplified to show only it's most dominant mathematical term.

We want our Big-O notation to describe the performance of our algorithm with respect to the input size and nothing else. Because of this, we should to simplify our Big-O functions using the following rules:

* **Simplify Products**: if the function is a product of many factors, we drop the factors that don't depend on the size of the input.
* **Simplify Sums**: if the function is a sum of many terms, we keep the term with the largest growth rate and drop the other terms.

Definitions:
* n is the size of the input
* T(f) refers to the unsimplified function
* O(f) refers to the Big-O simplified function

The reasoning behind this simplification is that we make the input large enough, the non-constant factors will overshadow the constant ones.

Examples of Simplifying a Product:

| **Unsimplified**     | **Big-O Simplified** |
|----------------------|----------------------|
| T(5 * n<sup>2</sup>) | O(n<sup>2</sup>)     |
| T(100000 * n)        | O(n)                 |
| T(42 * n * log(n))   | O(n * log(n))        |
| T(12)                | O(1)                 |


Examples of Simplifying a Sum:

| **Unsimplified**                     | **Big-O Simplified** |
|--------------------------------------|----------------------|
| T(n<sup>3</sup> + n<sup>2</sup> + n) | O(n<sup>3</sup>)     |
| T(log(n) + 2<sup>n</sup>)            | O(2<sup>n</sup>)     |
| T(n + log(n))                        | O(n)                 |
| T(n! + 10n)                          | O(n!)                |


### Exercise
It's your turn. Write the Big-O simplified versions of the following functions.

| **Unsimplified**                            | **Big-O Simplified** |
|---------------------------------------------|----------------------|
| T(n<sup>2</sup> + 10 * 2<sup>n</sup> + 500) | O(2<sup>n</sup>)     |
| T(log(n) + n + nlog(n))                     | O(nlog(n))           |
| T(n! + 24n + 2log(n))                       | O(n!)                |
| T(n * 3<sup>n</sup> + n<sup>2</sup>)        | O(n3<sup>n</sup>)    |


### Common Complexity Classes

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/complexity_analysis/complexity_classes.png)

#### Constant - O(1)
Constant (O(1)) complexity means that the algorithm takes roughly the same number of steps for any size input. In a constant time algorithm there is no relationship between the size of the input and the number of steps required. Classic Example: Checking if a key exists in a JavaScript Object.

```javascript
function constant_1(n) {
    return n * 2 + 1;
}

function constant_2(n) {
    for (let i = 1; i <= 100; i++) {
        console.log(i);
    }
}
```

#### Logarithmic - O(log(n))
Typically, the hidden base in O(log(n)) is 2, meaning O(log2(n)). Logarithmic complexity algorithms will typically have a sense of continually "halving" the size of the input. Another tell of a Logarithmic algorithm is that we don't have to touch every element of the input. O(log2(n)) means that every time we double the size of the input, we only require one additional step. Overall, this means that a large increase of input size will increase the number of steps required by a small amount. Classic Example: Binary Search Algorithm.

```javascript

function logarithmic(n) {
    if (n <= 1) return;
    logarithmic(n / 2);
}
```

#### Linear - O(n)
Linear complexity algorithms will touch each element of the input "once" (in the Big-O sense). Algorithms that iterate through the input without nested loops or recurse by reducing the size of the input by "one" each time are typically Linear. Classic Example: Checking if an element exists in an Array.

```javascript

function linear_1(n) {
    for (let i = 1; i <= n; i++) {
        console.log(i);
    }
}

function linear_2(n) {
    if (n <= 1) return;
    linear_2(n - 1);
}
```

#### Loglinear - O(nlog(n))
This complexity class is common in recursive sorting algorithms such as mergeSort and quickSort. This class is a combination of both linear and logarithmic behavior, so features from both classes are evident. Typically, this means that the recursive calls will halve the input each time (logarithmic), but iterations are also performed (linear). Classic Example: Merge Sort Algorithm.

```javascript

function loglinear(n) {
    if (n <= 1) return;
    for (let i = 1; i <= n; i++) {
        console.log(i);
    }
    loglinear(n / 2);
    loglinear(n / 2);
}
```

#### Polynomial - O(n^c)
Polynomial complexity refers to complexity of the form O(nc) where n is the size of the input and c is some fixed constant. For example, O(n3) is a larger/worse function than O(n2), but they belong to the same complexity family. Nested loops are usually the indicator of this complexity class. Classic Examples: Generate all pairs of elements in an array (n2). Generate all triplets of elements in an array (n3).

```javascript
// Polynomial - O(n^2)
function quadratic(n) {
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n: j++) {
            console.log(i, j);
        }
    }
}

// Polynomial - O(n^3)
function cubic(n) {
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n: j++) {
            for (let k = 1; k <= n: k++) {
                console.log(i, j, k);
            }
        }
    }
}
```

#### Exponential - O(c^n)
Exponential complexity refers to functions of the form O(cn) where n is the size of the input and c is some fixed constant. For example, O(3n) is a larger/worse function than O(2n), but they both belong to the same complexity family. A common indicator of this complexity class is recursive code where there is a constant number of recursive calls in each stack frame. The c will be the number of recursive calls made in each stack frame. Algorithms with this complexity are considered quite slow. Classic Example: Generate all subsets/combinations of elements in an array (O(2n)). In subsets/combinations, the order does not matter.

```javascript
// Exponential - O(2^n) 
function exponential_2n(n) {
    if (n === 1) return;
    exponential_2n(n - 1);
    exponential_2n(n - 1);
}

// Exponential - O(3^n) 
function exponential_3n(n) {
    if (n === 0) return;
    exponential_3n(n - 1);
    exponential_3n(n - 1);
    exponential_3n(n - 1);
}
```

#### Factorial - O(n!) 
Recall that n! = (n) * (n - 1) * (n - 2) * ... * 1. This complexity is typically the largest/worst we will end up implementing. A typical indicator of this complexity class is recursive code that has a variable number of recursive calls in each stack frame. Note that Factorial is worse than Exponential because Factorial algorithms have a variable amount of recursive calls in each frame, whereas Exponential algorithms have a constant amount in each frame. Classic Example: Generate all permutations of elements in an array. In permutations, the order does matter.

```javascript
function factorial(n) {
    if (n === 1) return;
    
    for (let i = 1; i <= n; i++) {
        factorial(n - 1);
    }
}
```