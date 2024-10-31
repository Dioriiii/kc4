import assert from "assert";

// 다음과 같은 push, pop, shift, unshift 를 순수 함수로 작성하시오.
// (단, 입력값은 다음 예시로 한정함)

// function push(array, …args) {}
const arr = [1, 2, 3, 4];

const push = (arr, ...args) => [...arr, ...args];
const pop = (arr, cnt = 1) => {
  if (cnt === 1) return arr.at(-1);
  return arr.slice(arr.length - cnt);
};
const shift = (arr, cnt = 1) => [arr.slice(0, cnt), arr.slice(cnt)];
const unshift = (arr, ...args) => [...args, ...arr];

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

// 다음과 같은 deleteArray를 순수 함수로 작성하시오.

const deleteArray = (arr, start, end = arr.length) => {
  if (end - start < 0) return [];
  if (typeof start === "string") {
    return arr.filter((a) => a[start] !== end);
  }
  return arr.toSpliced(start, end - start);
};
assert.deepStrictEqual(deleteArray(arr, 2), [1, 2]);
assert.deepStrictEqual(deleteArray(arr, 1, 3), [1, 4]);
assert.deepStrictEqual(deleteArray(arr, 1, 0), []);
assert.deepStrictEqual(arr, [1, 2, 3, 4]);

const Hong = { id: 1, name: "Hong" };
const Kim = { id: 2, name: "Kim" };
const Lee = { id: 3, name: "Lee" };
const users = [Hong, Kim, Lee];

assert.deepStrictEqual(deleteArray(users, 2), [Hong, Kim]);
assert.deepStrictEqual(deleteArray(users, 1, 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, "id", 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, "name", "Lee"), [Hong, Kim]);

// 아래 users 배열에 대하여 추가/수정/삭제하는 순수 함수를 작성하시오.
const hong2 = { id: 1, name: "Hong" };
const choi2 = { id: 5, name: "Choi" };
const kim2 = { id: 2, name: "kim" };
const lee2 = { id: 3, name: "Lee" };
const park2 = { id: 4, name: "Park" };
const users2 = [kim2, lee2, park2]; // 오염되면 안됨!!

users2.addUser = function (...args) {
  return [...this, ...args];
};

users2.removeUser = function (...args) {
  return this.filter((a) => !args.some((arg) => arg === a));
};

users2.changeUser = function (currUser, changedUser) {
  return this.map((a) => (a === currUser ? changedUser : a));
};

assert.deepStrictEqual(users2.addUser(hong2), [kim2, lee2, park2, hong2]); // [kim2, lee2, park, hong]
assert.deepStrictEqual(users2.removeUser(lee2), [kim2, park2]); // [kim2, park2]
assert.deepStrictEqual(users2.removeUser(lee2, kim2), [park2]); // [kim2, park2]
assert.deepStrictEqual(users2.changeUser(kim2, choi2), [choi2, lee2, park2]); // [choi, lee2, park2]
// (주의) Array.prototype 조작 금지!

// ex1) 배열의 각 원소를 String으로 변환하시오.
const arr2 = [1, 2, 3, true];
const ret1 = arr2.map(String);
assert.deepStrictEqual(ret1, ["1", "2", "3", "true"]);
// ex2) 다음과 같이 작동하는 classNames 함수를 작성하시오.
// const classNames = (...args) =>
//   args.filter((a) => String(a).trim() !== "").join(" ");
const classNames = (...args) => args.map(String).filter(Boolean).join(" ");
const ret2 = classNames("", "a b c", "d", "", "e");
assert.strictEqual(ret2, "a b c d e");
// 주의: ' a b c d  e'면 안됨!!
// cf. example in React
// <div classNames=({x ? 'a b' : ''}, {'' ? 'c' : ''}, {z && 'e f'})

// Array.reduce 함수를 고차 함수로 직접 구현하시오.
const kim3 = { id: 2, name: "kim" };
const lee3 = { id: 3, name: "Lee" };
const park3 = { id: 4, name: "Park" };
const users3 = [kim3, lee3, park3];

