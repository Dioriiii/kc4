// type Size = {
//   id: "XS" | "S" | "M" | "L" | "XL";
//   price: number;
// };

// type Size = { id: keyof typeof sizeOption1; price: number };

// const SIZE: Size[] = [
const SIZE = [
  { id: "XS", price: 8000 },
  { id: "S", price: 10000 },
  { id: "M", price: 12000 },
  { id: "L", price: 14000 },
  { id: "XL", price: 15000 },
] as const;

const sizeOption1 = { XS: 1, S: 5, M: 2, L: 2, XL: 4 };
const totalPrice1 = SIZE.reduce(
  (currPrice, size) => currPrice + sizeOption1[size.id] * size.price,
  0
);

// const sizeOption2 = { XS: 1, S: 5, MN: 2, L: 2, XL: 4 };
// const totalPrice2 = SIZE.reduce(
//   (currPrice, size) => currPrice + sizeOption2[size.id] * size.price,
//   0
// );

type Reading = { page: number };
type Writing = { title: string };
type ReadWrite = Reading | Writing;
// type ReadWritePrcie = ReadWrite & {price: number}
type ReadWritePrcie = (Reading | Writing) & { price: number };
type Novel = Writing & { price: number };
class W implements Novel {
  title = "ttt";
  price = 2000;
}

const x1: ReadWrite = { page: 20 };
const x2: ReadWrite = { title: "pang" };
const x3: ReadWrite = { page: 100, title: "hundred" };

x1.page;
x2.title;
// x3.title

interface IReading {
  page: number;
}
interface IWriting {
  title: string;
}
interface IReadWrite extends IReading, IWriting {
  addr: string;
}
const writer = { title: "III", page: 8, addr: "Seoul", age: 2 };
const x: IReadWrite = writer;

interface Page {
  readonly text: string;
}
function read(page: Page) {
  console.log(page.text);

  // page.text = "Hello";
}

const pageIsh = {
  text: "Hello World!!",
};
pageIsh.text = "Hi!";

read(pageIsh);

type Counts = {
  [key: string]: number;
};
const counts: Counts = {};
counts.apple = 1;
counts.banana = 2;
counts.melon = 11;

console.log(counts);
counts["peach"];
// console.log("🚀 ~ counts['peach']:", counts["peach"] * 10);
interface Book {
  // 1.
  title: string;
  [key: string]: string | number | boolean;

  // 2.
  // title: string;
  // [key: string]: number | boolean;
}
interface IndexSignature {
  // 1.
  // [key: Book]: string;

  // 2.
  // [key: number] : string | number;
  // [key: string] : number;

  // 3.
  [key: number]: string;
  [key: string]: string | number;
}

const book: Book = {
  title: "BBOOKK",
  page: 200,
  price: 30000,
};

console.log(book);
console.log(typeof book);

interface MyNode {
  value: string | number;
  next: MyNode | null;
}

function push(currNode: MyNode, nextNode: MyNode) {
  currNode.next = nextNode;
}

const node: MyNode = {
  value: 1,
  next: null,
};
push(node, { value: 2, next: null });
console.log(node);

interface A {
  id: number;
  x: () => void;
}

interface B {
  id: string | number;
  name: string;
  x: () => string;
}

// OK?
interface C extends A, B {
  id: number;
  addr: string;
  x: () => string;
}

interface User {
  id: number;
  name: string;
}

interface Dept {
  id: number;
  dname: string;
  captain: string;
}

interface Ud2 {
  [key: string]: string | number;
  addr: string;
}

const ud2: Ud2 = { id: 1, name: "HH", addr: "Seoul" };
const ud3: Ud2 = { id: 1, dname: "HH", captain: "HH", addr: "Seoul" };

type T = (n: number) => void;

let t: T = (n: number) => "Hello";
let t2: T = (n: number) => {};
console.log(t(20), t2(3));

const ltr1: string = "ltr1";
const ltr2 = "ltr2" as const;
let someString: string;
someString = ltr1;
console.log("🚀 ~ someString:", someString);
someString = ltr2;
console.log("🚀 ~ someString:", someString);

interface AgeIsANumber {
  age: number;
  m(): void; // OK
}
interface AgeIsNotANumber {
  age: () => string;
  m(n: number): void;
}

// class NotAsNumber implements AgeIsANumber, AgeIsNotANumber{
//   // age = () => "bbbb";
//   m() { return ''; }
//   // Error : Property 'age' in type 'NotAsNumber' is not assignable to the same property in base type 'AgeIsANumber'.
//   // Type '() => string' is not assignable to type 'number'.
// }
