class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.sorted = mergeSort(array);
    this.root = buildTree(this.sorted);
  }

  insert(value, root = this.root) {
    if (value == root.data) return null;

    if (value < root.data && !root.left) {
      root.left = new Node(value);
    } else if (value > root.data && !root.right) {
      root.right = new Node(value);
    }

    if (value < root.data) {
      root = root.left;
    } else {
      root = root.right;
    }

    return this.insert(value, root);
  }

  // Take in a value for deletion
  // Start at root node and traverse down binary tree
  // If value is less than node data, then move left, else if greater, move right
  // If value is equal to node data, return node
  // If returned node does not have any children, set respective branch of parent node to null
  // Evaluate if located node has left, right, or both children
  // Compare values, choose the right child (greater value) for succession

  delete(value, root = this.root) {
    if (root == null) {
      console.log(`No node with ${value} found.`);
      return root;
    }

    if (value < root.data) {
      root.left = this.delete(value, root.left);
    } else if (value > root.data) {
      root.right = this.delete(value, root.right);
    } else {
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }

      // Inorder Successor (Right Subtree Minimum)
      // Traverse as left as possible along the RIGHT subtree of the current node
      // This preserves BST as it is always greater than the current node, but smaller than other nodes in right

      let curr = root.right;
      while (curr.left && curr.right) {
        curr = curr.left;
      }

      root.data = curr.data;
      root.right = this.delete(curr.data, root.right);
    }

    return root;
  }

  // Begin at root node
  // Compare value against root data
  // If value is less than, traverse left
  // If value is greater than, traverse right
  // Repeat previous step until value equals node data, or node data equals null (base case)
  // Print && return Node if match

  find(value, root = this.root) {
    if (root == null) {
      console.log(`${value} not found in tree.`);
      return;
    }

    if (value < root.data) {
      root = root.left;
    } else if (value > root.data) {
      root = root.right;
    } else {
      console.log("Node Found!");
      console.log(root);
      return root;
    }

    return this.find(value, root);
  }

  levelOrder(callback) {
    if (!callback && typeof callback !== "function") {
      throw new Error("Please provide a valid callback function.");
    }

    let array = [];

    array.push(this.root);

    for (let i = 0; i < array.length; i++) {
      if (array[i].left) {
        array.push(array[i].left);
      }

      if (array[i].right) {
        array.push(array[i].right);
      }

      callback(array[i]);
    }
  }

  inOrder(callback, root = this.root) {
    if (!callback && typeof callback !== "function") {
      throw new Error("Please provide a valid callback function.");
    }

    if (!root) {
      return;
    }

    this.inOrder(callback, root.left, array);
    callback(root.data);
    this.inOrder(callback, root.right, array);
  }

  preOrder(callback, root = this.root) {
    if (!callback && typeof callback !== "function") {
      throw new Error("Please provide a valid callback function.");
    }

    if (!root) {
      return;
    }

    callback(root.data);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }

  postOrder(callback, root = this.root) {
    if (!callback && typeof callback !== "function") {
      throw new Error("Please provide a valid callback function.");
    }

    if (!root) {
      return;
    }

    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);
    callback(root.data);
  }
}

function merge(leftArr, rightArr) {
  const sortedArr = [];

  while (leftArr.length && rightArr.length) {
    if (sortedArr.includes(leftArr[0])) {
      leftArr.shift();
    }

    if (sortedArr.includes(rightArr[0])) {
      rightArr.shift();
    }

    if (leftArr[0] <= rightArr[0]) {
      sortedArr.push(leftArr.shift());
    } else {
      sortedArr.push(rightArr.shift());
    }
  }

  return [...sortedArr, ...leftArr, ...rightArr];
}

function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);

  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid);

  return merge(mergeSort(leftArr), mergeSort(rightArr));
}

function buildTree(arr) {
  if (arr.length == 1) {
    return new Node(arr[0]);
  }

  if (arr.length == 0) {
    return null;
  }

  const mid = Math.floor((arr.length - 1) / 2);

  const root = new Node(arr[mid]);

  const leftArr = arr.slice(0, mid);
  root.left = buildTree(leftArr);

  const rightArr = arr.slice(mid + 1, arr.length);
  root.right = buildTree(rightArr);

  return root;
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const binaryTree = new Tree(array);

binaryTree.postOrder((value) => {
  console.log(value);
});
