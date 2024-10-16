import assert from "assert";

// 아래 users 배열에 대하여 추가/수정/삭제하는 순수 함수를 작성하시오.
const hong = { id: 1, name: "Hong" };
const choi = { id: 5, name: "Choi" };
const kim = { id: 2, name: "kim" };
const lee = { id: 3, name: "Lee" };
const park = { id: 4, name: "Park" };
const users = [kim, lee, park]; // 오염되면 안됨!!

users.addUser = function (...args) {
  return [...this.slice(), ...args];
};

users.removeUser = function (...args) {
  return this.filter((user) => args.every((a) => user !== a));
};

users.changeUser = function (...args) {
  const original = args[0];
  const replace = args[1];
  const ret = this.slice();
  this.some((a, i) => (a === original ? (ret[i] = replace) : ""));
  return ret;
};
Object.defineProperties(users, {
  addUser: { enumerable: false },
  removeUser: { enumerable: false },
  changeUser: { enumerable: false },
});

assert.deepStrictEqual(users.addUser(hong), [kim, lee, park, hong]); // [kim, lee, park, hong]
assert.deepStrictEqual(users.removeUser(lee), [kim, park]); // [kim, park]
assert.deepStrictEqual(users.removeUser(lee, kim), [park]); // [kim, park]
assert.deepStrictEqual(users.changeUser(kim, choi), [choi, lee, park]); // [choi, lee, park]
// (주의) Array.prototype 조작 금지!
