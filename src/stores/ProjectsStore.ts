import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction
} from 'mobx';

// Types
import { IProject } from 'types/project';

// API
import { addProject, getProjects } from 'api/projects';

// Utils
import { sortingByField } from 'utils/sorting';

type AvailableSort =
  | 'name'
  | 'startAt'
  | 'endAt'
  | 'manager'
  | 'contractStatus';

class ProjectsStore {
  @observable
  projects: IProject[] | null = null;

  @observable
  addedProject?: IProject;

  @observable
  loading: boolean = false;

  @observable
  query: string = '';

  @observable
  sort: AvailableSort = 'name';

  @observable
  sortDir: 1 | -1 = 1;

  constructor() {
    makeObservable(this);
  }

  @action
  setQuery = (query: string): void => {
    this.query = query;
  };

  @action
  setSort = (newSort: AvailableSort): void => {
    this.sortDir = (this.sort === newSort ? -this.sortDir : 1) as 1 | -1;
    this.sort = newSort;
  };

  @computed
  get filteredProjects(): IProject[] | null {
    if (!this.projects) {
      return null;
    }

    return sortingByField(
      this.projects.filter((project) =>
        project.name.toLowerCase().includes(this.query.toLowerCase())
      ),
      this.sort as keyof IProject,
      this.sortDir
    );
  }

  @action
  addProject = async (
    name: string,
    clientId: string,
    colour: string
  ): Promise<void> => {
    try {
      this.loading = true;

      const { data } = await addProject(name, clientId, colour);

      runInAction(() => {
        this.projects?.push(data.data);
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action
  loadProjects = async () => {
    try {
      this.loading = true;

      const { data } = await getProjects();

      runInAction(() => {
        this.projects = data.data;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}

const projectsStore = new ProjectsStore();

export default projectsStore;
