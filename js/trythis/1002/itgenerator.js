import assert from "assert";
// Collection 클래스를 상속받아 List 메소드들과 클래스 메소드 arrayToList, listToArray를 보유한 ArrayList 클래스를 구현하시오. (assert로 Test코드 작성)
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

  set _arr(arr) {
    this.#arr = arr;
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

class ArrayList extends Collection {
  static arrayToList(rest) {
    const [val, ...re] = rest;
    if (rest.length === 0) return {};
    return rest.length === 1
      ? { value: val }
      : { value: val, rest: ArrayList.arrayToList(re) };
  }
  static listToArray(list) {
    const arr = [];
    let node = list;
    while (true) {
      arr.push(node.value);
      node = node.rest;
      if (!node) break;
    }
    return arr;
  }
  constructor(...args) {
    super(...args);
  }
  get #list() {
    return ArrayList.arrayToList(this._arr);
  }

  toString() {
    return JSON.stringify(this.#list);
  }

  add(val, index) {
    if (!index) {
      return this._arr.push(val);
    }
    return this._arr.splice(index, 0, val);
  }

  get(index) {
    return this._arr[index];
  }

  remove(value) {
    const idx = this._arr.indexOf(value);
    if (idx !== -1) {
      this._arr.splice(idx, 1);
      return true;
    }
    return false;
  }

  removeByIndex(index) {
    return this._arr.splice(index, 1);
  }

  set(index, value) {
    this._arr[index] = value;
  }
  contains(value) {
    return this._arr.includes(value);
  }
  indexOf(value) {
    return this._arr.indexOf(value);
  }
  toArray() {
    return this._arr;
  }
  *[Symbol.iterator]() {
    for (let i = 0; i < this._arr.length; i++) {
      yield this._arr[i];
    }
  }
}

const alist1 = new ArrayList([1, 2]); // alist.toString() ⇒ { value: 1, rest: { value: 2 } }
alist1.add(3);
alist1.add(4);
alist1.add(5, 1);
alist1.add(7, 1);
console.log(alist1.toString());

ArrayList.listToArray({ value: 1, rest: { value: 2 } }); // ⇒ [1,2]
ArrayList.arrayToList([1, 2]); // ⇒ { value: 1, rest: { value: 2 } }

// test
const alist = new ArrayList([1, 2, 3]);

// arrayToList
const test1 = ArrayList.arrayToList([1, 2, 3]);
assert.deepStrictEqual(test1, {
  value: 1,
  rest: { value: 2, rest: { value: 3 } },
});

// listToArray
const test2 = ArrayList.listToArray({
  value: 1,
  rest: { value: 2, rest: { value: 3 } },
});
assert.deepStrictEqual(test2, [1, 2, 3]);

// size
assert.strictEqual(alist.size, 3);

// add
alist.add(4);
assert.strictEqual(alist.size, 4);
assert.strictEqual(alist.get(3), 4);

alist.add(5, 2);
assert.strictEqual(alist.get(2), 5);

// remove
assert.strictEqual(alist.remove(5), true);
assert.strictEqual(alist.contains(5), false);

// set
alist.set(1, 10);
assert.strictEqual(alist.get(1), 10);

// indexOf
assert.strictEqual(alist.indexOf(10), 1);
assert.strictEqual(alist.indexOf(1000), -1); // 없을시 false가 아니라 -1

// clear
alist.clear();
assert.strictEqual(alist.size, 0);

// toArray
alist.add(1);
alist.add(2);
alist.add(3);
assert.deepStrictEqual(alist.toArray(), [1, 2, 3]);

// iterator
const iteratorTest = [...alist];
assert.deepStrictEqual(iteratorTest, [1, 2, 3]);
