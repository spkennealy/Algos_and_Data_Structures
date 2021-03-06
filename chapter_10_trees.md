# Trees

## Binary Trees

Binary Trees are perhaps the most pervasive data structure in computer science. Let's take a moment to go over the basic characteristics of a Binary Tree before we explore algorithms that utilize this structure.

### **What is a Graph?**

Before we define what a Tree is, we must first understand the definition of a Graph. A graph is a collection of nodes and any edges between those nodes. You've likely seen depictions of graphs before, they usually exist as circles (nodes) and arrows (edges) between those circles. Below are few examples of graphs:

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/trees/images/graphs.png)

For now, you can ignore the blue coloring. Notice how the graphs above vary greatly in their structure. A graph is indeed a very broad, overarching category. In fact, linked lists and trees are both considered subclasses of graphs. We'll cover algorithms that operate on a general graph structure later, but for now we want to focus on what graphs are trees and what graphs are not. It's worth mentioning that a single node with no edges (image 1) is considered a graph. The empty graph (a graph with 0 nodes and 0 edges, not pictured :)) is also still a graph. This line of thinking will help us later when we design graph algorithms.

### **What is a Tree?**

A Tree is a Graph that does not contain any cycles. A cycle is is defined as a path through edges that begins and ends at the same node. This seems straightforward, but the definition becomes a bit muddled as Mathematicians and Computer Scientists use the term "tree" in slightly different ways. Lets break it down:
* To a Mathematician, graphs 1, 2, 3, and 4 in the above image are trees.
* To a Computer Scientist, only graphs 1 ,2, and 3 are trees.

Well, at least both camps agree that graph 5 is most certainly not a tree! This is because of the obvious cycle that spans all three nodes. However, why is there disagreement over graph 4? The reason is this: In computer science, we use to the term "tree" to really refer to a "rooted tree." A "rooted tree" is a "tree" where there exists a special node from which every other node is accessible; we call this special node the "root". Think of the root as ultimate ancestor, the single node that all other nodes inherit from. Above we have colored all roots in blue. Like you'd probably suspect, in this course we'll subscribe to the Computer Scientist's interpretation. That is, we won't consider graph 4 a tree because there is no such root we can label.

You've probably heard the term "root" throughout your software engineering career: root directory, root user, etc.. All of these concepts branch† from the humble tree data structure!

### **What is a Binary Tree?**

A Binary Tree is a Tree where nodes have at most 2 children. This means graphs 1, 2, and 3 are all Binary Trees. There exist ternary trees (at most 3 children) and n-ary trees (at most n children), but you'll likely encounter binary trees in your job hunt, so we'll focus on them in this course. Based on our final definition for a binary tree, here is some food for thought:
* an empty graph of 0 nodes and 0 edges is a binary tree
* a graph of 1 node and 0 edges is a binary tree
* a linked list is a binary tree

Take a moment to use the definitions we explored to verify that each of the three statements above is true. We bring up these three scenarios in particular because they are the simplest types of Binary Trees. We want to eventually build elegant algorithms and these simple scenarios will fuel our design.

### **Representing a Tree with Node Instances**

Let's explore a common way to represent binary trees using some object oriented design. A tree is a collection of nodes, so let's implement a `TreeNode` class. We'll use properties of `left` and `right` to reference the children of a `TreeNode`. That is, `left` and `right` will reference other `TreeNodes`:
```js
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}
```

Constructing a tree is a matter of creating the nodes and setting left and right however we please. For example:
```js
let a = new TreeNode('a');
let b = new TreeNode('b');
let c = new TreeNode('c');
let d = new TreeNode('d');
let e = new TreeNode('e');
let f = new TreeNode('f');

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;
```

The visual representation of the tree is:
![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/trees/images/graph_a.png)

To simplify our diagrams, we'll omit the arrowheads on the edges. Moving forward you can assume that the top node is the root and the direction of edges points downward. In other words, node A is the Root. Node A can access node B through a.left, but Node B cannot access Node A.

