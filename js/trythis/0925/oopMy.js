import assert from "assert";

// Emp type의 hong 객체에 fullName 기능을 Accessor Property를 사용하지 말고, proxy 생성자 함수를 이용하여 구현하시오.

class Emp {
  firstName;
  lastName;
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        if (prop === "fullName")
          return `${target.firstName} ${target?.lastName.toUpperCase()}`;
        return target[prop];
      },
      set(target, prop, value) {
        if (prop === "fullName") {
          const [f, l] = value.split(" ");
          target.firstName = l ? f : target?.firstName;
          target.lastName = (l ? l : f).toUpperCase();
        } else {
          target.prop = value;
        }
      },
    });
  }
}

const hong1 = new Emp();
hong1.fullName = "Kildong Hong";
assert.strictEqual(hong1.fullName, "Kildong HONG");
hong1.fullName = "Lee";
assert.strictEqual(hong1.fullName, "Kildong LEE");

// 모든 Array가 다음 기능을 갖도록 구현하세요.
// 1) mapBy(), findBy(), filterBy(), rejectBy(), sortBy()
// 2) firstObject, lastObject

const arr = [1, 2, 3, 4, 5];
const hong = { id: 1, name: "Hing" };
const kim = { id: 2, name: "Kim" };
const lee = { id: 3, name: "Lee" };
const users = [hong, lee, kim];

Array.prototype.mapBy = function (key) {
  return this.map((a) => a[key]);
};

Array.prototype.filterBy = function (key, val, isInclude = false) {
  return isInclude
    ? this.filter((a) => a[key].includes(val))
    : this.filter((a) => a[key] === val);
};

Array.prototype.rejectBy = function (key, val, isInclude = false) {
  return isInclude
    ? this.filter((a) => !a[key].includes(val))
    : this.filter((a) => a[key] !== val);
};

Array.prototype.findBy = function (key, val) {
  for (item of this) {
    if (item[key] === val) return item;
  }
  return;
};

Array.prototype.sortBy = function (con) {
  const [key, direction = "asc"] = con.split(":");
  const dir = direction === "asc" ? 1 : -1;
  return this.sort((a, b) => (a[key] > b[key] ? dir : -dir));
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
assert.deepStrictEqual(users.firstObject, hong);
assert.deepStrictEqual(users.lastObject, lee);
users.firstObject = kim;
assert.deepStrictEqual(users.firstObject, kim);
users.lastObject = hong;
assert.deepStrictEqual(users.lastObject, hong);

// class와 Array를 이용하여 Stack과 Queue를 구현하시오.
// 이전 장표에서 작성한 Stack과 Queue에 공통 기능을 확장하시오.(Collection)
// 공통: clear(), print(), remove(), isEmtpy, peek, poll, length(size)
// peek: 가장 (Stack:나중, Queue:먼저) 들어간 요소 반환 (요소 삭제 없음!)
// poll: 가장 (Stack:나중, Queue:먼저) 들어간 요소 반환 & 삭제 ⇐⇒ Stack.pop, Queue.dequeue
// remove: 가장 (Stack:나중, Queue:먼저) 들어간 요소 삭제(나올 요소 삭제하여 처리 skip)
class Collection {
  #arr = [];
  constructor(...args) {
    this.#arr = [...args.flat()];
  }

  get isEmpty() {
    return this.#arr.length === 0;
  }

  get _arr() {
    return this.#arr;
  }

  get peek() {
    return this.#arr.at(-1);
  }

  get size() {
    return this.#arr.length;
  }

  clear() {
    this.#arr.length = 0;
  }

  print() {
    console.log(`${this.constructor.name}(${this.size}) ${this.toString()}`);
  }

  poll() {
    return this.#arr.pop();
  }

  remove() {
    this.#arr.pop();
  }

  toString() {
    return JSON.stringify(this.#arr);
  }
}

class Stack extends Collection {
  push(arg) {
    return this._arr.push(arg);
  }
  pop() {
    return this._arr.pop();
  }
}

class Queue extends Collection {
  enqueue(arg) {
    return this._arr.unshift(arg);
  }
  dequeue() {
    return this._arr.pop();
  }
}

// ex1) Stack
const stack = new Stack(); // or new Stack(1,2); // ⇐⇒ (1,2)
stack.push(3); // 추가하기
stack.push(4); // 추가하기
console.log(stack.pop()); // 마지막에 추가된 하나 꺼내기
// ex2) Queue
const queue = new Queue();
queue.enqueue(3); // 추가하기
queue.enqueue(2); // 추가하기
console.log(queue.dequeue()); // 추가한지 가장 오래된 - 먼저 들어간 - 하나 꺼내기
console.log(queue.toString());

console.log(stack.peek, queue.peek); // 마지막(다음에 나올) 원소
queue.print(); // 출력해보기
// const arr = queue.toArray().map(a => console.log(a));
if (!stack.isEmpty) stack.clear();
if (queue.length) queue.clear();
