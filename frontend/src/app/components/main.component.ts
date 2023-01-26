import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ɵassignExtraOptionsToRouter } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, mergeMap, Subscription } from 'rxjs';
import { StateService } from '../state.service';
import { IUser } from '../user.interface';
import { CollectionService } from './collectin.service';

@Component({
  selector: 'app-list',
  template: `
    <button id="btn" class="button is-primary" (click)="handleAdd()">
      Add New user
    </button>

    <div id="container" class="card" *ngFor="let user of users">
      <header class="card-header">
        <p class="card-header-title">
          {{ user.fullname }}
        </p>
      </header>
      <div>
        <progress
          class="progress is-primary"
          value="{{ user.quizScore }}"
          max="100"
          #pro
        >
          15%
        </progress>
        {{ pro.value }} % Progress
      </div>

      <!-- <div class="card-content">
        <div class="content">
          {{ goal.description }}

          <br /><br />
          <time datetime="2016-1-1">deadline-{{ goal.deadline }}</time>
        </div>
      </div> -->
      <footer class="card-footer">
        <button class="button is-danger" (click)="deleteUser(user.email)">
          Delete user
        </button>
      </footer>
    </div>
  `,
  styles: [
    `
      * {
        margin: 10px;
      }
      time {
        color: blue;
      }
      #container {
        border-radius: 15px;
        box-shadow: 10px 5px 5px gray;
        background-color: lightgray;
        margin: 20px;
      }

      #btn {
        border-radius: 10px;
        width: 200px;
      }
      button {
        border-radius: 10px;
      }
    `,
  ],
})
export class MainComponent implements OnInit, OnDestroy {
  users: IUser[] = [];

  subscription!: Subscription;
  constructor(
    private collectionService: CollectionService,
    private router: Router,
    private stateService: StateService,
    private toaster: ToastrService
  ) {
    // this.addedUser = this.router.getCurrentNavigation()?.ɵxtras.state as IStudent
    this.subscription = this.stateService.state
      .pipe(
        map((res) => res.email),
        mergeMap((email) => this.collectionService.getUsers())
      )
      .subscribe((response) => {
        this.users = response.data;
        console.log(response, 'response');
      });
  }

  ngOnInit(): void {}

  handleAdd() {
    this.router.navigate(['', 'collections', 'add']);
  }

  deleteUser(email: string) {
    this.users = this.users.filter((user) => user.email !== email);
    this.collectionService.deleteUsers(email).subscribe((response) => {
      if (response.success) {
        this.toaster.success('successfully deleted');
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
