// class와 Array를 이용하여 Stack과 Queue를 구현하시오.
class Collection {
  #arr = [];
  constructor(...args) {
    this.#arr = [...args.flat(1)];
  }

  get _arr() {
    return this.#arr;
  }

  // 공통: clear(), print(), remove(), isEmtpy, peek, poll, length(size)
  get isEmpty() {
    return this.#arr.length === 0;
  }

  get length() {
    return this.#arr;
  }

  get isStack() {
    return this.constructor.name === "Stack";
  }

  get peek() {
    return this.#arr.at(this.isStack ? -1 : 0);
  }

  poll() {
    return this.remove();
  }
  clear() {
    this.#arr.length = 0;
  }
  print() {
    console.log(this.#arr);
  }
  remove() {
    this.#arr.pop();
  }

  toArray() {
    return [...this.#arr];
  }
}

// ex1) Stack
class Stack extends Collection {
  push(a) {
    return this._arr.push(a);
  }
  pop() {
    return this._arr.pop();
  }
}
const stack = new Stack([1, 2]); // or new Stack([1,2]); // ⇐⇒ (1,2)
stack.push(3); // 추가하기
stack.push(4); // 추가하기
console.log(stack.pop()); // 마지막에 추가된 하나 꺼내기
stack.poll();
console.log("🚀 ~ stack.poll():", stack.poll());

// ex2) Queue
class Queue extends Collection {
  enqueue(a) {
    return this._arr.unshift(a);
  }
  dequeue() {
    return this._arr.pop();
  }
}

const queue = new Queue();
const queue2 = new Queue();
queue.enqueue(3); // 추가하기
queue.enqueue(2); // 추가하기
queue.enqueue(1); // 추가하기
console.log(queue.dequeue()); // 추가한지 가장 오래된 - 먼저 들어간 - 하나 꺼내기
console.log(queue.dequeue()); // 추가한지 가장 오래된 - 먼저 들어간 - 하나 꺼내기

queue2.enqueue(10); // 추가하기
queue2.enqueue(8); // 추가하기
queue2.enqueue(5); // 추가하기
console.log(queue2.dequeue()); // 추가한지 가장 오래된 - 먼저 들어간 - 하나 꺼내기
console.log(queue2.dequeue()); // 추가한지 가장 오래된 - 먼저 들어간 - 하나 꺼내기

// 이전 장표에서 작성한 Stack과 Queue에 공통 기능을 확장하시오.(Collection)
// 공통: clear(), print(), remove(), isEmtpy, peek, poll, length(size)
// peek: 가장 (Stack:나중, Queue:먼저) 들어간 요소 반환 (요소 삭제 없음!)
// poll: 가장 (Stack:나중, Queue:먼저) 들어간 요소 반환 & 삭제 ⇐⇒ Stack.pop, Queue.dequeue
// remove: 가장 (Stack:나중, Queue:먼저) 들어간 요소 삭제(skip)
console.log(stack.peek, queue.peek); // 마지막(다음에 나올) 원소
queue.print(); // 출력해보기
const arr = queue.toArray().map((a) => console.log(a));
if (!stack.isEmpty) stack.clear();
if (queue.length) queue.clear();
queue.print();
stack.print();
