import assert from "assert";
// 모든 Array가 다음 기능을 갖도록 구현하세요.
// 1) mapBy(), findBy(), filterBy(), rejectBy(), sortBy()
// 2) firstObject, lastObject => 문제를 이해 못하겠어욥..
const hong = { id: 1, name: "Hing" };
const kim = { id: 2, name: "Kim" };
const lee = { id: 3, name: "Lee" };
const users = [hong, lee, kim];

Array.prototype.mapBy = function (prop) {
  const ret = [];
  this.forEach((a) => {
    a[prop] != null ? ret.push(a[prop]) : "";
  });
  return ret;
};

Array.prototype.filterBy = function (key, val, b) {
  const ret = [];
  boolean = b == null ? true : b;
  return this.filter((a, i) =>
    boolean ? String(a[key]).includes(val) : !String(a[key]).includes(val)
  );
};

Array.prototype.rejectBy = function (key, val, b) {
  const ret = [];
  boolean = b == null ? true : b;
  return this.filter((a, i) =>
    boolean ? !String(a[key]).includes(val) : String(a[key]).includes(val)
  );
};

Array.prototype.findBy = function (key, val) {
  const ret = [];
  for (item of this) {
    if (item[key] === val) return item;
  }
  return "";
};

Array.prototype.sortBy = function (key) {
  const [k, o = "asc"] = key.split(":");
  return this.toSorted((a, b) => {
    const valA = a[k];
    const valB = b[k];
    if (valA < valB) {
      return o.toLowerCase() === "asc" ? -1 : 1;
    }
    if (valA > valB) {
      return o.toLowerCase() === "asc" ? 1 : -1;
    }
    return 0;
  });
};

// assert.deepStrictEqual([arr.firstObject, arr.lastObject], [1, 5]);
assert.deepStrictEqual(users.mapBy("id"), [1, 3, 2]);
assert.deepStrictEqual(users.mapBy("name"), ["Hing", "Lee", "Kim"]);
assert.deepStrictEqual(users.filterBy("id", 2), [kim]);
assert.deepStrictEqual(users.filterBy("name", "i", true), [hong, kim]); // key, value일부, isInclude
assert.deepStrictEqual(users.rejectBy("id", 2), [hong, lee]);
assert.deepStrictEqual(users.rejectBy("name", "i", true), [lee]);
assert.deepStrictEqual(users.findBy("name", "Kim"), kim);
assert.deepStrictEqual(users.sortBy("name:desc"), [lee, kim, hong]);
assert.deepStrictEqual(users.sortBy("name"), [hong, kim, lee]);
// assert.deepStrictEqual(users.firstObject, hong);
// assert.deepStrictEqual(users.lastObject, lee);
// users.firstObject = kim;
// assert.deepStrictEqual(users.firstObject, kim);
// users.lastObject = hong;
// assert.deepStrictEqual(users.lastObject, hong);
