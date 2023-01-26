import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../user.interface';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="form">
      <input placeholder="Email" formControlName="email" class="input m-2" />
      <input
        placeholder="Full name"
        formControlName="fullname"
        class="input m-2"
      />
      <input
        placeholder="password"
        formControlName="password"
        type="password"
        class="input m-2"
      />

      <button type="submit" class="button is-primary" [disabled]="form.invalid">
        Sign Up
      </button>
    </form>
  `,
  styles: [],
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  form = inject(FormBuilder).nonNullable.group({
    email: ['', Validators.required],
    fullname: ['', Validators.required],
    password: ['12345', Validators.required],
  });

  submit() {
    this.userService.signup(this.form.value as IUser).subscribe((response) => {
      //if(!response.success) alert("user may already exist")
      this.form.reset();
      this.router.navigate(['', 'login']);
    });
  }

  ngOnInit(): void {}
}
