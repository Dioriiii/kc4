import assert from "assert";

const arr = [100, 200, 300, 400, 500, 600, 700];

// 1. for-in문을 사용하여 배열의 인덱스(키)를 출력하시오.
for (idx in arr) {
  console.log(idx);
}

// 2. for-in문을 사용하여 배열의 원소(값)를 출력하시오. (of)
for (idx in arr) {
  console.log(arr[idx]);
}

for (num of arr) {
  console.log(num);
}

const obj = { name: "Kim", addr: "Yongsan", level: 1, role: 9, receive: false };
// 3. for-in문을 사용하여 프로퍼티 이름(키)을 출력하시오.
for (k in obj) {
  console.log(k);
}

// 4. for-in문을 사용하여 프로퍼티 값을 출력하시오.
for (k in obj) {
  console.log(obj[k]);
}

// 5. for-of문을 사용하여 프로퍼티 값을 출력하시오.
for (val of Object.values(obj)) {
  console.log(val);
}

// 6. level 프로퍼티가 열거(entries)되지 않도록 설정하시오. // Object.defineProperty
Object.defineProperty(obj, "level", { enumerable: false });

// 7. role 프로퍼티는 읽기전용으로 설정하시오.
Object.defineProperty(obj, "role", {
  enumerable: true,
  writable: false,
  configurable: false,
});

// [['A', 10, 20], ['B', 30, 40], ['C', 50, 60, 70]] 배열을 객체로 만드시오. (makeObjectFromArray)
// => { 'A': [10, 20], 'B': [30, 40], 'C': [50, 60, 70] }

const arr1 = [
  ["A", 10, 20],
  ["B", 30, 40],
  ["C", 50, 60, 70],
];

const result1 = Object.fromEntries(arr1.map(([key, ...val]) => [key, val]));
console.log(result1);

// 위에서 만든 객체를 다시 배열로 만드시오. (makeArrayFromObject)
// => [['A', 10, 20], ['B', 30, 40], ['C', 50, 60, 70]]
const result2 = Object.entries(result1).map(([key, val]) => [key, ...val]);
console.log(result2);
assert.deepStrictEqual(
  result2,
  [
    ["A", 10, 20],
    ["B", 30, 40],
    ["C", 50, 60, 70],
  ],
  "result2 is Not Equals!!!"
);

// 원시값(primitive)만을 갖는 객체 kim을 복사하는 프로그램을 Object의 클래스 메소드 또는 spread(...) 연산자를  사용하지 말고 작성하시오.

// 1) shallow copy
const kim = { nid: 3, nm: "Kim", addr: "Pusan" };

function shallowCopy(obj) {
  const newObj = {};
  // for (key in obj) {
  //   newObj[key] = obj[key];
  // }
  for (const [k, v] of Object.entries(obj)) {
    newObj[k] = v;
  }
  return newObj;
}
const newKim1 = shallowCopy(kim);
newKim1.addr = "Daegu";
console.log(kim.addr !== newKim1.addr); // true면 통과!
assert.notDeepStrictEqual(kim, newKim1);

// 2) 이하 deep copy
const kim2 = {
  nid: 3,
  nm: "Kim",
  addr: { city: "Pusan" },
  birth: { detail: { year: "2000", month: "jan", day: "20" } },
};

function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  const newObj = {};
  // for (key in obj) {
  //   typeof obj[key] !== "object"
  //     ? (newObj[key] = obj[key])
  //     : (newObj[key] = deepCopy(obj[key]));
  // }
  for (const [k, v] of Object.entries(obj)) {
    // typeof v !== "object" ? (newObj[k] = v) : (newObj[k] = deepCopy(v));
    newObj[k] = deepCopy(v);
  }
  return newObj;
}

const newKim2 = deepCopy(kim2);
assert.deepStrictEqual(newKim2, kim2);
newKim2.addr.city = "Daegu";
assert.notDeepStrictEqual(newKim2, kim2, "deepCopy Equal!!!");
// console.log(kim2.addr.city !== newKim2.addr.city); // true면 통과!
kim2.birth.detail.year = "1999";
console.log(kim2.birth.detail !== newKim2.birth.detail); // true면 통과!
