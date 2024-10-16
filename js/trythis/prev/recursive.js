// 1 ~ n까지의 원소로 이루어진 배열을 만드는 함수를 재귀함수로 작성하시오.
// (단, array 메소드를 사용하지 말고, destructuring을 사용하시오)

function makeArray(n) {
  if (n === 1) {
    return [1];
  }
  return [...makeArray(n - 1), n];
}

function makeReverseArray(n) {
  if (n === 1) {
    return [1];
  }
  return [n, ...makeReverseArray(n - 1)];
}

console.log(makeArray(10));
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log(makeReverseArray(5));
// [5, 4, 3, 2, 1]
