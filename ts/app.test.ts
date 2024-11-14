import { saveUser, fetchUsers, deleteUser } from "./myfetch";
const KIM = {
  id: 2,
  email: "kim@naver.com",
  name: "kim",
};
const KIM2 = {
  id: 2,
  email: "kim2@naver.com",
  name: "kim2",
};
const HONG = { id: 1, name: "Hong", email: "hong@naver.com" };

const afterPostUsers = [HONG, KIM];
const afterPostUsers2 = [HONG, KIM2];

// jest.mock("./myfetch", () => ({
//   fetchUsers: () => afterPostUsers,
//   saveUser: () => KIM,
// })); // 가로채기!

describe("fetch - /users", () => {
  test("users - get", async () => {
    const users = await fetchUsers();
    expect(users).toEqual([HONG]);
  });

  test("users - post", async () => {
    const name = KIM.name;
    const email = KIM.email;
    const user = await saveUser({ name, email, id: 0 });
    expect(user).toEqual(KIM);
  });
  test("users - patch", async () => {
    const email = KIM2.email;
    const name = KIM2.name;
    const user = await saveUser({ name, email, id: 2 });
    expect(user).toEqual(KIM2);
  });

  test("users - get - afterPatch", async () => {
    const users = await fetchUsers();
    expect(users).toEqual(afterPostUsers2);
  });
  test.skip("users - get", async () => {
    const users = await fetchUsers();
    // expect(users).toBe(undefined)
    // expect(users).toBeUndefined
  });

  test("user - delete", async () => {
    const user = await deleteUser(KIM.id);
    expect(user).toEqual({ message: "OK" });
  });

  test("user - get", async () => {
    const users = await fetchUsers();
    expect(users).toEqual([HONG]);
  });

  // test("users - post", async () => {
  //   const name = KIM.name;
  //   const email = KIM.email;
  //   const user = await saveUser({ name, email, id: 0 });
  //   expect(user).toEqual(KIM);
  // });

  // test("user - get", async () => {
  //   const users = await fetchUsers();
  //   expect(users).toStrictEqual([
  //     { id: 1, name: "Hong", email: "hong@naver.com" },
  //     KIM,
  //   ]);
  // });
});
