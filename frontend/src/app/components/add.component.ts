import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../user.interface';
import { StateService } from '../state.service';
import { Subscription, timestamp } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="form">
      <input placeholder="Email" formControlName="email" class="input m-2" />
      <input
        type="password"
        placeholder="password"
        formControlName="password"
        class="input m-2"
      />
      <input
        placeholder="full Name"
        formControlName="fullname"
        class="input m-2"
      />
      <input placeholder="role" formControlName="role" class="input m-2" />
      <button type="submit" class="button is-primary" [disabled]="form.invalid">
        submit
      </button>
    </form>
  `,
  styles: [
    `
      .steps {
        font-size: 25px;
        text-align: center;
        background-color: skyblue;
      }
    `,
  ],
})
export class AddComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  form = inject(FormBuilder).nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    fullname: ['', Validators.required],
    role: ['', Validators.required],
    quizScore: 0,
  });

  submit() {
    this.subscription = this.userService
      .signup(this.form.value as IUser)
      .subscribe((response) => {
        //if(!response.success) alert("user may already exist")
        this.form.reset();
        this.router.navigate(['', 'collections', 'list']);
      });
  }

  constructor(
    private userService: UserService,
    private toaster: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private state: StateService
  ) {
    // this.subscription = this.state.state.subscribe((response) => {
    //   this.form.get('user_id')?.patchValue(response.email);
    // });
    //this.steps.get('id')?.setValue(Math.floor(Math.random() * 100000000000));
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
