import axios from "axios";
import { GetAllContractsResponse } from "./interface";

export class FutureRestAPI {
  private _baseURL='https://api.gateio.ws/api/v4'
  private _axiosInstance:axios.AxiosInstance

  constructor(proxyConfig?: axios.AxiosProxyConfig){
    this._axiosInstance = axios.create({
      proxy: proxyConfig,
    });
  }

  /**
   * 查询所有的合约信息
   * @link https://www.gate.com/docs/developers/apiv4/zh_CN/futures/#%E6%9F%A5%E8%AF%A2%E6%89%80%E6%9C%89%E7%9A%84%E5%90%88%E7%BA%A6%E4%BF%A1%E6%81%AF
   * @param settle 结算货币类型，支持 'btc' 或 'usdt'
   * @returns 返回所有合约信息的响应
   */
  async getAllContracts(settle:'btc'|'usdt'='usdt'){
    return (await this._axiosInstance.get<GetAllContractsResponse>(`${this._baseURL}/futures/${settle}/contracts`)).data
  }
}
