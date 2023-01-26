import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import jwt_decode from 'jwt-decode';
import { StateService } from '../state.service';
import { IUser } from '../user.interface';

@Component({
  selector: 'app-login',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="form">
      <input placeholder="Email" formControlName="email" class="input m-2" />
      <input
        type="password"
        placeholder="password"
        formControlName="password"
        class="input m-2"
      />

      <button type="submit" class="button is-primary" [disabled]="form.invalid">
        Log in
      </button>
    </form>
    <br />
  `,
  styles: [],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private stateService: StateService
  ) {}

  form = inject(FormBuilder).nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  submit() {
    this.userService
      .login(this.form.value as { email: string; password: string })
      .subscribe((response) => {
        if (response.success) {
          const decoded = jwt_decode(response.data) as IUser;

          const state = {
            email: decoded.email,
            fullname: decoded.fullname,

            token: response.data,
          };

          this.stateService.state.next(state);

          localStorage.setItem('STATE', JSON.stringify(state));

          //save the state + persist in local storage
          if (decoded.role === 'user') {
            this.router.navigate(['', 'collections', 'training']);
          } else {
            this.router.navigate(['', 'collections', 'list']);
          }
        } else {
          alert('check your username and password');
        }
      });
  }
  ngOnInit(): void {}

  signup() {
    this.router.navigate(['', 'signup']);
  }
}
