import assert from "assert";
function range(start, end) {
  // 피보나치 수열을
  // 1) Loop를 이용하여 작성하시오.
  // 2) 순수 재귀를 이용하여 작성하시오.
  // 3) memoization하여 작성하시오.

  // 수열의 규칙은 f(n) = f(n - 2) + f(n - 1)  (단, n <= 1 일 때 f(n) = n)
  // 즉, 0 ~ 9까지의 값은 [0, 1, 1, 2, 3, 5, 8, 13, 21, 34] 이다.
  // fibonacci(5); // 5
  // fibonacci(7); // 13
  // fibonacci(30); // 832040

  const fibLoop = (n) => {
    const arr = [];
    if (n <= 1) return n;
    for (let i = 0; i < n; i++) {
      if (i <= 0) {
        arr.push(i);
        continue;
      }
      arr.push(arr[n - 1] + arr[n - 2]);
    }
    return arr.at(-1);
  };

  const fibPure = (n) => (n <= 1 ? n : fibPure(n - 2) + fibPure(n - 1));
  const fibMemo = (n) => {
    const memo = { 0: 0, 1: 1 };
    return memo[n] || (memo[n] = memo[n - 2] + memo[n - 1]);
  };

  assert.deepStrictEqual(fibPure(5), 5);
  assert.deepStrictEqual(fibPure(7), 13);
  assert.deepStrictEqual(fibLoop(5), 5);
  assert.deepStrictEqual(fibLoop(7), 13);
  assert.deepStrictEqual(fibMemo(5), 5);
  assert.deepStrictEqual(fibMemo(7), 13);
  assert.deepStrictEqual(fibMemo(30), 83204);
}
