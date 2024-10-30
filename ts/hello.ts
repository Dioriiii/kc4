let i: number = 1;
console.log("🚀 ~ i:", i);

let john: {
  firstName: string;
  lastName: string;
  age: number;
  tel?: number;
} = {
  firstName: "Kang",
  lastName: "Han",
  age: 20,
};
// console.log("🚀 ~ lastName:", lastName);

let m = { name: "Hong", addr: "Seoul" };

console.log("🚀 ~ m:", john.tel);

let lastName: string;

type Member = {
  id: string;
  name: string;
  addr: string;
  discountRate: number;
};
type Guest = {
  id: string;
  name: string;
  age: number;
};

type Customer = Member | Guest;
let customer: Customer;
let mem: Member;
let g: Guest;
customer = {
  id: "111",
  name: "홍길동",
  addr: "용산구",
  discountRate: 0.1,
};
console.log("🚀 ~ customer:", customer);

customer = {
  id: "111",
  name: "홍길동",
  age: 26,
};
console.log("🚀 ~ customer:", customer);

customer = {
  id: "111",
  name: "홍길동",
  age: 26,
  discountRate: 2,
};
console.log("🚀 ~ customer:", customer);

customer = {
  id: "111",
  name: "홍길동",
  addr: "용산구",
  discountRate: 0.1,
  age: 26,
};
console.log("🚀 ~ customer:", customer);

customer = {
  id: "111",
  name: "홍길동",
  addr: "용산구",
  age: 22,
};
console.log("🚀 ~ customer:", customer);

const xx = {
  id: 123,
  discountRate: 123,
  name: "홍길동",
  addr: "용산구",
  age: 26,
};

if ("age" in xx) m = xx;
else if ("discountRate" in xx && "addr" in xx) {
  console.log("ddd");
  mem = xx;
  console.log("🚀 ~ mem:", mem);
}
// console.log("🚀 ~ mem:", mem);
// console.log("🚀 ~ g:", g);

function f(cb: (input: number | string) => number) {
  return cb(1);
}
function f2(input: number | string | boolean) {
  return 1;
}
function f3(input: number | string) {
  return 1;
}
function f4(input: string) {
  return 1;
}
const fn2 = f(f2);
console.log(fn2);
const fn3 = f(f3);
console.log("🚀 ~ fn3:", fn3);
// const fn4 = f(f4);

type Emp = { id: number; name: string };
const lee: Emp = { id: 1, name: "Lee" };
const hong = { id: 2, name: "Hong", addr: "Seoul" };

const arr0: Emp[] = [{ id: 1, name: "Hong" }];
const arr1: Emp[] = [{ id: 3, name: "Kim" }, lee];
const arr2: Emp[] = [{ id: 3, name: "Kim", addr: "Pusan" }, hong];
// const arr3: Emp[] = [{id: 3, name:"Kim", addr:"Pusan"}, lee]

const singSongRecursive = (songs: string[], count = 0): number =>
  songs.length ? singSongRecursive(songs.slice(1), count + 1) : count;

const lim = ["Lim", 26];
let limTup: [string, number];

const greeting = (greet: "Hi" | "Hello", name: string, age: number) => {
  console.log(`${greet}~!    
                  ${name}(${age})`);
};

const tup: ["Hi" | "Hello", string, number] = ["Hi", "Lim", 26];
const arr = ["Park", 30];

greeting(...tup); // OK
// greeting('Hi', ...arr); // Error

function fn(a: number) {
  return a;
}

function f1() {}
