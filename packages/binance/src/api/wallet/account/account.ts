import { Restful } from "../../../core/restful.decorator";

export class Account {
  constructor(private config: { apiKey: string; apiSecret: string }) {}

  set apiKey(key:string){
    this.config.apiKey=key
  }
  set apiSecret(secret:string){
    this.config.apiSecret=secret
  }

  @Restful({
    secType: "USER_DATA",
  })
  getInfo(){
    return {
      url: "/sapi/v1/account/info",
      params:{}
    }
  }
}
