import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {ApiResultFormatModel} from "../model/common/ApiResultFormatModel";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export  class DriverService {
  private BASEURL:string;

  constructor(private http:HttpClient) {
    this.BASEURL = environment.baseURL;

  }


  getUnAllocateDrivers(): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.get<ApiResultFormatModel>(this.BASEURL + 'driver/drivers/idle', { headers });
  }


  deleteUser(userId: number) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.delete(this.BASEURL+'driver/deleteDriver/'+userId, { headers });
  }



}
