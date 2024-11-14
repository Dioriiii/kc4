import { time1, time2, time3, timePromi } from "../hello";

describe("hello", () => {
  beforeEach(() => {
    console.log("BEFORE EACH!!!!!!!!!!!!");
  });
  afterEach(() => {
    console.log("AFTER EACH!!!!!!!!!!");
    jest.clearAllMocks();
  });

  describe.only("mock", () => {
    const user = {
      id: 1,
      name: "Hong",
      getName(n: number) {
        return `${this.name}-${n}`;
      },
    };
    const spy = jest.spyOn(user, "getName");
    user.getName(1);
    expect(user.getName).toHaveBeenCalled();
    expect(user.getName).toHaveBeenCalledWith(1);

    // jest.mock("axio", () => {
    //   defaults: {
    //     get: jest.fn().mockResolvedValue({ id: 1 });
    //   }
    // });

    const pow = jest.fn((a) => a ** 2);
    expect(pow(3)).toBe(9);
    const calc = { id: 1, pow };
  });
  describe("promise", () => {
    test("timePromi", (done) => {
      timePromi(1)
        .then((res) => {
          expect(res).toBe(3);
          console.log("*********************");
          done();
        })
        .catch((err) => {
          console.error("ERR>>", err);
          done();
        });
    });
    test("timePromi-2", async () => {
      try {
        const res = await timePromi(1);
        expect(res).toBe(3);
      } catch (err) {
        console.error("ERR>>", err);
        expect(err).toBe("OddNumber: 1");
      }
    });
    test("timePromi-3", async () => {
      expect(await timePromi(2)).toBe(3);
    });
    test("timePromi-4", (done) => {
      expect(timePromi(4)).resolves.toBe(5);
      expect(timePromi(1)).rejects.toBe("OddNumber: 1").finally(done);
    });
  });

  test.skip("time", () => {
    const f = () => console.log("time in test!!");
    expect(time1()).toContain(1);
    expect(time1()).toEqual([1, 2, 3]);
    expect(time1()).toEqual(expect.arrayContaining([1, 2]));

    expect(() => {
      time2(4);
    }).toThrow(/Error/);
    expect(() => {
      time2(4);
    }).toThrow("Time Error!!!");
    expect(time2(1)).toBeTruthy();
    expect(time3(1)).toEqual({ id: 3, name: "Hong", addr: { city: "Seoul" } });
    expect(time3(2)).toEqual({ id: 3, name: "Hong" });
    expect(time3(2)).toStrictEqual({ id: 3, name: "Hong", addr: undefined });
    expect(time3(0)).toHaveProperty("addr");
    expect(time3(2)).toHaveProperty("addr");
    expect(time3(2).name).toMatch(/ong/);
    expect(time3(2)).toMatchObject({ name: "Hong" });

    const timeX = jest.fn((cb) => cb());
    timeX(f);
    expect(timeX).toHaveBeenCalled();
  });
});
