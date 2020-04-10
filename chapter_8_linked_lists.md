# Linked Lists

In the university setting, it’s common for Linked Lists to appear early on in an undergraduate’s Computer Science coursework. While they don't always have the most practical real-world applications in industry, Linked Lists make for an important and effective educational tool in helping develop a student's mental model on what data structures actually are to begin with.

Linked lists are simple. They have many compelling, reoccurring edge cases to consider that emphasize to the student the need for care and intent while implementing data structures. They can be applied as the underlying data structure while implementing a variety of other prevalent abstract data types, such as Lists, Stacks, and Queues, and they have a level of versatility high enough to clearly illustrate the value of the Object Oriented Programming paradigm.

They also come up in software engineering interviews quite often.

## What is a Linked List?

A Linked List data structure represents a linear sequence of "vertices" (or "nodes"), and tracks three important properties.

| Linked List Properties:| |
|--------------|-----------|
|  **Property** |  **Description** |
| `head` | The first node in the list. |
| `tail` | The last node in the list.  |
| `length` | The number of nodes in the list; the list's length. |

The data being tracked by a particular Linked List does not live inside the Linked List instance itself. Instead, each vertex is actually an instance of an even simpler, smaller data structure, often referred to as a "Node".

Depending on the type of Linked List (there are many), Node instances track some very important properties as well.

| Linked List Node Properties:| |
|--------------|-----------|
|  **Property** |  **Description** |
| `value` | The actual value this node represents. |
| `next` | The next node in the list (relative to this node). |
| `previous` | The previous node in the list (relative to this node). |

`NOTE: The previous property is for Doubly Linked Lists only!`

Linked Lists contain ordered data, just like arrays. The first node in the list is, indeed, first. From the perspective of the very first node in the list, the next node is the second node. From the perspective of the second node in the list, the previous node is the first node, and the next node is the third node. And so it goes.

`"So...this sounds a lot like an Array..."`

Admittedly, this does sound a lot like an Array so far, and that's because Arrays and Linked Lists are both implementations of the List ADT. However, there is an incredibly important distinction to be made between Arrays and Linked Lists, and that is how they physically store their data. (As opposed to how they represent the order of their data.)

Recall that Arrays contain contiguous data. Each element of an array is actually stored next to it's neighboring element in the actual hardware of your machine, in a single continuous block in memory.

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/linked_lists/images/array-in-memory.png)
`An Array's contiguous data being stored in a continuous block of addresses in memory.`

Unlike Arrays, Linked Lists contain non-contiguous data. Though Linked Lists represent data that is ordered linearly, that mental model is just that - an interpretation of the *representation* of information, not reality.

In reality, in the actual hardware of your machine, whether it be in disk or in memory, a Linked List's Nodes are not stored in a single continuous block of addresses. Rather, Linked List Nodes live at randomly distributed addresses throughout your machine! The only reason we know which node comes next in the list is because we've assigned its reference to the current node's next pointer.

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/linked_lists/images/SLL-diagram.png)
`A Singly Linked List's non-contiguous data (Nodes) being stored at randomly distributed addresses in memory.`

For this reason, Linked List Nodes have no indices, and no random access. Without random access, we do not have the ability to look up an individual Linked List Node in constant time. Instead, to find a particular Node, we have to start at the very first Node and iterate through the Linked List one node at a time, checking each Node's next Node until we find the one we're interested in.

So when implementing a Linked List, we actually must implement both the Linked List class and the Node class. Since the actual data lives in the Nodes, it's simpler to implement the Node class first.