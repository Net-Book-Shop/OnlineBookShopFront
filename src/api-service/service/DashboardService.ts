import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResultFormatModel } from "../../api-service/model/common/ApiResultFormatModel";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.prod";

@Injectable({
    providedIn: 'root',
})
export class DashboardService {

    BASEURL = '';
    constructor(private http: HttpClient) {
        this.BASEURL = environment.baseURL;
    }

    public GetIncomeAndLastMonthProfit(): Observable<ApiResultFormatModel> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
        return this.http.get<ApiResultFormatModel>(this.BASEURL + 'dashboard/GetIncomeAndLastMonthProfit', { headers });
    }

}
