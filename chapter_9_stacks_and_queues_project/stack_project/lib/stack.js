// ============================================================================
// Implementation Exercise: Stack
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement a Stack and all of its methods below!
//
// ------------
// Constraints:
// ------------
//
// Make sure the time and space complexity of each is equivalent to those 
// in the table provided in the Time and Space Complexity Analysis section
// of your Stack reading!
//
// -----------
// Let's Code!
// -----------

class Node {
    constructor(value) {
        this.value = value;
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
        let newNode = new Node(val);

        if (this.top) {
            let temp = this.top;
            newNode.next = temp;
            this.top = newNode;
        } else {
            this.top = newNode;
            this.bottom = newNode;
        }

        this.length++;
        return this.length;
    }

    pop() {
        if (!this.top) return null;

        let val = this.top.value;
        if (this.length == 1) {
            this.top = null;
            this.bottom = null;
        } else {
            this.top = this.top.next;
        }

        this.length--;
        return val;
    }

    size() {
        return this.length;
    }
}

exports.Node = Node;
exports.Stack = Stack;
