import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment.prod";
import {Observable} from "rxjs";
import {ApiResultFormatModel} from "../model/common/ApiResultFormatModel";

@Injectable({
  providedIn: 'root',
})
export class BookService {

  BASEURL = '';

  constructor(private http: HttpClient) {
    this.BASEURL = environment.baseURL;
  }

  addBook(bookData: any, imageFile: File | null) {
    const formData = new FormData();

    formData.append('CategoryName', bookData.CategoryName || '');
    formData.append('SubCategoryName', bookData.subCategoryName || '');
    formData.append('BookName', bookData.BookName || '');
    formData.append('Qty', bookData.Qty?.toString() || '');
    formData.append('CostPrice', bookData.CostPrice?.toString() || '');
    formData.append('SellingPrice', bookData.SellingPrice?.toString() || '');
    formData.append('Description', bookData.Description || '');
    formData.append('Supplier', bookData.Supplier || '');
    formData.append('CategoryCode', bookData.CategoryCode || '');

    if (imageFile) {
      formData.append('ImageFile', imageFile);
    }

    return this.http.post(`${this.BASEURL}book/add`, formData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  }
  public addCategory(payload: any): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL + 'category/AddCategory', payload, { headers });
  }
  public addSubCategory(payload: any): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL + 'category/AddSubCategory', payload, { headers });
  }

  public getAllCategory(payload: any): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.get<ApiResultFormatModel>(this.BASEURL + 'category/GetAllCategory', { headers });
  }
  public getAllSubCategory(payload: any): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.get<ApiResultFormatModel>(this.BASEURL + 'category/GetAllSubCategory', { headers });
  }

  public GetAllBookCategoryWise(payload: any): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL + 'book/GetAllBookCategoryWise', payload, { headers });
  }

  public AddBookReviewAndRating(payload: any): Observable<ApiResultFormatModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.post<ApiResultFormatModel>(this.BASEURL + 'book/AddBookReviewAndRating', payload, { headers });
  }

}
