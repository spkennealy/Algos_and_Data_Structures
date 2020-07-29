# Graphs

It's time to generalize our knowledge! We've explored binary trees and the fundamental algorithms that accompany them. Naturally, we implemented these algorithms assuming the contraints of a binary tree. To review, these assumptions include the lack of cycles, a maximum of two children, and a single root node. However, what if we take away these contraints? How can we modify the algorithms to operate on general graphs?

## What is a Graph?

A graph is any collection of nodes and edges. In contrast to our previous trees, a graph is much more relaxed in it's structure. A graph may:
* lack a root node
* have cycles
* have any number edges leaving a node

In this section, we will draw heavily from our tree algorithms. The adjustments we will make to those algorithms will be motivated by these core differences.

Below are a few examples of graphs that don't agree with our CompSci definition of a binary tree:

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/graphs/images/graphs.png)

Here are some highlights:

* `Graph 1` lacks a root. This means there is no single node that can access all other nodes in a path through edges. This is important because we previously referenced "entire" trees by referring to the ultimate root. We can no longer do that in a graph. If we provide just `T`, you can't access `U`. If we provide just `U,` you can't access `T`. If we provide just `V`, you can't access `T` or `U`.
* `Graph 2` has a cycle. This means there is no longer a parent-child relationship. Choose any node in `Graph 2`, its grandchild will also be its parent. Wait - what? From now on we'll have to use less specific language such as "`X` is a neighbor of `Y.`" Perhaps even more deadly, imagine we ran a "simple" Depth-First traversal on this graph. We could get trapped in an infinite loop if we are not careful.
* `Graph 3` features nodes that have more than 2 edges. Anarchy!

## Graph Implementations

There are many ways to represent a graph programmatically. Let's take a moment to explore each and describe the tradeoffs we make when choosing among them. We will use `Graph 3` from above as our candidate. Bear in mind that our graph is directed. For example, this means that `C` can access `D`, but `D` cannot access `C`.


### GraphNode Class

This implementation is most similar to how we implemented binary trees. That is, we create a node class that maintains a value and an array of references to neighboring nodes. This easily solves the problem that a node can have any number of neighbors, no longer just a left and right.

```js
class GraphNode {
    constructor(val) {
        this.val = val;
        this.neighbors = [];
    }
}

let a = new GraphNode('a');
let b = new GraphNode('b');
let c = new GraphNode('c');
let d = new GraphNode('d');
let e = new GraphNode('e');
let f = new GraphNode('f');
a.neighbors = [b, c, e];
c.neighbors = [b, d];
e.neighbors = [a];
f.neighbors = [e];
```

This implementation is great because it feels familiar to how we implemented trees. However, this implementation is clunky in that we have no easy way to refer to the entire graph. How can we pass this graph to a function? Recall that there is no root to act as the definite starting point.