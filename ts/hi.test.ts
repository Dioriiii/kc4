import { getScore, isValid } from "./hi";

const ret = getScore("과");
// console.log("🚀 ~ ret:", ret);

describe("-hi-", () => {
  describe("-hi-getScore", () => {
    test("hi.getScore => ", () => {
      expect(getScore("과")).toBe("과목 : 과");
    });
    test("hi.getScore => ", () => {
      expect(getScore("수")).toBe("과목 : 수");
    });
    test("hi.getScore => ", () => {
      expect(getScore("국")).toBe("과목 : 국");
    });
  });
  describe.only("-hi-valid", () => {
    test("-isValid-", () => {
      expect(isValid()).toBe(true);
      expect(isValid()).toBeTruthy();
      // expect(isValid()).toBeFalsy();
    });
  });
});
