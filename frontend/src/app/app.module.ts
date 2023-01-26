import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StateService } from './state.service';
import { CheckTokenGuard } from './check-token.guard';
import { AttachTokenInterceptor } from './attach-token.interceptor';

const refreshToken = (stateService: StateService) => {
  return () => {
    const stored_state = localStorage.getItem('STATE');

    if (stored_state) {
      stateService.state.next(JSON.parse(stored_state));
    }
  };
};

@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      {
        path: 'collections',
        loadChildren: () =>
          import('./components/collection.module').then(
            (m) => m.CollectionModule
          ),
        canActivate: [CheckTokenGuard],
      },
    ]),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: refreshToken,
      deps: [StateService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AttachTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
