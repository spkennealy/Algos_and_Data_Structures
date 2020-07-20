# Binary Search Trees

Now that we have a solid grasp of Binary Trees, let's add another constraint to the data structure. A Binary Search Tree (BST) has an additional criteria where:
* given any node of the tree, the values in the left subtree must all be strictly less than the given node's value.
* and the values in the right subtree must all be greater than or equal to the given node's value

## BST Definition

We can also describe a BST using a recursive definition. A **Binary Tree** is a **Binary Search Tree** if:
* the left subtree contains values less than the root
* AND the right subtree contains values greater than or equal to the root
* AND the left subtree is a Binary Search Tree
* AND the right subtree is a Binary Search Tree

It's worth mentioning that the empty tree (a tree with 0 nodes) is indeed a BST (did someone say base case?).

Here are a few examples of BSTs:
![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/binary_search_trees/images/bsts.png)

Take a moment to verify that the above binary trees are BSTs. Note that image 2 has the sane chain structure as a linked list. This will come into play later.

Below is an example of a binary tree that is **not** a search tree because a left child (35) is greater than it's parent (23):
![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/binary_search_trees/images/not_bst.png)

## A BST is a Sorted Data Structure

So what's the big deal with BSTs? Well, because of the properties of a BST, we can consider the tree as having an order to the values. That means the values are fully sorted! By looking at the three BST examples above, you are probably not convinced of things being sorted. This is because the ordering is encoded by an inorder traversal. Let's recall our previous `inOrderPrint` function:
```js
function inOrderPrint(root) {
    if (!root) return;

    inOrderPrint(root.left);
    console.log(root.val);
    inOrderPrint(root.right);
}
```

If we run `inOrderPrint` on the three BSTs, we will get the following output:
```cmd
BST 1: 42
BST 2: 4, 5, 6
BST 3: 1, 5, 7, 10, 16, 16
```

For each tree, we printed out values in increasing order! A binary search tree contains sorted data; this will come into play when we perform algorithms on this data structure.

## Naive BST Implementation

Let's implement a `BST` class that will maintain the ordered property through any number of insertions into the tree. We are going to avoid manually creating all nodes and explicitly setting `left`s and `right`s, so we don't have to worry about breaking order. We'll use our classic `TreeNode` as a component of `BST`. In addition, we'll need a proper `BST#insert` method that will conduct legal insertions on the tree. Interpret the code below and scroll further to our annotated version when you need clarification:
```js
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    insert(val, root=this.root) {
        if(!this.root) {
            this.root = new TreeNode(val);
            return;
        }

        if (val < root.val) {
            if (!root.left) {
                root.left = new TreeNode(val);
            } else {
                this.insert(val, root.left);
            }
        } else {
            if (!root.right) {
                root.right = new TreeNode(val);
            } else {
                this.insert(val, root.right);
            }
        }
    }
}
```

```js
// commented naive BST class
class BST {
    constructor() {
        // initialize the tree to be empty
        this.root = null;
    }

    insert(val, root=this.root) {
        // if the tree is currently empty, then create the node as the 'absolute' root
        if(!this.root) {
            this.root = new TreeNode(val);
            return;
        }

        // otherwise, the tree is not empty, so...
        // if our val to insert is less than the root...
        if (val < root.val) {
            if (!root.left) {                       // ...and the left child does not exist,
                root.left = new TreeNode(val);      //      then create the node as the left child
            } else {                                // ...and the left child already exists,
                this.insert(val, root.left);        //      then recursively insert on the left subtree
            }

        // if our val to insert is greater than or equal to the root...
        } else {
            if (!root.right) {                      //  ...and the right child does not exist,
                root.right = new TreeNode(val);     //      then create the node as the right child
            } else {                                //  ...and the right child already exists,
                this.insert(val, root.right);       //      then recursively insert on the right subtree
            }
        }
    }
}
```

