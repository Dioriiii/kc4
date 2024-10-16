import assert from "assert";
// 다음과 같이 부서와 직원 객체가 있을 때, deptMap과 empDept를 만들고, 개발팀 직원 이름 목록을 출력하시오. (key: id)
const hrTeam = { id: 1, dname: "인사팀" };
const devTeam = { id: 2, dname: "개발팀" };
const depts = [hrTeam, devTeam];
const hong = { id: 1, name: "Hong", dept: 1 }; // hong.dept.name ⇒ deptMap.get(hong.dept)?.name
const kim = { id: 2, name: "Kim", dept: 2 };
const emps = [
  hong,
  kim,
  { id: 3, name: "Park", dept: 2 },
  { id: 4, name: "Choi", dept: 2 },
];
const deptMap = new Map();
for (dept of depts) deptMap.set(dept.id, dept);
console.log(deptMap); // Map(2) { 1 => { id: 1, dname: '인사팀' }, 2 => { id: 2, dname: '개발팀' } }  ⇐ deptMap.get(2)

const empMap = new Map();
for (emp of emps) empMap.set(emp.id, emp);
console.log(empMap); // Map(2) { 1 => {id: 1, name: 'Hong', dept: 1}, 2 => {id: 2, name: 'Kim', dept: 2}, … }

const deptMap2 = new Map(depts.map((d) => [d.id, d]));
console.log("d2", deptMap2);

const empDept = new Map();
for (emp of emps) {
  // pure
  // const { id, name } = emp;
  // empDept.set({ id, name }, deptMap.get(emp["dept"]));

  // non-pure
  empDept.set(emp, deptMap.get(emp["dept"]));
  delete emp.dept;
}

console.log(empDept); // Map(4) { { id: 1, name: 'Hong' } => { id: 1, dname: '인사팀' }, { id: 2, name: 'Kim' } => { id: 2, dname: '개발팀' }, { id: 3, name: 'Park' } => { id: 2, dname: '개발팀' }, { id: 4, name: 'Choi' } => { id: 2, dname: '개발팀' } }

console.log(empDept.get(kim).dname); // '개발팀'
// 개발팀 직원 목록 출력 ⇒ Kim, Park, Choi

assert.deepStrictEqual(
  [...empDept.keys()],
  emps.map(({ id, name }) => ({ id, name }))
);
assert.strictEqual(empDept.get(kim)?.dname, devTeam.dname);

function getEmp(empId) {
  return { ...empMap.get(empId), dept: empDept.get(empMap.get(empId)) };
  // {id:1, name: 'Hong', dept: {id:1, dname: 'Sale'}}
}
assert.deepStrictEqual(getEmp(1), {
  id: 1,
  name: "Hong",
  dept: { id: 1, dname: "인사팀" },
});

console.log("-------------------------------------------------");
// 이전 Array.prototype에 Set을 이용하여 uniqBy() 함수도 추가하시오.
Array.prototype.uniqBy = function (prop) {
  return [...new Set(this.map((a) => a.dept))];
};
const hong1 = { id: 1, name: "Hong", dept: "HR" };
const kim1 = { id: 2, name: "Kim", dept: "Server" };
const lee = { id: 3, name: "Lee", dept: "Front" };
const park = { id: 4, name: "Park", dept: "HR" };
const ko = { id: 7, name: "Ko", dept: "Server" };
const loon = { id: 6, name: "Loon", dept: "Sales" };
const choi = { id: 5, name: "Choi", dept: "Front" };
const users = [hong1, kim1, lee, park, ko, loon, choi];
users.uniqBy("dept"); // [ 'HR', 'Server', 'Front', 'Sales' ];
assert.deepStrictEqual(users.uniqBy("dept"), [
  "HR",
  "Server",
  "Front",
  "Sales",
]);

// 다음과 같은 집합 A, B, C가 있을 때, 각 집합의 교집합, 차집합, 합집합을 구하는 함수를 작성하시오.
const intersect = (a, b) => {
  // return [...new Set(a.filter((a) => b.includes(a)))];
  return [...new Set(a)].filter((a) => b.includes(a));
};

const diff = (a, b) => {
  return [...new Set(a.filter((a) => !b.some((b) => b === a)))];
};

const union = (a, b) => {
  return [...new Set([...a, ...b])];
};

const A = [1, 2, 3, 4, 5, 3];
const B = [1, 22, 3, 44, 5];
const C = [11, 222, 3, 4, 555];

assert.deepStrictEqual(intersect(A, B), [1, 3, 5]);
assert.deepStrictEqual(intersect(A, C), [3, 4]);
assert.deepStrictEqual(diff(A, B), [2, 4]);
assert.deepStrictEqual(diff(B, A), [22, 44]);
assert.deepStrictEqual(diff(A, C), [1, 2, 5]);
assert.deepStrictEqual(diff(B, C), [1, 22, 44, 5]);
assert.deepStrictEqual(union(A, B), [1, 2, 3, 4, 5, 22, 44]);
assert.deepStrictEqual(union(A, C), [1, 2, 3, 4, 5, 11, 222, 555]);

// 깊은 복사 deepCopy 함수 작성
// (Map, Set, WeakMap, WeakSet도 복사)
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

const kim2 = {
  nid: 3,
  addr: "Pusan",
  arr: [1, 2, 3, { aid: 1 }, [10, 20]],
  oo: { id: 1, name: "Hong", addr: { city: "Seoul" } },
  xx: null,
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
