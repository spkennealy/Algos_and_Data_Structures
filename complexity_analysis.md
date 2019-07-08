# Complexity Analysis

| Growth Rate  | Function    | Function Notation                                          | Big O Notation   |
|--------------|-------------|------------------------------------------------------------|------------------|
| small growth | Constant    | f(n) = 1                                                   | O(1)             |
| -----------  | Logarithmic | f(n) = log(n)                                              | O(log(n))        |
| -----------  | Linear      | f(n) = n                                                   | O(n)             |
| -----------  | Loglinear   | f(n) = n * log(n)                                          | O(nlog(n))       |
| -----------  | Polynomial  | f(n) = n<sup>2</sup> or n<sup>3</sup> or n<sup>4</sup> ... | O(n<sup>2</sup>) |
| -----------  | Exponential | f(n) = 2<sup>n</sup> or 3<sup>n</sup> or 4<sup>n</sup> ... | O(2<sup>n</sup>) |
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


##### Exercise
It's your turn. Write the Big-O simplified versions of the following functions.

| **Unsimplified**                            | **Big-O Simplified** |
|---------------------------------------------|----------------------|
| T(n<sup>2</sup> + 10 * 2<sup>n</sup> + 500) | O(2<sup>n</sup>)     |
| T(log(n) + n + nlog(n))                     | O(nlog(n))           |
| T(n! + 24n + 2log(n))                       | O(n!)                |
| T(n * 3<sup>n</sup> + n<sup>2</sup>)        | O(3<sup>n</sup>)     |