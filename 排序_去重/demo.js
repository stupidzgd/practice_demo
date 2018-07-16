
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
    for (var j = i + 1; j < len; j++) {
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


function quick(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var left = [];
  var right = [];
  var base = arr[0];
  for (var i = 1; i < arr.length; i++) {
    // 判决条件
    if (arr[i] > base) {
      right.push(arr[i]);
    } else {
      left.push(arr[i])
    }
  }
  return quick(left).concat(base, quick(right));
}

function quickSort2(arr, start, end) {
  if (start > end) {
    return;
  }
  let i = start,
    j = end,
    pivot = arr[start]; //存放基准数
  while (i !== j) {
    // 从右边开始，找第一个小于基准的位置
    while (arr[j] >= pivot && i < j) {
      j--;
    }
    // 从左边开始，找第一个大于基准的位置
    while (arr[i] <= pivot && i < j) {
      i++
    }
    // 交换两个数
    if (i < j) {
      let tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
  }
  // 最后把基准数归位
  arr[start] = arr[i];
  arr[i] = pivot;
  // 递归处理左边
  quickSort(arr, start, i - 1);
  // 递归处理右边
  quickSort(arr, i + 1, end);
}
