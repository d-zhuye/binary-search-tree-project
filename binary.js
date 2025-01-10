class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array, root = null) {
    this.array = array;
    this.sorted = mergeSort(array);
    this.root = buildTree(this.sorted);
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
  // console.log(arr);
  if (arr.length <= 1) {
    return arr[0];
  }

  const mid = Math.floor(arr.length / 2);
  // console.log(mid);

  const root = new Node(arr[mid]);
 // console.log(root);

  const leftArray = arr.slice(0, mid);
  root.left = buildTree(leftArray);
  // console.log(leftArray);

  const rightArr = arr.slice(mid + 1, arr.length);
  root.right = buildTree(rightArr);
  // console.log(rightArr);


  return root;
}


const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const binaryTree = new Tree(array);

console.log(binaryTree.BST);