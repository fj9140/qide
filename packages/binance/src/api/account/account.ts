import {got} from "got";

export class Account {
  constructor(private config: { apiKey: string; apiSecret: string }) {}

  getInfo(){
    got.post('https://www.baidu.com')
  }
}
