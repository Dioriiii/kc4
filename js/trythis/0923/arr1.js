import assert from "assert";

// 다음과 같은 push, pop, shift, unshift 를 순수 함수로 작성하시오.
// (단, 입력값은 다음 예시로 한정함)

// function push(array, …args) {}
const arr = [1, 2, 3, 4];

function push(arr, ...args) {
  return [...arr, ...args];
}

function pop(arr, cnt) {
  if (!cnt) return arr[arr.length - 1];
  if (cnt <= 0) return [];
  // args 가 length 보다 길면 length 로 변경
  cnt = cnt > arr.length ? arr.length : cnt;
  const firstIdx = arr.length - cnt;
  // let newArr = [];
  // for (let i = arr.length - 1; i > firstIdx; i -= 1) {
  //   newArr = [...newArr, arr[i]];
  // }
  // for (let i = firstIdx; i < arr.length; i++) {
  //   newArr = [...newArr, arr[i]];
  // }
  // return newArr;
  return arr.filter((_, i) => i >= firstIdx);
}

function unshift(arr, ...args) {
  return [...args, ...arr];
}

function shift(arr, args) {
  if (args <= 0) return arr;
  const retCnt = args ? args : 1;
  return [arr.slice(0, retCnt), arr.slice(retCnt)];
}

assert.deepStrictEqual(push(arr, 5, 6), [1, 2, 3, 4, 5, 6]);
assert.deepStrictEqual(pop(arr), 4);
assert.deepStrictEqual(pop(arr, 2), [3, 4]); // 2개 팝!
assert.deepStrictEqual(unshift(arr, 0), [0, 1, 2, 3, 4]);
assert.deepStrictEqual(unshift(arr, 7, 8), [7, 8, 1, 2, 3, 4]);
// assert.deepStrictEqual(shift(arr), [2, 3, 4]);
// assert.deepStrictEqual(shift(arr, 2), [3, 4]);
assert.deepStrictEqual(arr, [1, 2, 3, 4]);

assert.deepStrictEqual(shift(arr), [[1], [2, 3, 4]]);
assert.deepStrictEqual(shift(arr, 2), [
  [1, 2],
  [3, 4],
]); // 2개 shift
