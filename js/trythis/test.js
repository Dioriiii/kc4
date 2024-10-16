function createIterator(items) {
  let i = 0;
  return {
    next: function () {
      const done = i >= items.length;
      const value = !done ? items[i++] : undefined;
      return {
        done: done,
        value: value,
      };
    },
  };
}

const it = createIterator([1, 2, 3, 7]);
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

function* generator(items) {
  let i = 0;
  for (let i = 0; i < items.length; i) {
    yield items[i++];
  }
}
const gen = generator([1, 3, 5, 7]);
for (const g of gen) {
  console.log(g);
}