We can call `insert` to build up the `BST` without worrying about breaking the search tree property. Let's build two different trees:
```js
let tree1 = new BST();
tree1.insert(10);
tree1.insert(5);
tree1.insert(16);
tree1.insert(1);
tree1.insert(7);
tree1.insert(16);

let tree2 = new BST();
tree2.insert(1);
tree2.insert(5);
tree2.insert(7);
tree2.insert(10);
tree2.insert(16);
tree2.insert(16);
```

The insertions above will yield the following trees:
![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/binary_search_trees/images/good_bad_bst.png)

Are you cringing at `tree2`? You should be. Although we have the same values in both trees, they display drastically different structures because of the insertion order we used. This is why we have been referring to our `BST` implementation as **naive**. Both of these trees are Binary Search Trees, however not all BSTs are created equal. A worst case BST degenerates into a linked list. The "best" BSTs are **height balanced**, we'll explore this concept soon™.

## Searching and Balanced BSTs

Let's explore the main application of a Binary Search Tree. Since a BST is a sorted data structure, this allows us to conduct the Binary Search algorithm. This algorithm will be similar to the same Binary Search strategy we used on sorted arrays!

### **Implementing Binary Search on a BST**

Our goal is to implement a #search method on our previous BST class that will solve the problem:
```cmd
Given a binary search tre
```

In other words, our `BST#search` should satisfy the following behavior:
```js
let tree = new BST();
tree.insert(10);
tree.insert(5);
tree.insert(16);
tree.insert(1);
tree.insert(7);
tree.insert(16);

tree.search(7);     // => true
tree.search(16);    // => true
tree.search(14);    // => false
```

As with many tree problems, this problem lends itself nicely to recursion! Like always, our base case should capture the scenario where the input tree is trivial and we know the answer to the problem without further calculation. If the given tree is empty, then we can be certain that the target is not found in the tree. The logic of our BST#search method will be much the same compared to our binarySearch function for sorted arrays. Try to interpret the code below and scroll further to the annotated version when you need clarification
```js
// assuming our BST class from the previous section
class BST {
    // ...

    search(val, root=this.root) {
        if (!root) return false;

        if (val < root.val) {
            return this.search(val, root.left);
        } else if (val > root.val){
            return this.search(val, root.right);
        } else {
            return true;
        }
    }
}
```

```js
// assuming our BST class from the previous section
class BST {
    // ...

    // commented
    search(val, root=this.root) {
        // if the tree is empty, then the target val is not in the tree, so return false
        if (!root) return false;

        // otherwise the tree is not empty, so...
        if (val < root.val) {
            // if the target is less than the root,
            //  then search the left subtree
            return this.search(val, root.left);
        } else if (val > root.val){
            // if the target is greater than the root,
            //  then search the right subtree
            return this.search(val, root.right);
        } else {
            // otherwise, the target must be equal to the root
            // so return true since we found it!
            return true;
        }
    }
}
```

### **Height Balance**

Before we analyze the time complexity of `BST#search`, we'll first need to learn about height balance. Recalling what we touched on briefly in our chat on binary trees, **height** is defined as the number of edges between the root and **farthest** leaf in a tree. Note that height is dictated by the farthest leaf (think worst case):

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/binary_search_trees/images/height.png)

Following this definition, a tree consisting of a single node has height 0. We consider then an empty tree as having height -1. Height is relevant because not all BSTs are created equal! That is, some BSTs have "good / small" heights, others have "bad / large" heights. Take a look at these two BSTs containing identical values, but very different heights:

![](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/binary_search_trees/images/balanced_unbalanced.png)

`Tree 1` is preferred over `Tree 2`, because `Tree 1` is **balanced**. Balanced Binary Trees will be the most efficient to perform operations on.

For a binary tree to be **balanced**:
* the left and right subtrees must differ in height by at most 1
* AND the left subtree is balanced
* AND the right subtree is balanced

Notice that **balanced** has a recursive definition. Like you probably guessed, the empty tree is considered balanced. This will be the base case of our definition.