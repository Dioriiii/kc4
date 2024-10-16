//
import assert from "assert";

// 오른 쪽과 같은 형태로 출력하는 fmt 함수를 작성하시오.
const total = { price: 45000, vat: 4500 };
const fmt = (txts, amount) => {
  // console.log("txts", txts, "price", price);
  return txts[0] + amount.toLocaleString() + txts[1];
};
console.log(fmt`주문합계: ${total.price}원`);
console.log(fmt`세액합계: ${total.vat}원`);

// 문자열이 한글 자음으로 끝나는지 체크하는 함수를 작성하시오.
// 끝문자 -> 모음으로 끝나는 글자를 제외한 모든 한글 / 영어 -> lmnrLMNR / 숫자 -> 136780
const noBachimUni = () => {
  const start = 44032; // 가 ascii
  const end = 55203; // 힣 ascii
  const moeums = [];
  for (let i = start; i <= end; i += 28) {
    // 받침이 없는 글자
    moeums.push(i);
  }
  return moeums;
};
const moeums = noBachimUni();

const isEndJaum = (word) => {
  const exception = Array.from("LMNRlmnr136780").map((a) => a.charCodeAt());
  const lastStr = word.at(-1).charCodeAt();

  if (exception.includes(lastStr) || (lastStr >= 12593 && lastStr <= 12622)) {
    // 끝글자가 자음한글자 혹은 예외의 경우(숫자, 영어) true
    return true;
  }

  if (lastStr >= 44032 && lastStr <= 55203) {
    // 가-힣 글자 중 받침이 없는 글자는 false
    return !moeums.some((a) => a === lastStr);
  }

  return false;
};

assert.equal(isEndJaum("아지오"), false);
assert.equal(isEndJaum("북한강"), true);
assert.equal(isEndJaum("뷁"), true);
assert.equal(isEndJaum("강원도"), false);
assert.equal(isEndJaum("바라당"), true);
assert.equal(isEndJaum("ㅜㅜ"), false);
assert.equal(isEndJaum("케잌"), true);
assert.equal(isEndJaum("점수 A"), false);
assert.equal(isEndJaum("알파벳L"), true);
assert.equal(isEndJaum("알파벳m"), true);
assert.equal(isEndJaum("24"), false);
assert.equal(isEndJaum("23"), true);

// 조사 '이/가, 을/를, 은/는'를 알아서 붙이는 함수를 작성하시오.
// `고성군${iga("고성군")}`; // 고성군이  cf. `강원도${iga('강원도')}` ⇒ 강원도가
// `고성군${eunun("고성군")}`; // 고성군은  cf. `강원도${eunun('강원도')}` ⇒ 강원도는
// `고성군${eulul("고성군")}`; // 고성군을  cf. `강원도${eulul('강원도')}` ⇒ 강원도를
// (추가) ~이어야/여야, ~이랑/랑           isEndJaum('북면') ?  '이' : '가')

const iga = (word) => (isEndJaum(word) ? `${word}이` : `${word}가`);
const eunun = (word) => (isEndJaum(word) ? `${word}은` : `${word}는`);
const eulul = (word) => (isEndJaum(word) ? `${word}을` : `${word}를`);
console.log(iga("고성군"));

// 초성 검색을 하는 search함수를 정규식을 이용하여 작성하시오.
const searchByKoreanInitialSound = (words, initial) => {
  // 초성 가능한 문자 -> ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ ㄸ ㅃ ㅆ ㅉ [ㄱ-ㅎ]
  // 숫자 및 영어는 그냥 그대로 \w
  const krMakeRegExp = (init) => {
    const chosung = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
    const initIdx = chosung.indexOf(init);
    if (initIdx === -1) return init;
    const startCode = 44032 + initIdx * 588;
    const endCode = startCode + 587;
    return `${String.fromCharCode(startCode)}-${String.fromCharCode(endCode)}`;
  };

  const initials = Array.from(initial).map((c) => {
    if (/[ㄱ-ㅎ]/.test(c)) return `[${c}${krMakeRegExp(c)}]`;
    else return `[${c}]`;
  });

  const regExp = new RegExp(initials.join(""), "g");
  return words.filter((word) => word.match(regExp));
};

s = [
  "강원도 고성군",
  "고성군 토성면",
  "토성면 북면",
  "북면",
  "김1수",
  "ㄱㅅㄱ",
];
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㄱㅇ"), [
  "강원도 고성군",
]);
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㄱㅅㄱ"), [
  "강원도 고성군",
  "고성군 토성면",
  "ㄱㅅㄱ",
]);
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㅌㅅㅁ"), [
  "고성군 토성면",
  "토성면 북면",
]);
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㅂㅁ"), [
  "토성면 북면",
  "북면",
]);
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㅍㅁ"), []);
assert.deepStrictEqual(searchByKoreanInitialSound(s, "ㄱ1ㅅ"), ["김1수"]);

// 문자열 str에서 대문자만 골라 소문자로 변환하세요. (trythis: 대문자 <-> 소문자)
const upperToLower = (text) => {
  return text.replaceAll(/[A-Z]/g, (a) => `*${String(a).toLowerCase()}*-`);
};
upperToLower("Senior Coding Learning JS");
console.log(
  "🚀 ~ upperToLower(Senior Coding Learning JS):",
  upperToLower("Senior Coding Learning JS")
);

// ⇒ '*s*-enior *c*-oding *l*-earning *j*-*s*-
// 전화번호를 정확한 형식으로 출력하는 함수를 작성하시오.
const telfmt = (tel) => {
  const firstDig = tel.length >= 12 ? 3 : tel[1] === "2" ? 1 : 2;
  const telReg = new RegExp(`([0]\\d{${firstDig}})(\\d{3,4})(\\d{4})`, "g");
  if (tel.length <= 4) return tel;
  if (tel.length <= 8) return tel.replace(/(\d{1,4})(\d{4})/, "$1-$2");
  return tel.replace(telReg, "$1-$2-$3");
};

assert.deepStrictEqual(telfmt("0101234567"), "010-123-4567");
assert.deepStrictEqual(telfmt("01012345678"), "010-1234-5678");
assert.deepStrictEqual(telfmt("0212345678"), "02-1234-5678");
assert.deepStrictEqual(telfmt("021234567"), "02-123-4567");
assert.deepStrictEqual(telfmt("0331234567"), "033-123-4567");
assert.deepStrictEqual(telfmt("15771577"), "1577-1577");
assert.deepStrictEqual(telfmt("07012341234"), "070-1234-1234");
assert.deepStrictEqual(telfmt("050712345678"), "0507-1234-5678");
assert.deepStrictEqual(telfmt("0507123456789999"), "0507-1234-56789999");

const reverseAll = (text) => {
  return text.replaceAll(/([A-Za-z])/g, (a) =>
    /[A-Z]/.test(a) ? String(a).toLowerCase() : String(a).toUpperCase()
  );
};

console.log(reverseAll("Hello Mom"));
