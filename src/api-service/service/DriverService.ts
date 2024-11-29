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

  public getVehicleTypes(): Observable<ApiResultFormatModel> {
    return this.http.get<ApiResultFormatModel>('assets/JSON/vehicleType.json').pipe(
      map((vehicleTypes: ApiResultFormatModel) => {
        return vehicleTypes;
      })
    );
  }

  public getActiveVehicle(): Observable<ApiResultFormatModel> {
    return this.http.get<ApiResultFormatModel>('assets/JSON/activeVehicle.json').pipe(
      map((activeVehicles: ApiResultFormatModel) => {
        return activeVehicles;
      })
    );
  }
  getGeolocationDriverDetails(payload: any) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL + 'driver/getGeolocationDrivers', payload, {headers});
  }


  getDrivers(): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.get<any[]>(this.BASEURL + 'driver/drivers', { headers });
  }
  getUnAllocateDrivers(): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.get<ApiResultFormatModel>(this.BASEURL + 'driver/drivers/idle', { headers });
  }


  deleteUser(userId: number) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.delete(this.BASEURL+'driver/deleteDriver/'+userId, { headers });
  }

  // get taxi dispatcher
 saveDriverGeoLocation(payload: any) {
    return this.http.post<ApiResultFormatModel>(this.BASEURL + 'drivers/location', payload);
  }

  // get taxi dispatcher
  getDriversAndLocation(payload: any) {
    return this.http.post<ApiResultFormatModel>(this.BASEURL + 'drivers/search', payload);
  }


}