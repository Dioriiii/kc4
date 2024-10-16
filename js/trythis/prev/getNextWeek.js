// const weeks = ["일", "월", "화", "수", "목", "금", "토"];
const weeks = "일월화수목금토";

const getNextWeek = () => {
  let widx = -1;
  return function () {
    widx += 1;
    if (widx >= weeks.length) widx = 0;
    return `${weeks[widx]}요일`;
  };
};

let cnt = 0;

const btnKor = document.getElementById("chooseKorean");
const btnMath = document.getElementById("chooseMath");
const btnKorTxt = getNextWeek();
const btnMathTxt = getNextWeek();
btnKor.addEventListener("click", function () {
  this.nextElementSibling.innerText = btnKorTxt();
});
btnMath.addEventListener("click", function () {
  this.nextElementSibling.innerText = btnMathTxt();
});
