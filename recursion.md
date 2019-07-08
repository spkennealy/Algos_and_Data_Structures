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

