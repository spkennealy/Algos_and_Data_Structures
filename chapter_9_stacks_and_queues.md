# Stacks & Queues

Stacks and Queues aren't really "data structures" by the strict definition of the term. The more appropriate terminology would be to call them abstract data types (ADTs), meaning that their definitions are more conceptual and related to the rules governing their user-facing behaviors rather than their core implementations.

For the sake of simplicity, we'll refer to them as data structures and ADTs interchangeably throughout the course, but the distinction is an important one to be familiar with as you level up as an engineer.

Now that that's out of the way, Stacks and Queues represent a linear collection of nodes or values. In this way, they are quite similar to the Linked List data structure we discussed in the previous section. In fact, you can even use a modified version of a Linked List to implement each of them. (Hint, hint.)

These two ADTs are similar to each other as well, but each obey their own special rule regarding the order with which Nodes can be added and removed from the structure.

Since we've covered Linked Lists in great length, these two data structures will be quick and easy. Let's break them down individually in the next couple of sections.

## What is a Stack?

Stacks are a Last In First Out (LIFO) data structure. The last Node added to a stack is always the first Node to be removed, and as a result, the first Node added is always the last Node removed.

The name Stack actually comes from this characteristic, as it is helpful to visualize the data structure as a vertical stack of items. Personally, I like to think of a Stack as a stack of plates, or a stack of sheets of paper. This seems to make them more approachable, because the analogy relates to something in our everyday lives.

If you can imagine adding items to, or removing items from, a Stack of...literally anything...you'll realize that every (sane) person naturally obeys the LIFO rule.

We add things to the top of a stack. We remove things from the top of a stack. We never add things to, or remove things from, the bottom of the stack. That's just crazy.

Note: We can use JavaScript Arrays to implement a basic stack. Array#push adds to the top of the stack and Array#pop will remove from the top of the stack. In the exercise that follows, we'll build our own Stack class from scratch (without using any arrays). In an interview setting, your evaluator may be okay with you using an array as a stack.

## What is a Queue?

Queues are a First In First Out (FIFO) data structure. The first Node added to the queue is always the first Node to be removed.

The name Queue comes from this characteristic, as it is helpful to visualize this data structure as a horizontal line of items with a beginning and an end. Personally, I like to think of a Queue as the line one waits on for an amusement park, at a grocery store checkout, or to see the teller at a bank.

If you can imagine a queue of humans waiting...again, for literally anything...you'll realize that most people (the civil ones) naturally obey the FIFO rule.

People add themselves to the back of a queue, wait their turn in line, and make their way toward the front. People exit from the front of a queue, but only when they have made their way to being first in line.

We never add ourselves to the front of a queue (unless there is no one else in line), otherwise we would be "cutting" the line, and other humans don't seem to appreciate that.

Note: We can use JavaScript Arrays to implement a basic queue. Array#push adds to the back (enqueue) and Array#shift will remove from the front (dequeue). In the exercise that follows, we'll build our own Queue class from scratch (without using any arrays). In an interview setting, your evaluator may be okay with you using an array as a queue.

## Stack and Queue Properties

Stacks and Queues are so similar in composition that we can discuss their properties together. They track the following three properties:

*Stack Properties | Queue Properties:*

| **Stack Property** | **Description** | **Queue** **Property** | **Description** |
|--------|------------|------------------------|-----------|
| top | The first node in the Stack | front | The first node in the Queue |
| bottom | The last node in the Stack. (Optional) | back | The last node in the Queue. |
| length | The number of nodes in the Stack; the Stack's length. | length | The number of nodes in the Queue; the Queue's length. | 

Notice that rather than having a head and a tail like Linked Lists, Stacks have a top and a bottom, and Queues have a front and a back instead. These properties are essentially the same; pointers to the end points of the respective List ADT where important actions way take place. The differences in naming conventions are strictly for human comprehension.

Similarly to Linked Lists, the values stored inside a Stack or a Queue are actually contained within Stack Node and Queue Node instances. Stack, Queue, and Singly Linked List Nodes are all identical, but just as a reminder and for the sake of completion, these List Nodes track the following two properties:

*Stack & Queue Node Properties:*

| **Property** | **Description** |
|--------|------------|
| value | The actual value this node represents. |
| next | The next node in the Stack (relative to this node). |

## Stack Methods

In the exercise that follows, we will implement a Stack data structure along with the following Stack methods:

| **Type** | **Name** | **Description** | **Returns** |
|--------|------------|------------------------|-----------|
| Insertion | push | Adds a Node to the top of the Stack. | Integer - New size of stack |
| Deletion | pop | Removes a Node from the top of the Stack. | Node removed from top of Stack |
| Meta | size | Returns the current size of the Stack. | Integer |

## Stack JavaScript Implementation

The following code is the preferred implementation of a Stack ADT:
```js
class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.bottom = null;
    this.length = 0;
  }

  push(val) {
    const newNode = new Node(val);
    if (!this.top) {
      this.top = newNode;
      this.bottom = newNode;
    } else {
      const temp = this.top;
      this.top = newNode;
      this.top.next = temp;
    }
    return ++this.length;
  }

  pop() {
    if (!this.top) {
      return null;
    }
    const temp = this.top;
    if (this.top === this.bottom) {
      this.bottom = null;
    }
    this.top = this.top.next;
    this.length--;
    return temp.value; 
  }

  size() {
    return this.length;
  }
}
```

## Queue Methods

In the exercise that follows, we will implement a Queue data structure along with the following Queue methods:

| Type | Name | Description | Returns |
|--------|------------|------------------------|-----------|
| Insertion | enqueue | Adds a Node to the front of the Queue. | Integer - New size of Queue |
| Deletion | dequeue | Removes a Node from the front of the Queue. | Node removed from front of Queue |
| Meta | size | Returns the current size of the Queue. | Integer |

## Queue JavaScript Implementation

The following code is the preferred implementation of a Queue ADT:
```js
class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.back = null;
    this.length = 0;
  }

  enqueue(val) {
    const newNode = new Node(val);
    if(!this.front) {
      this.front = newNode;
      this.back = newNode;
    } else {
      this.back.next = newNode;
      this.back = newNode;
    }
    return ++this.length;
  }

  dequeue() {
    if (!this.front) {
      return null;
    }
    const temp = this.front;
    if (this.front === this.back) {
      this.back = null;
    }
    this.front = this.front.next;
    this.length--;
    return temp.value; 
  }

  size() {
    return this.length;
  }
}
```

## Time and Space Complexity Analysis

Before we begin our analysis, here is a quick summary of the Time and Space constraints of each Stack Operation.

| Data Structure Operation | Time Complexity (Avg) | Time Complexity (Worst) | Space Complexity (Worst) |
|--------|------------|------------------------|-----------|
| Access | Θ(n) | O(n) | O(n) |
| Search | Θ(n) | O(n) | O(n) |
| Insertion | Θ(1) | O(1) | O(n) |
| Deletion | Θ(1) | O(1) | O(n) |

Before moving forward, see if you can reason to yourself why each operation has the time and space complexity listed above!