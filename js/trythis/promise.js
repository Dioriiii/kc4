// 테스트를 위한 임의의 시간(1초 미만)에 resolve를 실행하는 randTime 함수를 작성하시오.
const randTime = (val) =>
  new Promise((resolve, reject) => {
    const ranVal = Math.floor(1 + Math.random() * val);
    setTimeout(() => {
      resolve(ranVal);
      if (ranVal > 1000) return rejected(new Error("timeOut!!!"));
    }, ranVal);
  });

randTime(100).then(console.log);

// [1, 2, 3, 4, 5].forEach(a => randTime(a).then(console.log));

// 다음 코드를 Promise를 이용하여 refactoring 하시오.
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

const depthTimer = (depth) =>
  new Promise((resolve, rejected) => {
    setTimeout(() => {
      console.log(`depth${depth}`, new Date());
      if (depth === 3) rejected(new Error("Already 3-depth!!"));
      resolve(depth + 1);
    }, depth * 1000);
  });

console.log("START!", new Date());

depthTimer(1).then(depthTimer).then(depthTimer).catch(console.error);
