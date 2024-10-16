// 1970년 1월 1일과 1970년 1월 2일의 차이를 초로 나타내시오.
const date1 = new Date("1970-01-01");
const date2 = new Date("1970-01-02");
const diffSec = Math.abs(date1 - date2) / 1000;
console.log(diffSec);

// 이 달의 날짜 5개를 무작위로 만들어 역순으로 정렬하시오.
const today = new Date();
const thisYear = today.getFullYear();
const thisMonth = today.getMonth();
const lastDate = new Date(thisYear, thisMonth, 0).getDate();

const dateArr = [];
for (let i = 0; i < 5; i++) {
  const date = Math.floor(1 + Math.random() * lastDate);
  dateArr.push(new Date(thisYear, thisMonth, date));
}
console.log(dateArr.sort((a, b) => (a < b ? 1 : -1)));

// 내년(2025년)의 오늘의 요일을 출력하시오. => getDay();
const nextYearToday = new Date(new Date().setFullYear(thisYear + 1)).getDay();
const weeks = "일월화수목금토일";
console.log(`${weeks[nextYearToday]}요일`);

// 오늘(10월 7일)로 부터 100일 후의 날짜는?
console.log(new Date(new Date().setDate(today.getDate() + 100)));
