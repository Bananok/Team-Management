import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction
} from 'mobx';

// Types
import { IClient } from '../types/client';

// API
import { getClients } from '../api/clients';

// Utils
import { sortingByField } from '../utils/sorting';

type AvailableSort = 'legalName' | 'contactPerson' | 'email';

class ClientsStore {
  @observable
  clients: IClient[] | [] = [];

  @observable
  loading: boolean = false;

  @observable
  query: string = '';

  @observable
  sort: AvailableSort = 'legalName';

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
  get filteredClients(): IClient[] {
    return sortingByField(
      this.clients.filter((client) =>
        client.legalName.toLowerCase().includes(this.query.toLowerCase())
      ),
      this.sort as keyof IClient,
      this.sortDir
    );
  }

  @action
  loadClients = async (): Promise<void> => {
    try {
      this.loading = true;

      const { data } = await getClients();

      runInAction(() => {
        this.clients = data.data;
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

const clientStore = new ClientsStore();

export default clientStore;
