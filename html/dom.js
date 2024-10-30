const head = document.head;
const body = document.body;
const eles = body.children;
console.log("🚀 ~ eles:", eles, eles[0]);
const nodes = body.childNodes;
console.log("🚀 ~ nodes:", nodes, nodes[0]);
// const div = document.div;
const divs = document.getElementsByTagName("div");

console.log(head, body, [...divs]);

body.append("APP");
const ele = document.createElement("strong");
ele.innerHTML = "<p><i>Italic</i></p><br>";
// ele.innerText = "<p><i>Italic</i></p><br>";
// ele.textContent = "<p><i>Italic</i></p><br>";
body.appendChild(ele);
ele.style.color = "green";
ele.style.fontSize = "2rem";

const xxx = document.getElementById("x");
console.log("🚀 ~ xxx:", xxx);
xxx.style.color = "red";
xxx.style.fontWeight = "900";
xxx.style.backgroundColor = "yellow";
xxx.dataset.x = "x_X";
xxx.dataset.y = "y_Y";

const yyy = document.getElementsByClassName("y")[0];
console.log("yyy", yyy, yyy.textContent);
// yyy[0].remove();
yyy.setAttribute("style", "color:red; font-weight:700");
const span = document.createElement("span");
span.innerText = "gggg";
body.appendChild(span);

function f(e) {
  console.log(e);
}
function nm(e) {
  console.log(e);
}
function em(e) {
  console.log(e);
}
