// debounce와 throttle 함수를 TypeScript로 작성하시오.
// 방법1) …args를 Generic으로!
function debounce1<T extends unknown[]>(
  cb: (...args: T) => void,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: T) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(cb, delay, ...args);
  };
}

// 방법2) cb 을 Generic으로!
function debounce2<T extends (...args: Parameters<T>) => void>(
  cb: T,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(cb, delay, ...args);
  };
}
// 방법 3
function debounce3<T extends (...args: any[]) => void>(cb: T, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(cb, delay, ...args);
  };
}

// 방법1) …args를 Generic으로!
function throttle1<T extends unknown[]>(
  cb: (...args: T) => void,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return function (...args: T) {
    if (timer) return;
    timer = setTimeout(() => {
      cb(...args);
      timer = undefined;
    }, delay);
  };
}
// 방법2) cb 을 Generic으로!
function throttle2<T extends (...args: Parameters<T>) => void>(
  cb: T,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return function (...args: Parameters<T>) {
    if (timer) return;
    timer = setTimeout(() => {
      cb(...args);
      timer = undefined;
    }, delay);
  };
}

// test
const debo1 = debounce1((a: number, b: string) => console.log(a + 1, b), 1000);
const debo2 = debounce2((a: number, b: string) => console.log(a + 1, b), 1000);
const debo3 = debounce3((a: number, b: string) => console.log(a + 1, b), 1000);
for (let i = 10; i < 15; i++) debo1(i, "abc"); // 15, 'abc'
for (let i = 10; i < 15; i++) debo2(i, "abc"); // 15, 'abc'
for (let i = 10; i < 15; i++) debo3(i, "abc"); // 15, 'abc'

const thro1 = throttle1((a: number) => console.log(a + 1), 1000);
const thro2 = throttle2((a: number) => console.log(a + 1), 1000);
for (let i = 10; i < 15; i++) thro1(i); // 11
for (let i = 10; i < 15; i++) thro2(i); // 11

export function time1() {
  return [1, 2, 3];
}

export function time(cb: () => void) {
  setTimeout(() => {
    console.log("time!!!");
    cb();
  }, 1000);
}

export function time2(flag: number) {
  if (flag % 2 === 0) throw new Error("Time Error!!!");
  return flag + 1;
}

export function time3(flag: number) {
  const addr = flag > 1 ? undefined : { city: "Seoul" };
  return { id: 3, name: "Hong", addr };
}

export const timePromi = (n: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (n % 2 === 0) resolve(n + 1);
      reject(`OddNumber: ${n}`);
    }, 1000);
  });
