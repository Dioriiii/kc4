import assert from "assert";
// 다음 코드에서 promiseAll 함수를 직접 작성하시오.
// const randTime = …
// promiseAll return type => promise
// if one of arg has reject error all resolve -> val
const randTime = (val) =>
  new Promise((resolve, reject) => {
    const ranVal = Math.floor(1 + Math.random() * val);
    setTimeout(() => {
      resolve(ranVal);
      if (ranVal > 1000) return reject(new Error("timeOut!!!"));
    }, ranVal);
  });

// randTime(100).then(console.log);
function promiseAll(iter) {
  const result = [];
  return new Promise((resolve, reject) => {
    iter.forEach((promi, idx) => {
      if (!(promi instanceof Promise)) {
        reject("Promise가 아닙니다!");
      }
      promi.then((ret) => {
        result[idx] = ret;
        if (idx === iter.length - 1) {
          resolve(result);
        }
      }, reject);
    });
  });
}

promiseAll([randTime(1), randTime(2), randTime(3)])
  .then((arr) => {
    console.table(arr);
    // assert.deepStrictEqual(arr, vals);
  })
  .catch(console.error);

// promiseAll([randTime(11), Promise.reject("RRR"), randTime(33)])
//   .then((array) => {
//     console.log("여긴 과연 호출될까?!");
//   })
//   .catch((error) => {
//     console.log("reject!!!!!!>>", error);
//   });
