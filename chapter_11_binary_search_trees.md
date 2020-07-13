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