import assert from "assert";
// Promise 로 refactoring 하기
// setTimeout(function () {
//   console.log("depth1", new Date());
//   setTimeout(function () {
//     console.log("depth2", new Date());
//     setTimeout(function () {
//       console.log("depth3", new Date());
//       throw new Error("Already 3-depth!!");
//     }, 3000);
//   }, 2000);
// }, 1000);
// console.log("START!", new Date());

const depthTimer = (depth) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`depth${depth}`, new Date());
      if (depth === 3) reject("Already 3-depth!!");
      resolve(++depth);
    }, depth * 0);
  });
};

const randTime = (val) =>
  new Promise((resolve, reject) => {
    const randNum = Math.round(1 + Math.random() * val);
    setTimeout(() => {
      if (randNum > 100) {
        reject("TimeOUT!!!!");
      }
      resolve(val);
    }, randNum);
  });
// randTime(100).then(console.log).catch(console.error);

// depthTimer(1).then(depthTimer).then(depthTimer).catch(console.error);

// 다음 코드에서 promiseAll 함수를 직접 작성하시오.
function promiseAll(iter) {
  const result = [];
  let cnt = 0;
  return new Promise((resolve, reject) => {
    iter.forEach((promi, idx) => {
      if (!(promi instanceof Promise)) {
        reject("Promise가 아닙니다!");
      }
      promi
        .then((ret) => {
          result[idx] = ret;
          cnt++;
          if (cnt === iter.length) {
            resolve(result);
          }
        })
        .catch(reject);
    });
  });
}

promiseAll([randTime(90), randTime(20), randTime(33)])
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

// promisAllSettled 함수 만들기
// function promiseAllSettled(iter) {
//   const result = [];
//   return new Promise((resolve, reject) => {
//     iter.forEach((promi, idx) => {
//       if (!(promi instanceof Promise)) reject("Promise 만 입력해주세요!!");
//       promi.then(
//         (ret) => {
//           result[idx] = { status: "fulfilled", value: ret };
//           if (idx === iter.length - 1) resolve(result);
//         },
//         (err) => {
//           result[idx] = { status: "rejected", reason: err };
//           if (idx === iter.length - 1) reject(result);
//         }
//       );
//     });
//   });
// }
function promiseAllSettled(iter) {
  const result = iter.map((a) => ({
    status: undefined,
    value: undefined,
    ret: undefined,
  }));
  return new Promise((resolve, reject) => {
    const isDone = (arr) => arr.every((a) => a.status); // 모든 상태가 완료됐는지 확인

    iter.forEach((promi, idx) => {
      if (!(promi instanceof Promise)) reject("Promise 만 입력해주세요!!");
      promi
        .then((ret) => {
          result[idx] = { status: "fulfilled", value: ret };
          if (isDone(result)) resolve(result);
        })
        .catch((err) => {
          result[idx] = { status: "rejected", reason: err };
          if (isDone(result)) resolve(result);
        });
    });
  });
}

promiseAllSettled([randTime(11), Promise.reject("RRR"), randTime(33)])
  .then((array) => {
    console.table(array);
    // console.log(JSON.stringify(array, null, ' '));
    console.log("여긴 과연 호출될까?!");
    assert.deepStrictEqual(array, allSettledResults);
  })
  .catch((error) => {
    console.log("reject!!!!!!>>", error);
  });

const allSettledResults = [
  {
    status: "fulfilled",
    value: 11,
  },
  {
    status: "rejected",
    reason: "RRR",
  },
  {
    status: "fulfilled",
    value: 33,
  },
];

// async/await 으로 refactoring하기
async function promiseAll_async(iter) {
  const result = [];
  let cnt = 0;
  await iter.forEach((promi) => promi.catch((e) => Promise.reject(e)));

  iter.forEach(async (promi, idx) => {
    try {
      const ret = promi;
      result[idx] = await ret;
      cnt++;
      if (cnt === iter.length - 1) console.log(result);
    } catch (e) {
      Promise.reject(e);
    }
  });
}
const vals = [1, 2, 3];

promiseAll_async([randTime(1), randTime(2), randTime(3)])
  .then((arr) => {
    console.table(arr);
    // assert.deepStrictEqual(arr, vals);
  })
  .catch(console.error);
promiseAll_async([randTime(11), Promise.reject("RRR"), randTime(33)])
  .then((array) => {
    console.log("???여긴 과연 호출될까?!");
  })
  .catch((error) => {
    console.log("???reject!!!!!!>>", error);
  });
