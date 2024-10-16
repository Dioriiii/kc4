import assert from "assert";

// 1) 특정 배열의 원소 중 소수가 존재하는 체크하는 함수를 작성하시오.

const isPrime = (n) => {
  if (n <= 1) return false;
  arrLen = Math.round(Math.sqrt(n) - 1);
  const arr = Array.from(Array(arrLen), (_, i) => i + 2);
  return !arr.some((a) => {
    return n % a === 0;
  });
};

const hasPrime = (arr) => {
  // num > 1 && num % (2~num-1) === 1 이 참일 경우
  return arr.some(isPrime);
};

assert.strictEqual(hasPrime([1, 2, 3]), true);
assert.strictEqual(hasPrime([1]), false);
assert.strictEqual(hasPrime([4, 6, 8]), false);
assert.strictEqual(hasPrime([4, 6, 7]), true);

// 2) 특정 배열의 원소 중 소수만 추출하는 함수를 작성하시오.
const arr100 = (() => {
  const arr = [];
  for (let i = 1; i <= 100; i += 1) {
    arr.push(i);
  }
  return arr;
})();

assert.strictEqual(isPrime(177), false);
assert.strictEqual(isPrime(2), true);

const primeNumbers = (arr) => arr.filter(isPrime);

assert.deepStrictEqual(
  primeNumbers(arr100),
  [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97,
  ]
);
