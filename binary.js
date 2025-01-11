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
binaryTree.insert(636);
console.dir(binaryTree.root, {depth: 8, colors: true});