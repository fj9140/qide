import { HttpContextToken } from "@angular/common/http";

export const IGNORE_BASE_URL = new HttpContextToken(()=>false)