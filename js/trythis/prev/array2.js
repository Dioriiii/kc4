import assert from "assert";

// 1) 특정 배열의 원소 중 소수가 존재하는 체크하는 함수를 작성하시오.
// 2 ~ 본인-1 사이 정수로 나뉘는 수가 존재하지 않아야함
const isPrime = (n) => {
  if (!Number(n)) throw new Error("숫자가 아닙니다!");

  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return n > 1 ? true : false;
};

const hasPrime = (arr) => {
  return arr.some(isPrime);
};

assert.strictEqual(isPrime(177), false);
assert.strictEqual(isPrime(2), true);

assert.strictEqual(hasPrime([1, 2, 3]), true);
assert.strictEqual(hasPrime([1]), false);
assert.strictEqual(hasPrime([4, 6, 8]), false);
assert.strictEqual(hasPrime([4, 6, 7]), true);

// 2) 특정 배열의 원소 중 소수만 추출하는 함수를 작성하시오.
const primeNumbers = (arr) => arr.filter(isPrime);
const arr100 = [];
for (let i = 1; i <= 100; i++) {
  arr100.push(i);
}
assert.deepStrictEqual(
  primeNumbers(arr100),
  [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97,
  ]
);
