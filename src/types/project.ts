export interface IProject {
  id: string;
  name: string;
  startAt: string;
  endAt: string;
  hasActualContract: boolean;
  colour?: string;
  manager: string;
  clientId: string;
  contractStatus?: string;
  workStatus?: string;
  contractCurrency?: string;
  assignedHours?: number;
}

export interface IProjectsResponse {
  data: IProject[];
}

export enum ContractStatusVariant {
  approval = 'Approval',
  signing = 'Signing',
  archived = 'Archived',
  na = 'n/a'
}

export enum ColourProjectVariant {
  lightPurple = 'Light Purple',
  purple = 'Purple',
  orange = 'Orange',
  lightGreen = 'Light Green',
  green = 'Green',
  blue = 'Blue',
  red = 'Red',
  indigo = 'Indigo',
  yellow = 'Yellow'
}

export enum ColourCodeProjectVariant {
  lightPurple = '#C14EF8',
  purple = '#9B51E0',
  orange = '#F36D25',
  lightGreen = '#4CAF50',
  green = '#26A69A',
  blue = '#56CCF2',
  red = '#F50057',
  indigo = '#536DFE',
  yellow = '#FFB400'
}

export enum WorkStatusVariant {
  active = 'Active',
  onHold = 'On hold',
  archived = 'Archived',
  planned = 'Planned'
}
