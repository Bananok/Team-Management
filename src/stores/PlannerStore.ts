import { action, makeObservable, observable } from 'mobx';

// API
import {
  addPlannerAssignment,
  addPlannerUser,
  getPlannerUserProjects,
  getPlannerUsers
} from 'api/planner';

// Types
import {
  PlannerUser,
  AssigmentUser,
  NewPlannerUser,
  PlannerProject
} from 'types/planner';

class PlannerStore {
  @observable
  users: (NewPlannerUser | PlannerProject)[] = [];

  @observable
  addedUser?: PlannerUser;

  @observable
  openedUsers: { userId: string; projectIds: string[] }[] = [];

  @observable
  assignment?: AssigmentUser;

  constructor() {
    makeObservable(this);
  }

  @action
  getPlannerUsers = async () => {
    try {
      const { data } = await getPlannerUsers();
      this.users = data.data.map((user) => {
        return {
          stackItems: true,
          isProject: false,
          ...user
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  @action
  addPlannerUser = async (plannerUser: PlannerUser) => {
    try {
      const { data } = await addPlannerUser(plannerUser);
      this.addedUser = data.data;
    } catch (error) {
      console.error(error);
    }
  };

  @action
  assignmentPlannerUser = async (assignmentData: AssigmentUser) => {
    try {
      const { data } = await addPlannerAssignment(assignmentData);

      this.assignment = data.data;
    } catch (error) {
      console.error(error);
    }
  };

  @action
  getPlannerUserProjects = async (userId: string) => {
    if (this.openedUsers.find((user) => user.userId === userId)) {
      this.openedUsers = this.openedUsers.filter(
        (user) => user.userId !== userId
      );
      return;
    }
    try {
      const { data } = await getPlannerUserProjects(userId);

      const userProjects: PlannerProject[] = data.data.map((project) => {
        return {
          stackItems: true,
          isProject: true,
          ...project
        };
      });
      this.openedUsers.push({
        userId,
        projectIds: userProjects.map((project) => project.id)
      });

      this.users.forEach((user, index) => {
        if (user.id === userId) {
          this.users.splice(index + 1, 0, ...userProjects);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
}

const plannerStore = new PlannerStore();

export default plannerStore;
