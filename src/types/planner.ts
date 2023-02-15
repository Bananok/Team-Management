import { IProject } from './project';
import { User } from './user';

export interface AssigmentUser {
  userId: string;
  projectId: string;
  rate: number;
  expertize: string;
  dailyHours: number;
  startAt: string;
  endAt: string;
}

export interface PlannerUser {
  userId: string;
  defaultRate: number;
  defaultWeeklyCapacity: number;
  defaultExpertize: string;
  workDays: number[];
}

export interface NewPlannerUser extends User {
  stackItems: true;
  isProject: false;
}

export interface PlannerProject extends IProject {
  stackItems: true;
  isProject: true;
}
