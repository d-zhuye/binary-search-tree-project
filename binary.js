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
    this.root = buildTree(mergeSort(this.array));
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

      let curr = root.right;
      while (curr.left && curr.right) {
        curr = curr.left;
      }

      root.data = curr.data;
      root.right = this.delete(curr.data, root.right);
    }

    return root;
  }

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
    return array;
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

  height(value, root = this.find(value)) {
    if (!root) return -1;

    let leftHeight = this.height(value, root.left);
    let rightHeight = this.height(value, root.right);
    return 1 + Math.max(leftHeight, rightHeight);
  }

  depth(value, root = this.root, depth = 0) {
    if (!root) {
      return;
    }

    if (value < root.data) {
      root = this.depth(value, root.left, depth + 1);
    } else if (value > root.data) {
      root = this.depth(value, root.right, depth + 1);
    } else {
      return depth;
    }

    return root;
  }

  isBalanced() {
    let isBalanced = true;
    let leftSubtreeHeight = 0;
    let rightSubtreeHeight = 0;
    this.levelOrder((node) => {
      if (node.left) {
        leftSubtreeHeight = this.height(node.left.data);
      } else {
        leftSubtreeHeight = 0;
      }

      if (node.right) {
        rightSubtreeHeight = this.height(node.right.data);
      } else {
        rightSubtreeHeight = 0;
      }

      const diffHeight = Math.abs(leftSubtreeHeight - rightSubtreeHeight);
      if (diffHeight > 1) {
        isBalanced = false;
      }
    });

    return isBalanced;
  }

  rebalance() {
    const array = [];
    this.levelOrder(node => {
      array.push(node.data);
    })
    
    this.root = buildTree(mergeSort(array));
    console.dir(this.root, {depth: 8});
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
