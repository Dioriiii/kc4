// 연습문제1
// 1. .toFixed() 활용
for (let i = 0.1; i <= 1; i += 0.1) {
  console.log(+i.toFixed(1));
}

// 2. *10 후 끝 자르고 나누기
for (let i = 0.1; i <= 1; i += 0.1) {
  console.log(Math.round(i * 10) / 10);
}

console.log("---------------------");
// 연습문제2
const num_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. .toFixed() 활용
for (let num of num_arr) {
  const sqrtDec = +Math.sqrt(num).toFixed(3);
  Number.isInteger(sqrtDec) ? "" : console.log(num, sqrtDec);
}

// 2. Math 함수 활용
for (let num of num_arr) {
  const sqrtDec = Math.round(Math.sqrt(num) * 1000) / 1000;
  if (sqrtDec % 1 !== 0) {
    console.log(num, sqrtDec);
  }
}

console.log("---------------------");
// 연습문제3

const today = new Date();
const day = today.getDay();
const WEEK_NAMES = "일월화수목금토";

// 1. switch 문 활용
function cond1(day) {
  switch (day) {
    case 1: {
      return "월";
    }
    case 2: {
      return "화";
    }
    case 3: {
      return "수";
    }
    case 4: {
      return "목";
    }
    case 5: {
      return "금";
    }
    case 6: {
      return "토";
    }
    case 0: {
      return "일";
    }
    default: {
      return "올바르지 않은 숫자";
    }
  }
}

function cond2(day) {
  let result;
  switch (day) {
    case 1: {
      result = "월";
      break;
    }
    case 2: {
      result = "화";
      break;
    }
    case 3: {
      result = "수";
      break;
    }
    case 4: {
      result = "목";
      break;
    }
    case 5: {
      result = "금";
      break;
    }
    case 6: {
      result = "토";
      break;
    }
    case 0: {
      result = "일";
      break;
    }
    default: {
      return "올바르지 않은 숫자";
    }
  }
  return result;
}

// 2. 문자열 배열 활용
function cond3(day) {
  return WEEK_NAMES[day];
}

console.log(cond1(day), cond2(day), cond3(day));

console.log("---------------------");
// 연습문제4

// 1. 두 숫자중 더 높은 자리수 찾기
//    => 숫자를 스트링으로 바꿔서 for 문 둘려서 찾기 / 찾은 후 위치 비교
// 2. 두 숫자를 더한다
// 3. 더 높은 자리수에서 반올림

function addPoints(a, b) {
  const strA = a.toString();
  const strB = b.toString();

  // 스트링으로 바꾼 숫자에서 소수점 위치 찾기
  function searchPoint(num) {
    for (let i = 0; i < num.length; i += 1) {
      if (num[i] === ".") {
        return num.length - 1 - i;
      }
    }
    return 0;
  }

  // 소수점 위치 비교해서 더 긴쪽을 반올림할 소수점 위치로 fix
  const decPoint =
    searchPoint(strA) > searchPoint(strB)
      ? searchPoint(strA)
      : searchPoint(strB);

  console.log(+(a + b).toFixed(decPoint));
  return +(a + b).toFixed(decPoint);
}
addPoints(0.21354, 0.1); // 0.31354
addPoints(0.14, 0.28); // 0.42
addPoints(0.34, 0.226); // 0.566
addPoints(10.34, 200.226); // 210.566
addPoints(0.143, -10.28); // -10.137
addPoints(0.143, -10); // -9.857
addPoints(-0.143, 10); // 9.857
addPoints(0.643, -10.28); // 9.857

// 바이너리를 활용하는 법도 고민해보쟈~
