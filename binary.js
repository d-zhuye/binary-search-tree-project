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
    this.root = root;
  }
}

function buildTree(array) {
  // Take an array
  // Sort Array && Remove Duplicates
  // Sort with Recursive Function?
}


function merge(leftArr, rightArr) {
  const sortedArr = [];
  while (leftArr.length && rightArr.length) {
    if (leftArr[0] < rightArr[0]) {
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

  // console.log(left, right);

  return merge(mergeSort(leftArr), mergeSort(rightArr));
}


const array = [1, 4, 3, 8, 2, 5, 7, 6];
const example = mergeSort(array);
console.log(example);