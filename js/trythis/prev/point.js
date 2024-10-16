function ex1() {
  for (let i = 0.1; i < 1; i = i + 0.1) {
    console.log(+i.toFixed(1));
  }
}

function ex2() {
  for (let i = 1; i <= 10; i += 1) {
    const sqrt = Math.sqrt(i);
    if (sqrt % 1 !== 0) {
      console.log(i, +(sqrt % 1).toFixed(3));
    }
  }
}
ex2();

const WEEK_NAMES = "월화수목금토일";
for (const w of WEEK_NAMES) {
  if (w === "수") {
    console.log(w);
    break;
  }
}

function addPoints(a, b) {
  const alen = a.toString().length - Math.trunc(a).toString().length - 1;
  const blen = b.toString().length - Math.trunc(b).toString().length - 1;

  // console.log("alen blen", alen, blen);

  const result = +(a + b).toFixed(alen > blen ? alen : blen);

  console.log("result: ", result);
}

addPoints(0.21354, 0.1); // 0.31354
addPoints(0.14, 0.28); // 0.42
addPoints(0.34, 0.226); // 0.566
addPoints(10.34, 200.226); // 210.566
addPoints(0.143, -10.28); // -10.137
addPoints(0.143, -10);
