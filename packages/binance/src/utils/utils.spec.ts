import { describe,expect,it } from "vitest";
import { testUrlSpeed } from "./utils";

describe("utils unit tests", () => {
  it("", async () => {
    const speed = await testUrlSpeed("https://www.baidu.com");
    expect(typeof speed).toBe("number");
  });
})
