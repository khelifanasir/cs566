import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IUser, Iscore } from '../user.interface';
import { StateService } from '../state.service';
@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  score: { quizScore: number } = { quizScore: 70 };
  constructor(private client: HttpClient, private stateService: StateService) {}

  getUsers() {
    return this.client.get<{ data: IUser[] }>(
      environment.server + '/users/user'
    );
  }

  deleteUsers(email: string) {
    return this.client.delete<{
      success: boolean;
      data: { acknowledged: boolean; deletedCount: number };
    }>(environment.server + '/users/user/' + email);
  }

  updateScore(email: string, obj: Iscore) {
    console.log(email, obj);

    console.log(
      this.client
        .patch<{
          success: boolean;
        }>(environment.server + '/users/user/update/' + email, obj)
        .subscribe((res) => console.log(res, 'res'))
    );
    return this.client.patch<{
      success: boolean;
    }>(environment.server + '/users/user/update/' + email, obj);
  }
}
