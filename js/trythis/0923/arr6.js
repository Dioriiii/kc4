// 다음과 같은 정수 배열이 주어졌을 때, reduce를 이용하여, 각 요소를 다음의 순서로 처리하시오. (1회전으로 처리!)
//  → 배열의 각 요소를 제곱   n => n ** 2            [square]
//  → 배열 각 요소의 제곱근   n => Math.sqrt(n)      [sqrt]
//  → 배열의 각 요소를 세제곱  n => n ** 3            [cube]
const arr = [1, 2, 3, 4, 5];
// cf.arr
//   .map((a) => a ** 2)
//   .map((a) => Math.sqrt(a))
//   .map((a) => a ** 3);
// ⇒⇒⇒ 결과 => [ 1, 8, 27, 64, 125 ]
const square = (n) => n ** 2;
const sqrt = (n) => Math.sqrt(n);
const cube = (n) => n ** 3;
const newArr = arr.map((a) => {
  return [square, sqrt, cube].reduce((acc, curr) => curr(acc), a);
});

// TryThis. 수행 순서를 자유롭게 변경하도록 해보세요.
const newArr2 = arr.map((a) => {
  return [square, sqrt, cube].reduce((acc, curr) => curr(acc), a);
});
console.log("🚀 ~ newArr2 ~ newArr2:", newArr2);

const newArr3 = arr.map((a) => {
  return [square, sqrt, cube].reduce((acc, curr) => curr(acc), a);
});
console.log("🚀 ~ newArr3 ~ newArr3:", newArr3);
