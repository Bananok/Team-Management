import axios from 'api/helpers/axios';

// Types
import { IProject, IProjectsResponse } from 'types/project';

interface IProjectResponse {
  data: IProject;
}

export const getProjects = () => axios.get<IProjectsResponse>('/projects');

export const addProject = async (
  name: string,
  clientId: string,
  colour: string | undefined
) =>
  axios.post<IProjectResponse>('/projects', {
    name,
    clientId,
    colour
  });

export const refreshProject = async (request: IProject) =>
  axios.patch<IProjectResponse>('/projects/{projectId}', request);
