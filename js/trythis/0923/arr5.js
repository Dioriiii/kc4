import assert from "assert";

// Array.reduce 함수를 고차 함수로 직접 구현하시오.
const kim = { id: 2, name: "kim" };
const lee = { id: 3, name: "Lee" };
const park = { id: 4, name: "Park" };
const users = [kim, lee, park];

const reduce = (arr, fn, initValue) => {
  newArr = initValue || initValue === 0 ? [initValue, ...arr] : arr;
  let ret = 0;
  newArr.forEach((a, i) => {
    i > 1 ? (ret = fn(ret, a)) : i === 1 ? (ret = fn(newArr[0], a)) : "";
  });
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
// reduce(users, (acc, user) => acc + user.name); // [object Object]LeePark
