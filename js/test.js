// const user = {
//   "": 1,
//   " ": 1, // 'id': 1, '0y': 2 모두 OK!
//   123: 1, // user[123], user['123'] OK, but user.123 is SyntaxError!!
//   "12345n": 2, // user[12345], user[12345n], user['12345'] OK, but user['12345n'] is undefined!
//   true: 1, // OK  user[true]  user.true
//   id: 2,
//   [`name`]: "Hong", // But, `name`: 'Hong'은 SyntaxError: Unexpected template string!
//   [Symbol()]: "Hong", // OK But, Symbol(): 'Hong'은 SyntaxError: Unexpected token ':'
//   [`${new Date()}`]: 365, // OK! 'Sun Jul …': 365
//   "my-friends": ["Han", "Kim"],
//   getInfo: () => `${this.id}-${this.name}`, // OK! But, this is not user!
//   getInfo() {
//     return `${this.id}-${this.name}`;
//   }, // OK! getInfo의 최종 <f.o>
// };

// console.log(Object.keys(user), Object.keys(user).length);
// console.log(Reflect.ownKeys(user), Reflect.ownKeys(user).length);
// user.addr = "Seoul";
// console.log(user);
// console.log("addr" in user);
// console.log(user.hasOwnProperty("addr"));
// console.log(Reflect.has(user, "addr"));
// console.log(Reflect.has(user, "123"));
// console.log(Object.getOwnPropertySymbols(user));

// user[Symbol()] = "cake";
// console.log(Object.getOwnPropertySymbols(user));

// const hello = Symbol.for("hi");
// console.log(hello === Symbol.for("hi"));

// delete user[Symbol()];
// Reflect.deleteProperty(user, "addr");
// console.log("addr" in user);
// user[`${user.id}s name`] = `Mr. ${user.name}`;
// user.id = "BBBBAM";
// console.log(Reflect.ownKeys(user));
// console.log(Object.entries(user));

// function entriesWithSymbol(obj) {
//   const result = [];
//   if (!obj || typeof obj !== "object") {
//     return [];
//   }
//   const keys = Reflect.ownKeys(obj);
//   for (const key of keys) {
//     result.push([key, obj[key]]);
//   }

//   return result;
// }

// console.log(entriesWithSymbol(user));

// Object.getOwnPropertyDescriptor(user, "id");
// Object.getOwnPropertyDescriptors(user);
// Object.defineProperty(user, "addr", {
//   value: "Pusan",
//   writable: true,
//   enumerable: true,
// });

// const park = Object.fromEntries([
//   ["id", 4],
//   ["nm", "Park"],
// ]);
// console.log(park);
// console.log(Object.assign({ x: 100 }, user));
// console.log(Object.assign(user, { xx: 100 }));

// Object.getOwnPropertyDescriptor(user, 'id')  // value, writable,
// Object.getOwnPropertyDescriptors(user)  // enumerable(entries속성 노출 여부), configurable
// Object.defineProperty(user, 'age', { value: 39, writable: false});
// // age는 writable, enumerable, configurable 모두 false ⇒ Object.keys()에서 제외!
// Object.keys(user) vs Object.values(user) vs Object.entries(user)
// const park = Object.fromEntries([ ['id', 7], ['nm', 'Park'] ]);
// Object.assign({x:100}, user);  vs  {x:100, ...user}
//  vs  new Object(user) vs  Object.create(user)    ⇒ ⇒ ⇒
// // x = Object.create(user); x.__proto__
// // Object의 생성자함수에 매개변수에 object를 주면 그대로 반환!!
// Object.preventExtensions(user); // 추가, 삭제, 읽기, 쓰기, 재정의
// Object.seal(user);              // 추가, 삭제, 읽기, 쓰기, 재정의(밀봉, writable:true인 것은 변경 가능)
// Object.freeze(user);            // 추가, 삭제, 읽기, 쓰기, 재정의 (enumerable외 모두 false)
// // 주의) 값을 할당해도 오류는 없다. 단, 하위(중첩) 객체까지 동결(freeze)하지 못한다!
// user['my-friends'][0] = 'Choi';

function a(a,b) {
  console.log("a.name => ", a.name);
  console.log("a.length => ", a.length);
  console.log("arguments => ", arguments);
  console.log("new.target => ", new.target);
}

const af = (a,b,c) => {
  console.log("af.name => ", af.name);
  console.log("af.length => ", af.length);
  console.log("arguments => ", arguments);
  console.log("new.target => ", new.target);
  console.log(a,b,c);
}

// a(1, 2, "k");
// af(1, 2, "k");

// 화살표 함수는 prameter 는 갖지만 arguments 는 가질수 없다

const addTax = function (resolve) {
  return function (price) {
    return resolve(price*1.1)
  }
}

const addTax1 = resolve => {
  return price => {
    resolve(price*1.1);
  }
}

const addTax2 = resolve => price => resolve(price*1.1);

const obj = {
  name: 'ObjName',
  bark1() {
    console.log('1=', this.name);
    const self = this;  // OLD version
    setTimeout( function() {
      console.log('11=', self.name); // obj
      console.log('12=', this); // Timeout
    }, 1000);     // .bind(this)
    console.log('xxxx');
  },
  bark2() { // same as bark2: function() {
    console.log('2=', this.name);
    setTimeout(() => {
      console.log('22=', this.name);
    }, 1000);
  },
  bark3() { // ⇐⇒ bark3: function() {
    function innerFn() {
      console.log(this); // ?
    }
    innerFn();
  },
  bark4: () => {
    console.log(this.name); // ?
  }, // bark4의 소유자(obj)의 Lexical Scope의 this
};

// obj.bark1(); // vs  var x = obj.bark1;
// obj.bark2();
// obj.bark3();
// obj.bark4();

const expressFn = function (name) {
  this.name = name;
  console.log(this, new.target, this.name, name);
}

const arrowFn  = name => {
  this.name = name;
  console.log(this, new.target, this.name, name);
}

// expressFn("exfn");
// arrowFn("arrF");

// const efn = new expressFn("efn");

const Dog = function(name) {
  console.log(this, new.target, this instanceof Dog);
  this.name = name;
  this.bark = function () {
    console.log('bark = ', new.target, this.name, name);
  }
  this.bark2 = () => {
    console.log("bark2 = ", new.target, this.name, name);
  }
}

const dog = Dog('Doggy');
const lucy = new Dog("Lucy");
bark();
lucy.bark();
lucy.bark2();
console.log("type = ",typeof dog);
console.log("type = ",typeof lucy);

console.log("++++++++++++++++++++++++++");
class Cat {
  constructor(name) {
    this.name = name;
  }

  bark() {
    console.log("miyao~~", this.name);
  }
  bark2 = () => {
    console.log("miyao~~", this.name);
  }
}

const navii = new Cat("Navii");
console.log("🚀 ~ Navii:", navii)
navii.bark(); 
navii.bark2();
