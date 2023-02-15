import axios from 'api/helpers/axios';
import { User } from 'types/user';

// Types
import { IMemberPatch } from 'types/member';

export interface IMemberResponse {
  data: User[];
}

export interface IMemberRequest {
  data: IMemberPatch;
}

export const getMembers = () => axios.get<IMemberResponse>('/profile/all');
export const refreshMember = async (request: IMemberPatch) =>
  axios.patch<IMemberRequest>('/profile', request);
