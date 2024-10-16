// 피보나치 수열을
// 1) Loop를 이용하여 작성하시오.
function fibonacci1(n) {
  if (n <= 1) return n;

  let fibTable = [];
  for (i = 0; i <= n; i = i + 1) {
    if (i <= 1) {
      fibTable = [...fibTable, i];
      continue;
    }
    fibTable = [...fibTable, fibTable[i - 2] + fibTable[i - 1]];
  }
  return console.log(fibTable[n]);
}

// 2) 순수 재귀를 이용하여 작성하시오.
function fibonacci2(n) {
  if (n <= 1) return n;
  return fibonacci2(n - 2) + fibonacci2(n - 1);
}

// 3) memoization하여 작성하시오.'
const memoizedTable = {};
function fibonacci3(n) {
  if (n <= 1) return n;
  return (
    memoizedTable[n] ||
    (memoizedTable[n] = fibonacci3(n - 2) + fibonacci3(n - 1))
  );
}

// 클로저 연습!!!
function closureMemo(fn) {
  const memoizedTable = {};
  return (n) => {
    return memoizedTable[n] || (memoizedTable[n] = fn(n));
  };
}
const closure1 = closureMemo((n) => {
  if (n <= 1) return n;
  return closure1(n - 2) + closure1(n - 1);
});
console.log(closure1(10));

function closurePureRecursive(fn) {
  return (n) => {
    if (n <= 1) return n;
    return fn(n);
  };
}
const closure2 = closurePureRecursive((n) => {
  return closure2(n - 2) + closure2(n - 1);
});

console.log(closure2(7));

// 수열의 규칙은 f(n) = f(n - 2) + f(n - 1)  (단, n <= 1 일 때 f(n) = n)
// 즉, 0 ~ 9까지의 값은 [0, 1, 1, 2, 3, 5, 8, 13, 21, 34] 이다.
fibonacci1(7); // 13
fibonacci2(5); // 5
fibonacci3(7); // 13
console.log("🚀 ~ fibonacci3:", fibonacci3(7));
fibonacci3(30); // 832040
console.log("🚀 ~ fibonacci3(30);:", fibonacci3(30));
