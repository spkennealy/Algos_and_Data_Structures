// ============================================================================
// Interview Problem: StackQueue
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement your preferred Stack implementation, including the methods:
//
//   - Push 
//   - Pop 
//   - Size
//
// Then, implement a Queue by instantiating two Stack instances for storage.
//
// The StackQueue implementation should include the following methods:
//
//   - Enqueue
//   - Dequeue
//   - Size
//
// -----------
// Let's code!
// -----------

class Node {
    // TODO: Implement the Node class!
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

class Stack {
    // TODO: Implement the Stack class!
    constructor() {
        this.top = null;
        this.bottom = null;
        this.length = 0;
    }

    push(node) {
        if (this.top) {
            let temp = this.top;
            node.next = temp;
            this.top = node;
        } else {
            this.top = node;
            this.bottom = node;
        }

        this.length++;
        return this.length;
    }

    pop() {
        if (!this.top) return null;

        let node = null;
        if (this.length === 1) {
            node = this.top;
            this.top = null;
            this.bottom = null;
        } else {
            node = this.top;
            this.top = node.next;
        }

        this.length--;
        return node;
    }

    size() {
        return this.length;
    }
}

class StackQueue {
    // TODO: Implement the StackQueue class!
    constructor() {
        this.inStack = new Stack();
        this.outStack = new Stack();
        this.front = null;
        this.back = null;
    }

    enqueue(val) {
        let newNode = new Node(val);

        if (!this.front) {
            this.front = newNode;
            this.back = newNode;
        } else {
            this.back.next = newNode;
            this.back = newNode;
        }

        this.inStack.push(new Node(newNode.value));
        return this.size();
    }

    dequeue() {
        if (this.size() < 1) return null;

        let node = this.front;
        if (this.size() === 1) {
            this.front = null;
            this.back = null;
        } else {
            this.front = node.next;
        }

        return node;
    }
};

exports.Node = Node;
exports.Stack = Stack;
exports.StackQueue = StackQueue;
