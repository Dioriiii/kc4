export const getNextWeek = () => {
  const weeks = "일월화수목금토";
  let widx = -1;
  return function () {
    widx += 1;
    if (widx >= weeks.length) widx = 0;
    return `${weeks[widx]}요일`;
  };
};

export const debounce = (cb, delay) => {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(cb, delay, ...args);
  };
};

export const throttle = (cb, delay) => {
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
