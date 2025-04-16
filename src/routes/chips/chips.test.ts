import { describe, expect, expectTypeOf, it } from "vitest";
import router from "../index.route";
import { createTestApp } from "@/lib/create-app";

describe("Chips list", () => {
  it("should return the list of chips", async () => {
    const testRouter = createTestApp(router);
    const response = await testRouter.request("/chips");
    const result = await response.json();
    console.log(result);
    // @ts-expect-error
    expectTypeOf(result).toBeArray();
  });
});
