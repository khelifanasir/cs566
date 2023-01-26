import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MainComponent } from './main.component';
import { AddComponent } from './add.component';
import { TrainingComponent } from './training.component';
import { QuizComponent } from './quiz.component';

@NgModule({
  declarations: [MainComponent, AddComponent, TrainingComponent, QuizComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'list', component: MainComponent },
      { path: 'add', component: AddComponent },
      { path: 'training', component: TrainingComponent },
      { path: 'quiz', component: QuizComponent },
    ]),
  ],
})
export class CollectionModule {}
