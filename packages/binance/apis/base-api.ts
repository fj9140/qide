import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";


export abstract class BaseAPI {
  protected  httpClient=inject(HttpClient)
}