We now have a data structure we can use to explore Binary Tree algorithms! Creating a tree in this way may be tedious and repetitive, however it allows us to decide exactly what nodes are connected and in what direction. This is will be useful as we account for edge cases in our design.

### **Basic Tree Terminology**
* tree - graph with no cycles
* binary tree - tree where nodes have at most 2 nodes
* root - the ultimate parent, the single node of a tree that can access every other node through edges; by definition the root will not have a parent
* internal node - a node that has children
* leaf - a node that does not have any children
* path - a series of nodes that can be traveled through edges - for example A, B, E is a path through the above tree

† Pun Intended


## Inorder Preorder Postorder Notes

### **Binary Tree Print Order Algorithms**

Now that we have the basic definition of a binary tree, let's begin with three short algorithms that print out the values. The algorithms are structurally the same, however they will differ in what order the values are printed. We'll use the following tree as the input when running these algorithms:

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/trees/images/graph_a.png)

#### **In-Order**

Let's begin with the inOrderPrint function. All three of our algorithms will be recursive and have the same base case. As always, our base case should cover the scenario where the input is trivially small enough so that we don't need to perform further calculation. Since our "problem" is to print all values in a tree, what is the simplest tree we can be given? The empty tree! A common mistake when designing recursive tree algorithms is to make the base case about the root being a leaf, instead we'll want the basecase to cover the root being empty:
```js
function inOrderPrint(root) {
    if (root === null) return;
    // ...
}
```

Note that taking in an entire tree as input is really just a matter of taking in the root node. This is because the root node can access every other node through a path of edges. Our base case says, "if the tree is empty, return since there is nothing to print."

Here is where the meat of the algorithm comes in. Given the root of a tree, the steps for inOrderPrint are:
```cmd
- print all nodes in the left subtree
- print root
- print all nodes in the right subtree
```

Translating this into code:
```js
function inOrderPrint(root) {
    if (!root) return;

    inOrderPrint(root.left);
    console.log(root.val);
    inOrderPrint(root.right);
}
```

Given our tree, inOrderPrint would print the values in the order: `d, b, e, a, c, f`

In-Order has the pattern of left, self, right. This means:
* a node can only be printed once it's left subtree has been completely printed.
* a node's right subtree can only be printed once the node itself has been printed.

#### **Pre-Order**

Given the root of a tree, the steps for `preOrderPrint` are:
```cmd
- print root
- print all nodes in the left subtree
- print all nodes in the right subtree
```

Translating this into code:
```js
function preOrderPrint(root) {
    if (!root) return;

    console.log(root.val);
    preOrderPrint(root.left);
    preOrderPrint(root.right);
}
```

Given our tree, preOrderPrint would print the values in the order: `a, b, d, e, c, f`

Pre-Order has the patten of self, left, right. This means:
* a node must be printed before it's children
* a node's left subtree must be printed before it's right subtree

#### **Post-Order**

Given the root of a tree, the steps for `postOrderPrint` are:
```cmd
- print all nodes in the left subtree
- print all nodes in the right subtree
- print root
```

Translating this into code:
```js
function postOrderPrint(root) {
    if (!root) return;

    postOrderPrint(root.left);
    postOrderPrint(root.right);
    console.log(root.val);
}
```

Given our Tree, postOrderPrint would print the values in the order: `d, e, b, f, c, a`

Post-Order has the pattern of left, right, self. This means:
* a node can only be printed after it's left and right subtrees
* a node's left subtree is printed before it's right subtree


## Depth and Breadth First Traversal

Let's add two more tree traversal algorithms to our arsenal. Depth-First and Breadth-First are two classic traversal strategies that differ in the order nodes are hit. In this reading, our candidate tree will be:

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/trees/images/graph_a.png)

Like we are accustomed to, we can represent the tree programmatically with:
```js
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

let a = new TreeNode('a');
let b = new TreeNode('b');
let c = new TreeNode('c');
let d = new TreeNode('d');
let e = new TreeNode('e');
let f = new TreeNode('f');

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;
```

### **Depth-First**

