function treeSum(root) {
    let count = 0;
    if (!root) return count;

    let queue = [ root ];
    while (queue.length) {
        let node = queue.shift();
        count += node.val;
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }

    return count;
}


module.exports = {
    treeSum
};