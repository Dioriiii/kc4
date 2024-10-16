// 두 개의 수를 입력 받아 더하기를 수행하는 제너레이터를 작성하시오.
function* add() {
  const x = yield "첫 번째 수 ? ->"; // yield가 있으므로 caller에게 제어권 넘김. yield뒤는 그냥 메시지!
  const y = yield "두 번째 수 ? ->";
  return `Total: ${x + y}`;
}

const itAdd = add();
console.log(itAdd.next().value);
console.log(itAdd.next(1).value);
console.log(itAdd.next(2).value);

// (실행 결과: 1과 2를 넣었을 때)
// 첫 번째 수?  → 1   next(1)
// 두 번째 수?  → 2
// Total: 3

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
console.log("-----------------------------");
const stack = new Stack(); // or new Stack(1,2); // ⇐⇒ (1,2)
stack.push(3); // 추가하기
stack.push(4); // 추가하기
stack.push(5); // 추가하기
// ex2) Queue
const queue = new Queue();
queue.enqueue(3); // 추가하기
queue.enqueue(2); // 추가하기

console.log([...stack], [...queue]);
for (const s of stack) console.log(s);
for (const q of queue) console.log(q);
const itStack = stack[Symbol.iterator](); // 또는 const itStack = stack.iterator();
console.log(itStack.next());
console.log(itStack.next());
// ...
const itQueue = queue.iterator();
console.log(itQueue.next());
console.log(itQueue.next());

// 다음의 지하철 노선 중에서, 출발역 ~ 도착역까지만을 반환하는 클래스를 작성하시오. (단방향만!)
class Subway {
  constructor(s, e) {
    this.start = s;
    this.end = e;
  }

  *[Symbol.iterator]() {
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
    const startIdx = LINE2.indexOf(this.start);
    const endIdx = LINE2.indexOf(this.end);
    if (startIdx > endIdx) {
      for (let i = startIdx; i < LINE2.length; i++) {
        yield LINE2[i];
      }
      for (let i = 0; i <= endIdx; i++) {
        yield LINE2[i];
      }
    } else {
      for (let i = startIdx; i <= endIdx; i++) {
        yield LINE2[i];
      }
    }
  }
}
const routes = new Subway("문래", "신림");
const it1 = routes[Symbol.iterator]();
console.log([...routes]); // [ '문래', '대림', '구로디지털단지', '신대방', '신림' ]
console.log(it1.next()); // { value: '문래', done: false }
console.log(it1.next()); // { value: '대림', done: false }
console.log(it1.next()); // { value: '구로디지털단지', done: false }
console.log(it1.next()); // { value: '신대방', done: false }
console.log(it1.next()); // { value: '신림', done: false }
console.log(it1.next()); // { value: undefined, done: true }
console.log(it1.next()); // { valsue: undefined, done: true }

const routes2 = new Subway("구로디지털단지", "성수"); // 32개 정거장
console.log([...routes2]); // ['구로디지털단지', '신대방', ..., '성수']
const it2 = routes2[Symbol.iterator]();
while (true) {
  const x = it2.next();
  console.log(x);
  if (x.done) break;
}
const route3 = new Subway("문래", "합정"); // 46개 정거장이면 통과!
console.log([...route3].length);
const route4 = new Subway("신도림", "을지로입구"); // 48개 정거장이면 통과!
console.log([...route4].length);
