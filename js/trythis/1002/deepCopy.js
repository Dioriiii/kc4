// 깊은 복사 deepCopy 함수 작성
// (Map, Set, WeakMap, WeakSet도 복사)
import assert from "assert";

const deepCopy = (obj) => {
  if (
    obj === null ||
    typeof obj !== "object" ||
    obj instanceof WeakSet ||
    obj instanceof WeakMap
  ) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((a) => deepCopy(a));
  }
  if (obj instanceof Set) {
    return new Set([...obj].map((a) => deepCopy(a)));
  }
  if (obj instanceof Map) {
    return new Map([...obj].map((a) => deepCopy(a)));
  }

  const ret = {};
  for (key of Reflect.ownKeys(obj)) {
    ret[key] = deepCopy(obj[key]);
  }
  return ret;
};

const arr = [1, 2, 3, 4, 5];
const hong = { id: 1, age: 60 };

const kim2 = {
  nid: 3,
  addr: "Pusan",
  arr: [1, 2, 3, { aid: 1 }, [10, 20]],
  oo: { id: 1, name: "Hong", addr: { city: "Seoul" } },
  xx: null,
  str: new String("String!"),
  nn: new Number(77),
  yy: function () {
    console.log(this.oo);
  },
  yyy() {
    console.log(this.oo);
  },
  [Symbol()]: 9,
  [Symbol()]: Symbol("symbol2"),
  zs: new Set([arr, hong]),
  zws: new WeakSet([arr, hong]),
  zm: new Map([[hong, arr]]),
  zwm: new WeakMap([[hong, arr]]),
};

const newKim = deepCopy(kim2);
console.log(newKim);
assert.deepStrictEqual(newKim, kim2, "deepCopy equal fail!");
newKim.addr = "Daegu";
newKim.oo.name = "Kim";
assert.notDeepStrictEqual(newKim, kim2, "Not Valid Deep Copy!");
newKim.arr[0] = 100;
newKim.arr[3].aid = 200;
newKim.arr[4][1] = 300;
newKim.oo.addr.city = "Daejeon";
// newKim.str = "String!!!";
assert.notStrictEqual(
  kim2.arr[4][1],
  newKim.arr[4][1],
  "pass2: 다르지 않아요!"
);
assert.notStrictEqual(
  kim2.oo.addr.city,
  newKim.oo.addr.city,
  "Not Pass3: city가 다르지 않아요!"
);
console.log(newKim.zs.has(hong));
