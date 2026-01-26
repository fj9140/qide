import { Account as AccountAPI } from "../src/api/account/account"

describe("Account API E2E Tests", () => {
  let accountAPI:AccountAPI
  beforeAll(() => {
    accountAPI = new AccountAPI({
      apiKey:"",
      apiSecret:""
    })
  })

  it("should fetch account info", async () => {
    const info = await accountAPI.getInfo()
    console.log(info)
  })
});
