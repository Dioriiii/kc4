const express = require("express");
const app = express();

app.use(express.json({ extended: true })); // body 파싱
app.use(express.urlencoded({ extended: true })); // query(url?) 파싱

app.use("/ttt/:id", (req, res, next) => {
  console.log("/ttt - use !!!");
  next();
});

app.get("/ttt/:id", (req, res) => {
  console.log("/ttt - get !!!");
  const { id } = req.params;
  const name = req.query.name;
  if (!id || !name) {
    res.status(401).send("Input the name, plz");
    return;
  }
  res.send({ id, name });
});

let users = [{ id: 1, name: "Hong", email: "hong@naver.com" }];

app.post("/users", (req, res) => {
  console.log(">>", req.body);
  const { email, name } = req.body;
  const id = Math.max(...users.map(({ id }) => id), 0) + 1;
  const user = { id, email, name };
  users.push(user);
  res.status(200).send(user);
  // res.send("OK");
});

app.get("/users", (req, res) => {
  console.log("get >>", users);
  res.send(users);
});
app.patch("/users/:id", (req, res) => {
  const { id: userid } = req.params;
  const { email, name } = req.body;
  const user = users.find(({ id }) => id === +userid);
  if (!user) {
    return res.status(404).send({ message: "Not Found User" });
  }

  user.email = email;
  user.name = name;
  res.send(user);
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  users = [...users.filter((user) => String(user.id) !== id)];
  console.log("delete >> ", users, id, req.params);
  res.send({ message: "OK" });
});

const PORT = 7000; // 1024 이후의 포트 쓰는 게 좋음
app.listen(PORT, () => {
  console.log(`Server's started on ${PORT} ...`);
  console.log("http://localhost:" + PORT + "/ttt/100?name=Hong");
});
