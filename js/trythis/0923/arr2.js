// 다음과 같은 deleteArray를 순수 함수로 작성하시오.
import assert from "assert";

const arr = [1, 2, 3, 4];

function deleteArray(arr, ...args) {
  if (!arr || !Array.isArray(arr)) return [];
  // args[1] 이 있고 args[0] 이 string 일 경우 : arr 돌면서 key 가 args[0] value 가 args[1] 인 것만 출력
  if (args[1] && typeof args[0] === "string") {
    const key = args[0];
    const value = args[1];
    return arr.filter((a) => a[key] !== value);
  }

  // args[1] 이 없을 경우 : arr[args[0]] 부터 arr[arr.length-1] 까지 삭제 -> arr[0] ~ arr[args[0]-1] 까지 출력
  // args[1] 이 있을 경우 : arr[0] ~ arr[args[0]-1] 까지 출력 / arr[args[1]] 부터 arr[arr.length-1] 까지 출력
  return !args[1] && args[1] !== 0 && typeof args[0] === "number"
    ? arr.slice(0, args[0])
    : args[1] && args[0] >= 0 && args[0] <= args[1]
    ? [...arr.slice(0, args[0]), ...arr.slice(args[1])]
    : args[1] && (args[0] < 0 || args[0] > args[1])
    ? arr
    : [];
}
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
