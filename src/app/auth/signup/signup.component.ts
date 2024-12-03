import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/core/routes-path/routes';
import { WebstorgeService } from 'src/app/shared/webstorge.service';
import {AuthService} from "../../../api-service/service/AuthService";
import Swal from "sweetalert2";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  public routes = routes;
  password = 'password';
  show = false;
  public CustomControler: undefined;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    role: new FormControl('Customer', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private storage: WebstorgeService, private authService: AuthService) {}

  onClick() {
    this.password = this.password === 'password' ? 'text' : 'password';
    this.show = !this.show;
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);

      // Prepare the payload to match the expected structure
      const payload = {
        userName: this.form.value.username, // Adjusting the key name to match the expected API format
        email: this.form.value.email,
        password: this.form.value.password,
        role: this.form.value.role, // Adjusting role if it's in an array
      };

      // Use the register method to sign up the user
      this.authService.register(payload).subscribe(
        (data) => {
          console.log(data);
          this.storage.submit();
          // Optionally redirect or show success message
          Swal.fire('Success', 'Account created successfully', 'success');
        },
        (error) => {
          Swal.fire('', error.error.message, 'error');
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }
}
