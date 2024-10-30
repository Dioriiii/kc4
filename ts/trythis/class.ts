// Array.prototype을 확장한 함수들을 TypeScript로 작성하시오.
// mapBy, filterBy, findBy, rejectBy, sortBy, groupBy, firstObject, lastObject
interface Array<T> {
  mapBy(prop: string): any;
  filterBy(key: string, val: string | number, b?: boolean): T[];
  rejectBy(key: string, val: string | number, b?: boolean): T[];
  findBy(key: string, val: string | number): T[];
  sortBy(key: string): T[];
  groupBy(prop: string): T[];
  firstObject: {
    get(): T;
    set(val: string | number): void;
  };
  lastObject: {
    get(): T;
    set(val: string | number): void;
  };
}

Array.prototype.mapBy = function (prop) {
  return this.map((a) => a[prop]);
};

Array.prototype.filterBy = function (key, val, b = true) {
  return this.filter((a) =>
    b
      ? String(a[key])?.includes(String(val))
      : !String(a[key])?.includes(String(val))
  );
};

Array.prototype.rejectBy = function (key, val, b = true) {
  return this.filter((a) =>
    b
      ? !String(a[key])?.includes(String(val))
      : String(a[key])?.includes(String(val))
  );
};

Array.prototype.findBy = function (key, val) {
  return this.filter((a) => a[key] === val);
};

Array.prototype.sortBy = function (key) {
  const [k = "", o = "asc"] = key?.split(":");
  return this.sort((a, b) => {
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

Object.defineProperties(Array.prototype, {
  firstObject: {
    get() {
      return this[0];
    },
    set(val) {
      this[0] = val;
    },
  },
  lastObject: {
    get() {
      return this.at(-1);
    },
    set(val) {
      this[this.length - 1] = val;
    },
  },
});

const hongx = { id: 1, name: "Hong" };
const kimx = { id: 2, name: "Kim" };
const leex = { id: 3, name: "Lee" };
const users = [hongx, leex, kimx];

console.log(users.mapBy("id")); // [1, 3, 2];
console.log(users.mapBy("name")); // ['Hong', 'Lee', 'Kim']);
console.log(users.filterBy("id", 2)); // [kim]);
console.log(users.filterBy("name", "i", true)); // [kim]
console.log(users.rejectBy("id", 2)); // [hong, lee]
console.log(users.rejectBy("name", "i", true)); // [hong, lee]
console.log(users.findBy("name", "Kim")); //  kim;
console.log(users.sortBy("name:desc")); //  [lee, kim, hong];
console.log(users.sortBy("name")); // [hong, kim, lee]
// console.log(users.groupBy(({ dept }) => dept));

console.log("first/last=", users.firstObject.name, users.lastObject.name); // hong/lee
users.firstObject = kimx;
users.lastObject = hongx;
console.log("first/last=", users.firstObject.name, users.lastObject.name); // kim/hong
