// Helpers
import axios from 'api/helpers/axios';

// Types
import { User } from 'types/user';
import { AssigmentUser, PlannerUser } from 'types/planner';
import { IProjectsResponse } from 'types/project';

export interface PlannerUserResponse {
  data: User[];
}

export interface PlannerAddingUserResponse {
  data: {
    userId: string;
    defaultRate: number;
    defaultWeeklyCapacity: number;
    defaultExpertize: string;
    workDays: number[];
  };
}

export interface AssignmentUserResponse {
  data: AssigmentUser;
}

export const getPlannerUsers = () =>
  axios.get<PlannerUserResponse>('/planner/users');

export const addPlannerUser = (plannerUserdata: PlannerUser) =>
  axios.post<PlannerAddingUserResponse>('/planner/users', plannerUserdata);

export const addPlannerAssignment = (assignmentData: AssigmentUser) =>
  axios.post<AssignmentUserResponse>(
    '/planner/users/assignment',
    assignmentData
  );
export const getPlannerUserProjects = (userId: string) =>
  axios.get<IProjectsResponse>(`/planner/users/${userId}/projects`);