const reduce = (arr, cb, init) => {
  let ret = init !== undefined ? cb(init, arr[0]) : arr[0];
  for (let i = 1; i < arr.length; i++) {
    ret = cb(ret, arr[i]);
  }
  return ret;
};

assert.strictEqual(
  reduce([1, 2, 3], (a, b) => a + b, 0),
  6
);
assert.strictEqual(
  reduce([1, 2, 3, 4, 5], (a, b) => a + b),
  15
);
assert.strictEqual(
  reduce([1, 2, 3, 4, 5], (a, b) => a * b, 1),
  120
);
assert.strictEqual(
  reduce([2, 2, 2], (a, b) => a * b),
  8
);
assert.strictEqual(
  reduce([3, 3, 3], (a, b) => a * b, 0),
  0
);

reduce([1, 2, 3], (a, b) => a + b, 0); // 6이면 통과!
// cf. [1,2,3].reduce((a,b) => a + b, 0);       // 6
reduce([1, 2, 3, 4, 5], (a, b) => a + b); // 15면 통과!
reduce([1, 2, 3, 4, 5], (a, b) => a * b, 1); // 120이면 통과!
reduce([2, 2, 2], (a, b) => a * b); // 8이면 통과!
reduce([3, 3, 3], (a, b) => a * b, 0); // 0이면 통과!
reduce(users3, (acc, user) => acc + user.name); // [object Object]LeePark

// 다음과 같은 정수 배열이 주어졌을 때, reduce를 이용하여, 각 요소를
// 다음의 순서로 처리하시오 . (1회전으로 처리!)
// → 배열의 각 요소를 제곱 n => n ** 2 [square]
// → 배열 각 요소의 제곱근 n => Math.sqrt(n) [sqrt]
// → 배열의 각 요소를 세제곱 n => n ** 3 [cube]
const arr3 = [1, 2, 3, 4, 5];
// cf.arr
//   .map((a) => a ** 2)
//   .map((a) => Math.sqrt(a))
//   .map((a) => a ** 3);
const square = (n) => n ** 2;
const sqrt = (n) => Math.sqrt(n);
const cube = (n) => n ** 3;
const reduceArr = [cube, cube, square, sqrt];

// ⇒⇒⇒ 결과 => [ 1, 8, 27, 64, 125 ]
// TryThis. 수행 순서를 자유롭게 변경하도록 해보세요 .

arr3.map((a) =>
  reduceArr.reduce((acc, cur, i) => (i === 1 ? cur(acc(a)) : cur(acc)))
);

console.log(
  "🚀 ~ arr3.map((a) => reduceArr.reduce((acc, cur, i) => (i === 0 ? cur(a) : cur(acc)))):",
  arr3.map((a) =>
    reduceArr.reduce((acc, cur, i) => (i === 1 ? cur(acc(a)) : cur(acc)))
  )
);

// 다음과 같은 정수 배열을 생성하는 range 함수를 구현하시오.
// const range = (st, e, s) => {
//   if ((st - e) * s > 0) return [];
//   if (st === e || (st === 0 && !e)) return [st];

//   let end = typeof e === "number" ? e : st < 0 ? -1 : st;
//   const start = typeof e === "number" || st < 0 ? st : 1;
//   const ret = [];
//   if (start < end) {
//     let step = typeof s === "number" ? s : 1;
//     for (let i = start; i <= end; i += step) {
//       ret.push(i);
//     }
//   } else {
//     let step = typeof s === "number" ? s : -1;
//     for (let i = start; i >= end; i += step) {
//       ret.push(i);
//     }
//   }
//   return ret;
// };
const range = (s, e, stepArg) => {
  if (stepArg === 0 || s === e || (s === 0 && !e)) return [s];
  if ((s - e) * stepArg > 0) return [];

  const ret = [];

  let step = s > e ? -1 : 1; // stepArg 가 없을 때
  let start = s < 0 ? s : 1; // e 가 없을 때
  let end = s < 0 ? -1 : s; // e 가 없을 때

  if (typeof e === "number") {
    // e 가 주어졌을 때,
    start = s;
    end = e;
  }
  // start = typeof e === "number" ? s : start;
  // end = typeof e === "number" ? e : end;
  step = typeof stepArg === "number" ? stepArg : step;

  for (let i = start; step > 0 ? i <= end : i >= end; i += step) {
    ret.push(i);
  }
  return ret;
};

