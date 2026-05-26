import { describe,it,expect,beforeEach } from "vitest";
import { FutureRestAPI } from "./rest-api";

describe("FutureRestAPI", () => {
  let restApi: FutureRestAPI;

  beforeEach(() => {
    restApi = new FutureRestAPI();
  });
  it("should fetch premium index", async () => {
    const response = await restApi.premiumIndex();
    expect(response).toBeDefined();
    const response2=await restApi.premiumIndex('BTCUSDT');
    expect(response2).toBeDefined();
  },10000);

  it("should fetch funding info", async () => {
    const response = await restApi.fundingInfo();
    expect(response).toBeDefined();
  },10000);
  it("should fetch ticker price", async () => {
    const response = await restApi.tickerPrice();
    expect(response).toBeDefined();
    const response2=await restApi.tickerPrice('BTCUSDT');
    expect(response2).toBeDefined();
  },10000);
});
