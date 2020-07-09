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