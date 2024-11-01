import assert from "assert";
// Emp type의 hong 객체에 fullName 기능을 Accessor Property를 사용하지 말고, proxy 생성자 함수를 이용하여 구현하시오.

class Emp {
  firstName;
  lastName;
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        return target[prop];
      },
      set(target, prop, value, receiver) {
        if (prop === "fullName") {
          const [f, l] = value.split(" ");
          target.firstName = (l && f) || target.firstName;
          target.lastName = ((l && l) || f).toUpperCase();
          target.fullName = `${target.firstName} ${target.lastName}`;
        } else {
          return target[prop]?.toUpperCase();
        }
        return target;
      },
    });
  }
}
const hong = new Emp();

hong.fullName = "Kildong Hong";
assert.strictEqual(hong.fullName, "Kildong HONG");
hong.fullName = "Lee";
assert.strictEqual(hong.fullName, "Kildong LEE");
