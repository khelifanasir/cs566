import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ɵassignExtraOptionsToRouter } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, mergeMap, Subscription } from 'rxjs';
import { StateService } from '../state.service';
import { IUser } from '../user.interface';
import { CollectionService } from './collectin.service';
// import { GoalService } from './goal.service';

@Component({
  selector: 'app-list',
  template: `
    <div>
      <div class="container">
        Welcome to our company!!! please read the policy carefully and take the
        quiz
      </div>
      <p>
        List of company policies to consider creating Here are some of the
        policies that your company should consider putting in place:
      </p>
      <p>
        1. Equal opportunity policy Many countries mandate that you must be an
        equal opportunity employer by law. For example, in the United States,
        the U.S. Equal Employment Opportunity Commission enforces a wide range
        of federal laws that prohibit workplace discrimination. An equal
        opportunity policy (EOP) prevents companies from discriminating against
        job applicants or employees if they are a member of a protected class
        (e.g, race, gender, age, religion, familial status, color). The EOP is
        essential for any anti-harassment, workplace violence,
        non-discrimination or diversity policies your company may consider
        developing.
      </p>
      <p>
        2. Workplace health and safety It’s important to provide your employees
        with a safe and healthy work environment, especially since workplace
        health and safety violations can cause harm to your employees, cost your
        business money and damage your reputation. Your business should be
        proactive and write a health and safety policy that is designed for each
        workplace. For example, you might specify what employees should do in
        case of office emergencies or how to handle unsafe materials. The
        Occupational Safety and Health Administration (OSHA) has guidelines on
        how to create a safe workplace and protect workers from occupational
        hazards that you can base your policy on.
      </p>
      <p>
        3. Employee code of conduct policy A clear and concise code of conduct
        can help employees understand your r expectations in terms of
        performance and behavior. This policy might include specific rules
        related to substance abuse, sexual harassment, giving gifts, dress code,
        confidentiality, and even the use of cell phones or social media during
        work hours. Misunderstandings may still occur, but at least employees
        have something to refer to if they’re unsure about what your
        expectations are. Here’s an example of a policy you could include in
        your code of conduct regarding employee discrimination and harassment:
        WMB Company is committed to eradicating discrimination and unlawful
        harassment in our workplaces. Any actions, jokes or comments based on an
        employee or client’s race, religion ethnicity, sex, age or any other
        legally protected class are not tolerated and will be met with
        significant disciplinary action.
      </p>
      <p>
        4. Attendance, vacation and time-off policies Having a standard way to
        request a day off or take vacation leave will help things run more
        smoothly in the office. A PTO policy should outline how much time off
        employees receive, when and how they can accrue more time off, who they
        should contact to request their time off and anything else they may need
        to know about taking PTO (e.g., is vacation use-it-or-lose-it?). Other
        time off policies to consider creating include parental leave policies
        and bereavement leave policies. You can also choose to create a separate
        attendance policy or no call no show policy that outlines what is
        considered tardy, how far in advance they should request time off and
        what happens if they don’t show up for work. Here’s an example of a
        company attendance policy you can use to help write your own: Employees
        are expected to be on time and regular in attendance. This means being
        at your workspace and ready to work at your scheduled time each day. You
        will be given a 10-minute grace period after the start of your shift
        before you will be considered tardy. Employees who are tardy on more
        than five occasions will be subject to disciplinary action. Absenteeism
        and tardiness are burdensome to your co-workers and leaders, and will
        not be tolerated without just cause.
      </p>
      <p>
        4. Employee disciplinary action policy Some of the most important
        company policies involve discipline and employee conduct. Before you can
        hold your employees accountable for their actions, it’s important to
        record your expectations in terms of performance and behavior in your
        employee handbook or individual employee contracts. With complete access
        to the rules and regulations of the workplace, you can then enforce
        disciplinary action when appropriate while using the employee handbook
        as a point of reference. A simple step-by-step list of what happens
        regarding disciplinary action can make it easy for employees to know
        what to expect if they violate a company policy. Describe a specific
        process you will follow to ensure every employee is treated fairly when
        it comes to discipline. Have a lawyer review this information before you
        include it in your employee handbook to make sure all disciplinary
        action is legal.
      </p>
      <p>
        6. Employee complaint policies Grievances are formal complaints your
        employees can file to document their concerns with an aspect of their
        workplace. These grievances might be filed as a result of an incident or
        conflict with a fellow employee. A grievance can be filed for nearly any
        reason, including physical workplace complaints, financial issues like
        payroll and social circumstances like harassment or bullying. It’s
        important to outline a formal process for resolving complaints within
        your company so that employees know how to handle their concerns in a
        professional way. It may also be a good idea to develop a
        non-retaliation policy to protect employees who make good faith
        complaints against their manager or co-workers.
      </p>
      <button id="btn" class="button is-primary" (click)="handleQuiz()">
        take a quiz
      </button>
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

      .container {
        border-radius: 15px;
        box-shadow: 10px 5px 5px gray;
        background-color: red;
        margin: 20px;
        color: blue;
        padding: 20px;
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
export class TrainingComponent implements OnInit, OnDestroy {
  constructor(
    private collectionService: CollectionService,
    private router: Router,
    private stateService: StateService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {}

  handleQuiz() {
    this.router.navigate(['', 'collections', 'quiz']);
  }

  ngOnDestroy(): void {}
}
