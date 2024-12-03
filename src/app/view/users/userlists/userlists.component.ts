import { Component } from '@angular/core';
import { SweetalertService } from 'src/app/shared/sweetalert/sweetalert.service';
import {UserService} from "../../../../api-service/service/UserService";
import Swal from "sweetalert2";
interface data {
  value: string;
}
@Component({
  selector: 'app-userlists',
  templateUrl: './userlists.component.html',
  styleUrls: ['./userlists.component.scss'],
})
export class UserlistsComponent {
  public selectedValue1 = '';
  selectedList1 = [
    {value: 'Customer'},
    {value: 'Admin'},
  ];
  public tableData: any[] = [];
  public searchDataValue = '';
  showFilter = false;

  constructor(
    private userService: UserService,
    private sweetalert: SweetalertService
  ) {
  }

  ngOnInit(): void {
    this.fetchUsers('Customer'); // Default role
  }

  fetchUsers(role: string): void {
    const body = {
      role: role
    };
    this.userService.GetRoleWiseUserlist(body).subscribe((response) => {
      if (response.statusCode === 200) {
        this.tableData = response.data;
      } else {
        this.tableData = [];
      }
    });
  }

  searchData(value: string): void {
    const searchValue = value.toLowerCase();
    this.tableData = this.tableData.filter(
      (user) =>
        user.userName.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue)
    );
  }

  deleteBtn(userId: string): void {
    this.sweetalert.deleteBtn();
    // Add delete API integration here
  }

  editUser(user: any): void {
    Swal.fire({
      title: 'Edit Password',
      html: `
      <label for="password" style="display: block; text-align: left;">New Password:</label>
      <input type="password" id="password" class="swal2-input" placeholder="Enter new password">
    `,
      focusConfirm: false,
      preConfirm: () => {
        const password = (document.getElementById('password') as HTMLInputElement)?.value;
        if (!password) {
          Swal.showValidationMessage('Password is required');
        }
        return password;
      },
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        const newPassword = result.value;
        if (newPassword) {
          // Call API to update password
          const body = {
            userId: user.id,
            newPassword: newPassword,
          };
          this.userService.UpdateUser(body).subscribe(
            (response) => {
              if (response.statusCode === 200) {
                Swal.fire('Success', 'Password updated successfully', 'success');
              } else {
                Swal.fire('Error', 'Failed to update password', 'error');
              }
            },
            (error) => {
              Swal.fire('Error', `Error: ${error.message}`, 'error');
            }
          );
        }
      }
    });
  }
}
