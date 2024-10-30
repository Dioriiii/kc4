import readline from "readline";

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// let input;

// console.log("달력을 출력하고 싶은 날짜를 입력하세요");
// rl.on("line", (line) => {
//   input = new Date(line);
//   rl.close();
// });

// rl.on("close", () => {
//   const year = input.getFullYear();
//   const month = input.getMonth();
//   const startDay = new Date(year, month, 1).getDay();
//   const lastDate = new Date(year, month, 0).getDate();
//   const calArr = [];
//   for (let i = 0; i <= lastDate; i++) {
//     if (i === 0) {
//       for (let i = 1; i <= startDay; i++) {
//         calArr.push("   ");
//       }
//       continue;
//     }
//     calArr.push(String(i).padStart(3, " "));
//   }
//   for (let i = 6; i <= lastDate; i += 7) {
//     calArr[i] = calArr[i] + "\n";
//   }
//   const calContents = calArr.join("");

//   console.log(
//     `\t${+month + 1}월 ${year}\t\n 일 월 화 수 목 금 토\n${calContents}`
//   );
//   process.exit();
// });

// 특정 날짜를 받으면 해당 월의 달력을 출력하시오.

const dt = new Date();
// console.log(dt.toISOString());
const [, , month = dt.getMonth() + 1, year = dt.getFullYear()] = process.argv;

dt.setMonth(month);
dt.setFullYear(year);
dt.setDate(1);
const firstWeekDay = dt.getDay();
dt.setDate(0);
const lastDate = dt.getDate();

let s = `\t${dt.getMonth() + 1}월 ${dt.getFullYear()}년\n\n`;

s += [..." 일월화수목금토\n"].map((w) => w).join(" ");
s += "   ".repeat(firstWeekDay);

for (let i = 1; i <= lastDate; i++) {
  s += i.toString().padStart(3);
  if ((i + firstWeekDay) % 7 === 0) s += "\n";
}
console.log(s);
