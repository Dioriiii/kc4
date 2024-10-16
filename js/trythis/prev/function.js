import assert from "assert";

function ex1() {
  const dog = {
    name: "Maxx",
    showMyName() {
      console.log(`My name is ${this.name}.`);
    },
    whatsYourName() {
      setTimeout(() => this.showMyName(this), 1000);
    },
  };

  dog.whatsYourName();
}
// ex1();

// 함수를 한번만 실행하게 하는 once 함수를 작성하시오.

function ex2_1() {
  // function once(cb) {
  //   let cnt = 0;
  //   return (...args) => {
  //     cnt++;
  //     if (cnt <= 1) return cb(...args);
  //   };
  // }
  function once(cb) {
    let done = false;
    return (...args) => {
      if (done) return;
      done = true;
      return cb(...args);
    };
  }

  const fn = once((x, y) => `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!`);
  assert.strictEqual(
    fn(1, 6),
    "금일 운행금지 차량은 끝번호 1, 6입니다!",
    "wrong!!"
  );
  assert.strictEqual(fn(2, 7), undefined, "wrong!!");
  assert.strictEqual(fn(3, 8), undefined, "wrong!!");
}
ex2_1();

// * try this
// 매 n초 후 다시 한번 실행할 수 있도록 개선해보세요.
// (test 요령: 0.1초 한 번씩 - setInterval - 실행하게 해놓고, 1초 후에 초기화)
function onceAgain(f, rebirth = 1000) {
  let done = false;
  return (...args) => {
    if (done) {
      setTimeout(() => {
        done = false;
      }, rebirth);
      return;
    }
    done = true;
    return f(...args);
  };
}
(function ex2_2() {
  const fn = onceAgain(
    (x, y) => `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!`
  );
  assert.strictEqual(
    fn(2, 8),
    "금일 운행금지 차량은 끝번호 2, 8입니다!",
    "wrong!!"
  );
  assert.strictEqual(fn(1, 9), undefined, "wrong!!");
  assert.strictEqual(fn(3, 8), undefined, "wrong!!");
  setTimeout(() => {
    assert.strictEqual(
      fn(2, 8),
      "금일 운행금지 차량은 끝번호 2, 8입니다!",
      "wrong!!"
    );
  }, 1000);
  setTimeout(() => {
    assert.strictEqual(fn(2, 8), undefined, "wrong!!");
  }, 800);
})();

(function ex3() {
  const before = () => console.log("before....");
  const after = () => console.log("after...");

  const someFn = (name, greeting) => console.log(`${greeting}, ${name}`);
  const someFn2 = (id, nickname, email, level) =>
    console.log(`${id}/${nickname}/${email}/${level}`);

  const template = (cb) => {
    return (...args) => {
      before();
      cb(...args);
      after();
    };
  }; // 코드를 완성하세요.

  const temp = template(someFn); // before → someFn → after 실행
  const temp2 = template(someFn2); // before → someFn2 → after 실행

  temp("sico", "hello");
  temp2(1, "sico", "sico@gmail.com", 5);
})();

// getNextWeek 함수는 widx변수에 부수 효과(side effect)가 있다.
// 이를 부수 효과가 없도록 변경하시오.  (hint: closure, IIFE)

const weeks = "일월화수목금토";

const getNextWeek = (() => {
  let widx = -1;
  return () => {
    widx += 1;
    if (widx >= weeks.length) widx = 0;
    return `${weeks[widx]}요일`;
  };
})();

let cnt = 0;
const intl = setInterval(() => {
  console.log("call", cnt, getNextWeek());
  if ((cnt += 1) === 8) clearInterval(intl);
}, 1000);
