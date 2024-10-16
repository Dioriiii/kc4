import assert from "assert";

const arr2 = [1, 2, 3, 4, 5];

// ex1) [2,3]을 추출
arr2.slice(1, 3);
assert.deepStrictEqual(arr2.slice(1, 3), [2, 3]);

// ex2) [3]부터 모두 다 추출
arr2.slice(2);
assert.deepStrictEqual(arr2.slice(2), [3, 4, 5]);

// ex3) [2,3,4] 제거하기
arr2.splice(1, 3);
assert.deepStrictEqual(arr2, [1, 5]);

// ex4) 복원하기
arr2.splice(1, 0, ...[2, 3, 4]);
assert.deepStrictEqual(arr2, [1, 2, 3, 4, 5]);

// ex5) [3] 부터 끝까지 제거하기
arr2.splice(2);
assert.deepStrictEqual(arr2, [1, 2]);

// ex6) 복원하기
arr2.splice(2, 0, ...[3, 4, 5]);
assert.deepStrictEqual(arr2, [1, 2, 3, 4, 5]);

// ex7) [1,2, 'X', 'Y', 'Z', 4, 5] 만들기
// - 방법1) 3부터 모두 지우고 'X', 'Y', 'Z', 4, 5 추가
arr2.splice(2, arr2.length, ...["X", "Y", "Z", 4, 5]);
assert.deepStrictEqual(arr2, [1, 2, "X", "Y", "Z", 4, 5]);
arr2.splice(2, 3, 3); // 복원

// - 방법2) 3만 지우고 'X', 'Y', 'Z' 추가
arr2.splice(2, 1, ..."XYZ");
assert.deepStrictEqual(arr2, [1, 2, "X", "Y", "Z", 4, 5]);
arr2.splice(2, 3, 3); // 복원

// ex8) 위 7번 문제를 splice를 사용하지 말고 작성하시오.
arr2.pop();
arr2.pop();
arr2.pop();
arr2.push("X", "Y", "Z", 4, 5);
assert.deepStrictEqual(arr2, [1, 2, "X", "Y", "Z", 4, 5]);
arr2.splice(2, 3, 3); // 복원
assert.deepStrictEqual(
  [...arr2.slice(0, 2), ..."XYZ", ...arr2.slice(3)],
  [1, 2, "X", "Y", "Z", 4, 5]
);
