// user 객체를 받아서 id와 name을 출력하는 함수를 3개의 함수로 작성하시오.

// 1.  function f(user){}
// 2.  function f({id, name}){}
// 3.  const f = ({id,name}) => {}

const hong = { id: 1, name: "Hong" };
const lee = { id: 2, name: "Lee" };
const choi = { id: 3, name: "Choi" };

function f1({ id, name }) {
  console.log(id, name);
}

function f2(user) {
  console.log(user.id, user.name);
}

const f3 = ({ id, name }) => {
  console.log(id, name);
};

// f1(hong);
// f2(lee);
// f3(choi);
