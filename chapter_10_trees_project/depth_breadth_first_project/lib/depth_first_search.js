function depthFirstSearch(root, targetVal) {
    let queue = [ root ];

    while (queue.length) {
        let node = queue.shift();
        if (node.val === targetVal) return node;
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }

    return null;
}


module.exports = {
    depthFirstSearch
};