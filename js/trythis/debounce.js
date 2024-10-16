// 1. 지난 번 subject.html에서,
// 국어 수업은 debounce로 클릭하고,
// 수학 수업은 throttle로 클릭하도록 구현하시오.
// (각 0.5초 딜레이)
// 2. 지난 번 subject.html에서, 검색어 입력 상자를 만들고,
// 입력에 0.5초 debounce 걸기 - 검색(출력).

const weeks = "일월화수목금토";

const getNextWeek = () => {
  let widx = -1;
  return function () {
    widx += 1;
    if (widx >= weeks.length) widx = 0;
    return `${weeks[widx]}요일`;
  };
};

const debounce = (cb, delay) => {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(cb, delay, ...args);
  };
};

const throttle = (cb, delay) => {
  let timer;
  return (...args) => {
    if (timer) return;
    timer = setTimeout(() => {
      cb(...args);
      timer = null;
    }, delay);
  };
};

const btnKor = document.getElementById("chooseKorean");
const btnMath = document.getElementById("chooseMath");
const inputBox = document.querySelector("#inputBox");

const btnKorTxt = getNextWeek();
const btnMathTxt = getNextWeek();

btnKor.onclick = debounce(
  () => (btnKor.nextElementSibling.innerText = btnKorTxt()),
  500
);

btnMath.onclick = throttle(
  () => (btnMath.nextElementSibling.innerText = btnMathTxt()),
  500
);

inputBox.oninput = debounce(() => console.log("search>>", inputBox.value), 500);
