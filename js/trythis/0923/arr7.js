import assert from "assert";
// 다음과 같은 정수 배열을 생성하는 range 함수를 구현하시오.
function range(s, e, stepArg) {
  let start = s < 0 ? s : 1; // arg 가 s 하나일 때 start
  let end = s < 0 ? -1 : s; // arg 가 s 하나일 때 end
  let step = s > e ? -1 : 1; // stepArg 가 없을 때의 step

  if (!!e || !!stepArg || e === 0 || stepArg === 0) {
    // args 가 2개 이상 일때
    start = s; // s 와 e가 주어졌을 때
    end = e; // s 와 e가 주어졌을 때
    step = !stepArg ? step : stepArg; // stepArg 가 주어졌을 때 stepArg 아니라면 상단에서 정의한 step
  }

  const ret = [];
  if (s === e || stepArg === 0 || (e !== 0 && end === 0)) return [end];
  if ((s < e && stepArg < 0) || (s > e && stepArg > 0)) return ret;

  for (let i = start; step > 0 ? i <= end : i >= end; i += step) {
    ret.push(i);
  }
  return ret;
}
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
