import readline from "readline";
import assert from "assert";
import { input as stdin, output as stdout } from "process";

// function* add() {
//   const x = yield "첫번째 수? => ";
//   const y = yield "두번째 수? => ";
//   return x + y;
// }

// const itAdd = add();
// console.log(itAdd.next().value);

// const rl = readline.createInterface({ input, output });
// rl.on("line", (answer) => {
//   const num = Number(answer);
//   if (isNaN(num)) {
//     console.error("숫자를 입력하세요!");
//     return;
//     1;
//   }
//   const { value, done } = itAdd.next(num);

//   if (done) {
//     console.log("Total: ", value);
//     // r1.close();
//   } else {
//     console.log(value);
//   }
// }).on("close", () => {
//   process.exit();
// });

// 이전 챕터에서 작성한 Stack과 Queue 클래스를 iterator로 작성하시오.
// (iterable한 클래스로 작성하세요)   iterator or generator 모두 사용 가능!
class Collection {
  #arr = [];

  *[Symbol.iterator]() {
    const arr = this.#arr;
    for (let i = 0; i < arr.length; i++) {
      yield arr[i];
    }
  }

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
  *iterator() {
    for (let i = 0; i < this._arr.length; i++) {
      yield this._arr[i];
    }
  }
  enqueue(arg) {
    return this._arr.unshift(arg);
  }
  dequeue() {
    return this._arr.pop();
  }
}

// console.log([...stack], [...queue]);
// for (const s of stack) console.log(s);
// for (const q of queue) console.log(q);
// const itStack = stack[Symbol.iterator](); // 또는 const itStack = stack.iterator();
// console.log(itStack.next());
// console.log(itStack.next());
// // ...
// const itQueue = queue.iterator();
// console.log(itQueue.next());

const LINE2 = [
  "신도림",
  "성수",
  "신설동",
  "용두",
  "신답",
  "용답",
  "시청",
  "충정로",
  "아현",
  "이대",
  "신촌",
  "공항철도",
  "홍대입구",
  "합정",
  "당산",
  "영등포구청",
  "문래",
  "대림",
  "구로디지털단지",
  "신대방",
  "신림",
  "봉천",
  "서울대입구",
  "낙성대",
  "사당",
  "방배",
  "서초",
  "교대",
  "강남",
  "역삼",
  "선릉",
  "삼성",
  "종합운동장",
  "신천",
  "잠실",
  "잠실나루",
  "강변",
  "구의",
  "건대입구",
  "뚝섬",
  "한양대",
  "왕십리",
  "상왕십리",
  "신당",
  "동대문역사문화공원",
  "을지로4가",
  "을지로3가",
  "을지로입구",
];

class Subway {
  #startIdx;
  #endIdx;
  #currIdx;
  #didEnd;

  constructor(start, end) {
    this.#startIdx = LINE2.indexOf(start);
    this.#endIdx = LINE2.indexOf(end);
    this.#currIdx = this.#startIdx;
  }

  *[Symbol.iterator]() {
    while (true) {
      if (this.#didEnd) {
        this.#currIdx = this.#startIdx;
        this.#didEnd = false;
        break;
      }

      this.#didEnd = this.#currIdx === this.#endIdx;

      yield LINE2[this.#currIdx++];
      if (this.#currIdx === LINE2.length) this.#currIdx = 0;
    }
  }

  toString() {
    return `현재 역은 ${LINE2[this.#currIdx - 1]}역 입니다`;
  }
}
const routes = new Subway("문래", "신림");
console.log([...routes]);
assert.deepStrictEqual(
  [...routes],
  ["문래", "대림", "구로디지털단지", "신대방", "신림"]
);

const it1 = routes[Symbol.iterator]();
["문래", "대림", "구로디지털단지", "신대방", "신림"].forEach((value, i) => {
  assert.deepStrictEqual(it1.next(), { value, done: false });
  console.log(i, routes.toString());
});
// console.log(it1.next());
assert.deepStrictEqual(it1.next(), { value: undefined, done: true });

const route3 = new Subway("문래", "합정"); // 46개 정거장이면 통과!
assert.strictEqual([...route3].length, 46);
const route4 = new Subway("신도림", "을지로입구"); // 48개 정거장이면 통과!
assert.strictEqual([...route4].length, 48);

const routes2 = new Subway("구로디지털단지", "성수"); // 32개 정거장
console.log([...routes2]); // ['구로디지털단지', '신대방', ..., '성수']
const it2 = routes2[Symbol.iterator]();
while (true) {
  const x = it2.next();
  console.log(x);
  if (x.done) break;
}
