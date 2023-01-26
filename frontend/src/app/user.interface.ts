// To authenticate and generate JWT
export interface IUser {
  email: string;
  fullname: string;
  quizScore: number;
  password: string;
  role: string;
}
export interface Iscore {
  quizScore: number;
}

// User's Goals
// export interface IGoal {
//   _id: string;
//   user_id: string; // from JWT, ObjectId()
//   title: string;
//   description: string;
//   deadline: number; // timestamp
//   steps: IStep[];
// }

// export interface IStep {
//   id: number;
//   title: string;
//   description: string;
//   status: string;
//   deadline: number; // timestamp
// }
