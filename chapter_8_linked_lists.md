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

## Types of Linked Lists

There are four flavors of Linked List you should be familiar with when walking into your job interviews.

Linked List Types:

| List Type | Description | Directionality |
|--------------|-----------|-----------|
| Singly Linked | Nodes have a single pointer connecting them in a single direction. | Head→Tail |
| Doubly Linked | Nodes have two pointers connecting them bi-directionally. | Head⇄Tail |
| Mulitply Linked | Nodes have two or more pointers, providing a variety of potential node orderings. | Head⇄Tail, A→Z, Jan→Dec, etc. |
| Circularly Linked | Final node's next pointer points to the first node, creating a non-linear, circular version of a Linked List. | Head→Tail→Head→Tail |

`NOTE: These Linked List types are not always mutually exclusive.`

For instance:
* Any type of Linked List can be implemented Circularly (e.g. A Circular Doubly Linked List).
* A Doubly Linked List is actually just a special case of a Mulitply Linked List.
* Etc.

You are most likely to encounter Singly and Doubly Linked Lists in your upcoming job search, so we are going to focus exlusively on those two moving forward. However, in more senior level interviews, it is very valuable to have some familiarity with the other types of Linked Lists. Though you may not actually code them out, you will win extra points by illustrating your ability to weigh the tradeoffs of your technical decisions by discussing how your choice of Linked List type may affect the efficiency of the solutions you propose.

## Linked List Methods

Linked Lists are great foundation builders when learning about data structures because they share a number of similar methods (and edge cases) with many other common data structures. You will find that many of the concepts discussed here will repeat themselves as we dive into some of the more complex non-linear data structures later on, like Trees and Graphs.

In the project that follows, we will implement the following Linked List methods:

| Type | Name | Description | Returns |
| Insertion | addToTail | Adds a new node to the tail of the Linked List. | Updated Linked List |
| Insertion | addToHead | Adds a new node to the head of the Linked List. | Updated Linked List |
| Insertion | insertAt | Inserts a new node at the "index", or position, specified. | Boolean |
| Deletion | removeTail | Removes the node at the tail of the Linked List. | Removed node |
| Deletion | removeHead | Removes the node at the head of the Linked List. | Removed node |
| Deletion | removeFrom | Removes the node at the "index", or position, specified. | Removed node |
| Search | contains | Searches the Linked List for a node with the value specified. | Boolean |
| Access | get | Gets the node at the "index", or position, specified. | Node at index |
| Access | set | Updates the value of a node at the "index", or position, specified. | Boolean |
| Meta | size | Returns the current size of the Linked List. | Integer |