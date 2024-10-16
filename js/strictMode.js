// "use strict";
var gg = 1;
let bb = 2;

function f1(x, y) {
  var gg = 11;
  let bb = 22;
  console.log("f1>", gg, bb, zz, f2, f2.length);
  f2("* first");

  {
    const xx = 99;
    f2("* next-first");
    function f2(t) {
      console.log(t, "`nexted`", xx, zz);
    }
  }
  function f2(t, u) {
    console.log(t, "`inner`", xx, zz);
  }
  function f2(t, u, v) {
    console.log(t, "`inner2`", xx, zz);
  }
  var zz = 800;
  console.log("🚀 ~ f1 ~ zz:", zz);
  f2("* second");
}

function varFn() {
  var v = 1;
  {
    var v = 2,
      vv = 3;
    console.log(v, vv, xx);
  }
  console.log(v, vv);
}
letFn();
function letFn() {
  let l = 1;
  {
    let l = 2,
      ll = 3;
    console.log(l, ll);
  }
  console.log(l);
}

var xx = 9;
varFn();

// Proxy 연습
const obj = { b: 50 };
Object.defineProperty(obj, "a", {
  configurable: false,
  enumerable: false,
  value: 10,
  writable: true,
});

const p1 = new Proxy(obj, {
  get(target, prop) {
    return 20;
  },
});

console.log(p1.a);
console.log(p1.b);

const handler = {
  get(obj, prop) {
    return prop in obj ? obj[prop] : 37;
  },
};

const p2 = new Proxy({}, handler);
p2.a = 1;
p2.b = undefined;
p2.c = "carrot";

console.log(p2.a, p2.b);
console.log(p2);

console.log("c" in p2, p2.c);
console.log("k" in p2, p2.k);
