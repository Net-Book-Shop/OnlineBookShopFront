import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment.prod";
import {Observable} from "rxjs";
import {ApiResultFormatModel} from "../model/common/ApiResultFormatModel";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  SERVER = '';
  constructor(private http: HttpClient) {
    this.SERVER = environment.baseURL;
  }

  signIn(payLoad: any) {
    return this.http.post<any>(environment.baseURL +'Auth/Login', payLoad);
  }

  register(payLoad: any) {
    return this.http.post<any>(environment.baseURL +'values/Register', payLoad);
  }

  addUser(payLoad: any) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<any>(environment.baseURL + 'auth/signup', payLoad,{headers});
  }

  signup(payload: any): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.SERVER+'auth/signup', payload, { headers });
  }

}