// console.log(range(1, 7, -1));
// console.log(range(7, 2, 2));
assert.deepStrictEqual(range(1, 10, 1), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.deepStrictEqual(range(1, 10, 2), [1, 3, 5, 7, 9]);
assert.deepStrictEqual(range(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.deepStrictEqual(range(10, 1), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
assert.deepStrictEqual(range(5), [1, 2, 3, 4, 5]);
assert.deepStrictEqual(range(-5), [-5, -4, -3, -2, -1]);
assert.deepStrictEqual(range(5, 5), [5]);
assert.deepStrictEqual(range(5, 5, 0), [5]);
assert.deepStrictEqual(range(5, 5, -1), [5]);
assert.deepStrictEqual(range(5, 1, 1), []);
assert.deepStrictEqual(range(0), [0]);
assert.deepStrictEqual(range(0, -1), [0, -1]);
assert.deepStrictEqual(range(-3, 0), [-3, -2, -1, 0]);
assert.deepStrictEqual(range(5, 2), [5, 4, 3, 2]);
// range(1, 10, 1); // [1, 2, 3, 4,  5, 6, 7, 8, 9, 10]
// range(1, 10, 2); // [1, 3, 5, 7, 9]
// range(1, 10); // [1, 2, 3, 4,  5, 6, 7, 8, 9, 10]
// range(10, 1); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
// range(10, 1, -2); // [10, 8, 6, 4, 2]
// range(5); // [1, 2, 3, 4, 5]
// range(100); // [1, 2, 3, 4, 5, …, 99, 100]
// range(-5); // [-5, -4, -3, -2, -1]
// range(5, 5); // [5]                  range(1, 5, 0); // [1]
// range(5, 5, 0); // [5]                  range(0, 5);   // [0, 1, 2, 3, 4, 5]
// range(5, 5, -1); // [5]                  range(0, -1);  // [0, -1]
// range(5, 1, 1); // []                   range(0, -3);  // [0, -1, -2, -3]
// range(1, 5, -1); // []                   range(-3, 0);  // [-3, -2, -1, 0]
// range(1, 5, 6); // [1]                  range(5, 1);   // [5, 4, 3, 2, 1]
// range(0); // [0]     range(0, 0);  // [0]      range(0, 0, 5);   // [0]
// range(2, 1, -5); // [2]     range(0, -1, -5);  // [0]

// 다음과 같은 정수 배열이 주어지고, 양의 정수 N이 주어졌을 때,
// 배열에서 합해서 N이되는 두 개의 요소(index)를 찾는 keyPair(arr, N)
// 함수를 작성하시오. (O(n^2) 이면 fail!!)

// keyPair([1, 3, 4, 5], 7); // [1, 2]
// keyPair([1, 4, 45, 6, 10, 8], 16); // [3, 4]
// keyPair([1, 2, 4, 3, 6], 10); // [2, 4]
// keyPair([1, 2, 3, 4, 5, 7], 9); // [3, 4]  or [1, 5]
// cf. O(n^2) ⇒ ⇒ ⇒ O(N) || O(logN)
const keyPair = (arr, N) => {
  const keyVal = {};
  for (let i = 0; i < arr.length; i++) {
    const curVal = arr[i];
    const findVal = N - curVal;
    if (findVal in keyVal) return [keyVal[findVal], i];
    keyVal[curVal] = i;
  }
  return [];
};
assert.deepStrictEqual(keyPair([1, 3, 4, 5], 7), [1, 2]);
assert.deepStrictEqual(keyPair([1, 4, 45, 6, 10, 8], 16), [3, 4]);
assert.deepStrictEqual(keyPair([1, 2, 4, 3, 6], 10), [2, 4]);
assert.deepStrictEqual(keyPair([1, 2, 3, 4, 5, 7], 9), [3, 4]);
assert.deepStrictEqual(keyPair([1, 2, 3, 4], 9), []);
