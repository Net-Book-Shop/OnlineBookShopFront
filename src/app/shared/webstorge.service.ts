import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../core/routes-path/routes';
import {el} from "@fullcalendar/core/internal-common";


@Injectable({
  providedIn: 'root',
})
export class WebstorgeService {

  constructor(private router: Router) {}

  public login(data: any): void {
    sessionStorage.clear();
    sessionStorage.setItem('authenticated', 'true');
    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('role', data.role);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('token', data.accessToken);
    sessionStorage.setItem('userId', data.userCode);
    sessionStorage.setItem('privilages', data.privilages);

    console.log("privilage..",data.privilages)
    console.log("role..",data.role)

    const role = (sessionStorage.getItem("role"))
    if(role == "Customer"){
      this.router.navigate([routes.customerHomePage]);
    }else {
      this.router.navigate([routes.dashboard]);
    }
  }
  public submit(): void {
    sessionStorage.setItem('authenticated', 'true');
    this.router.navigate([routes.signIn]);
  }
  public Logout(): void {
    sessionStorage.removeItem('authorized');
    sessionStorage.removeItem('loginTime');
    this.router.navigate(['/auth/signin']);
  }
}
