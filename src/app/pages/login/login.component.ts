import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  isError: boolean = false;
  form = new FormGroup({
    login: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(32),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(32),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.userValue) this.router.navigate(['/']);
  }

  onClick(event: Event) {
    if (this.form.invalid) return;
    this.isLoading = true;
    const { login, password } = this.form.value;
    this.authService.login(login, password).subscribe(
      (res) => {
        this.router.navigate(['/']);
        this.isLoading = false;
      },
      (err) => {
        this.isError = true;
        this.isLoading = false;
      }
    );
  }
}
