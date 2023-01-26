import { isNgTemplate } from '@angular/compiler';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IState } from './state.interface';
import { StateService } from './state.service';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <nav class="navbar is-info">
      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-start"></div>
        <div>
          <h1 class="head">Hard Work Always Pays Off</h1>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control" *ngIf="!state.token; else logoutButton"></p>

              <ng-template #logoutButton>
                <button class="button is-primary mr-2" (click)="logout()">
                  Log out
                </button>
              </ng-template>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="container">
      <div class="notification is-background-grey-light">
        <router-outlet></router-outlet>
      </div>
    </div>

    <footer class="footer"></footer>
  `,
  styles: [
    `
      .head {
        text-transform: uppercase;
        line-height: 1;
        text-align: center;
        font-size: 5rem;
        display: grid;
        gap: 4rem;
        font-family: 'Bowlby One', cursive;
        color: coral;
        text-shadow: 20px 0px 10px rgb(0, 0, 0);
      }
    `,
  ],
})
export class AppComponent {
  title = 'crud';
  state!: IState;
  private router = inject(Router);
  constructor(private stateService: StateService) {
    this.stateService.state.subscribe((state: IState) => {
      this.state = state;
    });
  }
  login() {
    this.router.navigate(['', 'login']);
  }

  signup() {
    this.router.navigate(['', 'signup']);
  }

  logout() {
    this.stateService.state.next({
      email: '',
      fullname: '',

      token: '',
    });

    localStorage.clear();
    this.router.navigate(['']);
  }
}
