
function distinct(arr) {
  var obj = {};
  var ret = [];
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    if (!obj[arr[i]]) {
      obj[arr[i]] = true;
      ret.push(arr[i]);
    }
  }
  return ret;
}

// 冒泡排序，升序
function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// 选择排序
function selectionSort(arr) {
  var len = arr.length;
  var min;
  for (var i = 0; i < len - 1; i++) {
    min = i;
    for (var j = i; j < len; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    var temp = arr[min];
    arr[min] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

// 快速排序
function quickSort(arr, left, right) {
  left = typeof left !== 'number' ? 0 : left;
  right = typeof right !== 'number' ? 0 : right;
  var partitionIndex;
  if (left < right) {
    partitionIndex = partition(arr, left, right);
    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
  }
  return arr;
}

function partition(arr, left, right) {
  var standard = left;
  var index = standard + 1;
  for (var i = index; i <= right; i++) {
    if (arr[i] < arr[standard]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, index - 1, standard);
  return index - 1;
}

function swap(arr, m, n) {
  var temp = arr[m];
  arr[m] = arr[n];
  arr[n] = temp;
}
