function range(start, end) {
  // ..TODO..
  function innerRange(st, en) {
    let arr = [];
    for (i = st; i <= en; i += 1) {
      arr = [...arr, i];
    }
    return console.log(arr);
  }

  if (end) {
    innerRange(start, end);
  }

  return (n) => {
    innerRange(start, n);
  };
}

// 순수재귀
function range2(start, end) {
  // ..TODO..
  if (end) {
    let arr = [];
    for (i = st; i <= en; i += 1) {
      arr = [...arr, i];
    }
    return console.log(arr);
  }

  return (n) => {
    range(start, n);
  };
}

range(3, 3); // [3]
range(3, 8); // [3,4,5,6,7,8]
range(3, 0); // []

var start3 = range(3);
var start4 = range2(4);
var start5 = range2(5);

start3(3); // [3]
start3(8); // [3,4,5,6,7,8]
start3(0); // []

start4(6); // [4,5,6]
start5(9); // [4,5,6]

console.log("-----------------------------");

function callWith(n) {
  return (fn) => {
    return fn(n);
  };
}

const fun = callWith(10);

let b = fun((num) => {
  return num + 5;
}); // b is 15

b = fun((num) => {
  return num + "hello";
}); // b is "10hello"

b = fun((num) => {
  return 500 % num;
}); // b is 0

function runIt(fn) {
  return fn;
}

const subtract = runIt((a, b) => {
  return a - b;
});
let bb = subtract(3, 20); // bb is -17
console.log(bb);
bb = subtract(11, 2); // bb is 9
