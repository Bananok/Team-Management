import axios from 'api/helpers/axios';

// Types
import { IClient, IClientPatch } from '../types/client';

export interface IClientResponse {
  data: IClient[];
}

export interface IClientRequest {
  data: IClientPatch;
}

export const getClients = () => axios.get<IClientResponse>('/clients');

export const refreshClient = async (request: IClientPatch) =>
  axios.patch<IClientRequest>('/clients', request);