To help verbalize Depth-First (DF), we'll be using a few familial terms to describe the relative positions of the nodes. Think of the words you would use if viewing a family tree! Here are some examples:
* `B` and `C` are siblings
* `D` and `E` are descendants of `B`
* `B`, `C`, `D`, `E`, `F` are all descendants of `A`

A Depth-First traversal will continually travel deeper into a tree before switching branches. This means that, given a node, we must visit all of it's descendants before visiting it's sibling.

Performing DF on our tree will hit the nodes in the order: `A, B, D, E, C, F`

#### **Depth-First Implementation**

To travel the nodes of a tree according to Depth-First behavior, we'll utilize a **stack**. Recall from earlier that a stack is LIFO (Last In, First Out). Our strategy is to use an array as a stack. We'll use `push` to add to the top of our stack and `pop` to remove the top. Below is a complete implementation of `depthFirst`. Try to interpret the code below and scroll further to see the annotated version:
```js
function depthFirst(root) {
    let stack = [ root ];
    while (stack.length) {
        let node = stack.pop();
        console.log(node.val);
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
}
```

```js
function depthFirst(root) {
    // initialize the stack with the root node
    let stack = [ root ];

    // continue running the algorithm while there are still nodes on the stack
    while (stack.length) {

        // pop the top node from the stack
        let node = stack.pop();

        // we consider a node visited once we pop it,
        // so we should print the node's value now
        console.log(node.val);

        // add the node's left and right children, if they exist
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);

        // IMPORTANT: do not print out the children yet; they must wait their turn to be popped first
    }
}
```

You should watch the video lecture that follows this reading for a visual on how a stack inherently gives us DF order. For now, a key idea to take away is that we only consider a node "visited" once we pop it. We do not consider a node "visited" when we push it.

Because a stack naturally leads to DF order on a tree, we can easily write a recursive version. Why is recursion relevant to DF? Recursion utilizies the call `stack`:
```js
function depthFirstRecur(root) {
    if (!root) return;
    console.log(root.val);
    depthFirstRecur(root.left);
    depthFirstRecur(root.right);
}
```

Does this code look familiar? It's identical to the `preOrderPrint` function we wrote previously. That's right, pre-order and depth-first are identical tree node orderings.

You should study both the iterative and recursive implementations as they will both prove valuable to solving problems.

### **Breadth-First**

This algorithm has nothing to do with bread. The word "breadth" is the same as "width". To help veribalize Breadth-First (BF) we'll need to understand the simple concept of tree **levels**. With the tree at the top of this reading in mind, we can say the following:
* level 0 contains `A`
* level 1 contains `B`, `C`
* level 2 contains `D`, `E`, `F`

A Breadth-First traversal will visit all nodes across a level, before moving to the next level. This means we travel laterally as much as we can before going deeper into the tree.

Perform BF on our tree will hit the nodes in the order: `A, B, C, D, E, F`

#### **Breadth-First Implementation**

While DF uses a stack, BF will use a **queue**. Recall that a queue is FIFO (First In, First Out). The code is very similar to our iterative DF, except we will use an array as a queue. `shift` will remove the front of the queue and `push` will add to the back of the queue. Interpret the implementation below and scroll further to the annotated version when you need more insight:
```js
function breadthFirst(root) {
    let queue = [ root ];
    while (queue.length) {
        let node = queue.shift();

        console.log(node.val);

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
}
```

```js
function breadthFirst(root) {
    // initialize the queue with the root node
    let queue = [ root ];

    // continue running the algorithm while there are still nodes on the queue
    while (queue.length) {
        // remove the front node from the queue
        let node = queue.shift();

        // the node we just removed is now "visited", so print it
        console.log(node.val);

        // add the left and right children to the back of the queue, if they exist
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);

        // IMPORTANT: do not print out the children yet; they must wait their turn to exit the front of the queue first
    }
}
```

We'll rarely run into a recursive BF implementation (probably never) because recursion uses an underlying call stack, but we really want the opposite of a stack (a queue).