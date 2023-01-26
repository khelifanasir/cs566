import { BuiltinTypeName } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ɵassignExtraOptionsToRouter } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, mergeMap, Subscription } from 'rxjs';
import { StateService } from '../state.service';
import { Iscore, IUser } from '../user.interface';
import { CollectionService } from './collectin.service';

@Component({
  selector: 'app-list',
  template: `
    <div>
      quiz page
      <div id="container" class="card" *ngFor="let quiz of quizs">
        <header class="card-header">
          <p class="card-header-title">
            {{ quiz.question }}
          </p>
        </header>
        <div>
          <label>
            <input
              type="radio"
              value="{quiz.options.a}"
              (change)="handleAnswer('a', 0)"
              value="a"
            />
            {{ quiz.options.a }}
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="{quiz.options.b}"
              (change)="handleAnswer('b', 1)"
              value="b"
            />
            {{ quiz.options.b }}
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="{quiz.options.c}"
              (change)="handleAnswer('c', 2)"
              value="c"
            />
            {{ quiz.options.c }}
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="{quiz.options.d}"
              (change)="handleAnswer('d', 3)"
              value="d"
            />
            {{ quiz.options.d }}
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="{quiz.options.e}"
              (change)="handleAnswer('e', 4)"
              value="e"
            />
            {{ quiz.options.e }}
          </label>
          <br />
        </div>
      </div>
      <button class="btn" (click)="submit()">submit</button>
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
      .answer {
        display: flex;
        flex-direction: column;
      }

      .container {
        border-radius: 15px;
        box-shadow: 10px 5px 5px gray;
        background-color: red;
        margin: 20px;
        color: blue;
        padding: 20px;
      }

      .btn {
        border-radius: 4px;
        background-color: green;
        color: white;
        margin: 20px;
      }
      button {
        border-radius: 10px;
      }
    `,
  ],
})
export class QuizComponent implements OnInit, OnDestroy {
  quizs: any = [
    {
      question:
        'which policy protect employee from discriminatin against the member of a protected class',
      options: {
        a: 'equal opportunity policy',
        b: 'workplace health and safety',
        c: 'employee code of conduct',
        d: 'attendace, vacation and time-off policies',
        e: 'employee disciplinary action policy',
      },

      answer: 'a',
    },
    {
      question: 'which policy elaborates about health and safety of emplyees',
      options: {
        a: 'equal opportunity policy',
        b: 'workplace health and safety',
        c: 'employee code of conduct',
        d: 'attendace, vacation and time-off policies',
        e: 'employee disciplinary action policy',
      },
      answer: 'b',
    },
    {
      question:
        'which policy focus on the performance and behavior of employee',
      options: {
        a: 'equal opportunity policy',
        b: 'workplace health and safety',
        c: 'employee code of conduct',
        d: 'attendace, vacation and time-off policies',
        e: 'employee disciplinary action policy',
      },
      answer: 'c',
    },
    {
      question: 'which policy do you refer if you want some time off from work',
      options: {
        a: 'equal opportunity policy',
        b: 'workplace health and safety',
        c: 'employee code of conduct',
        d: 'attendace, vacation and time-off policies',
        e: 'employee disciplinary action policy',
      },
      answer: 'd',
    },
    {
      question:
        'which policy hold the employee accountable if they fail to follow the companies policies',
      options: {
        a: 'equal opportunity policy',
        b: 'workplace health and safety',
        c: 'employee code of conduct',
        d: 'attendace, vacation and time-off policies',
        e: 'employee disciplinary action policy',
      },
      answer: 'e',
    },
  ];
  subscription!: Subscription;
  score: Iscore = { quizScore: 100 };
  email: string = '';
  constructor(
    private collectionService: CollectionService,
    private router: Router,
    private stateService: StateService,
    private toaster: ToastrService
  ) {
    this.subscription = this.stateService.state
      .pipe(
        map((res) => res.email),
        mergeMap((email) => (this.email = email))
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  handleAnswer(answer: string, questionNumber: number) {
    let word = questionNumber;
    console.log(answer, 'answer', this.quizs[questionNumber], questionNumber);
    if (answer === this.quizs[questionNumber].answer) {
      this.score.quizScore++;
      console.log(this.score, 'score');
    }
  }
  submit() {
    this.collectionService.updateScore(this.email, this.score);
    this.toaster.success(`congratulation, the score is submitted successfully`);
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
