// ============================================================================
// Interview Problem: Constant Time Stack Max
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Iterate over a Singly Linked List of primitives backwards. When finished, 
// return a string representing the original linked list's values backwards 
// in the following format:
//
//                             'A -> B -> C -> D' 
//
// ------------
// Constraints:
// ------------
//
// (1) Your function must be iterative, not recursive.
// (2) Your function must consume O(n) space.
// (3) Employee either a Stack, Queue, or some combination of the two in your
//     solution. (Implement any data structures you need, as you need them.)
//
//
// -----------
// Let's code!
// -----------

// class Node {
//     constructor(val) {
//         this.value = val;
//         this.next = null;
//     }
// }

// class LinkedList {
//     constructor() {
//         this.head = null;
//         this.tail = null;
//         this.length = 0;
//     }

//     addToTail(val) {
//         const newNode = new Node(val);

//         if (!this.head) {
//             this.head = newNode;
//         } else {
//             this.tail.next = newNode;
//         }

//         this.tail = newNode;
//         this.length++;
//         return this;
//     }

//     get(index) {
//         if (index < 0 || index >= this.length) return null;
//         let counter = 0;
//         let current = this.head;
//         while (counter !== index) {
//             current = current.next;
//             counter++;
//         }
//         return current;
//     }
// }

function iterateAcrossLinkedListBackwards(linkedList) {
    // TODO: Implement the iterateAcrossLinkedListBackwards function here
    if (linkedList.length === 0) return "";

    let arr = [];
    let currNode = linkedList.head;
    while (currNode) {
        let val = currNode.value;
        if (val === null) val = "null";
        if (val === undefined) val = "undefined";
        arr.push(val);
        currNode = currNode.next;
    }

    return arr.reverse().join(" -> ");
}

exports.iterateAcrossLinkedListBackwards = iterateAcrossLinkedListBackwards;
// var linkedList = new LinkedList();
// linkedList.addToTail('1');
// linkedList.addToTail(null);
// linkedList.addToTail('A');
// linkedList.addToTail(false);
// linkedList.addToTail(undefined);
// var result = iterateAcrossLinkedListBackwards(linkedList);