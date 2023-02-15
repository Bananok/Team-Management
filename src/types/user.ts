export enum UserRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER'
}

export enum WorkStatusVariant {
  active = 'Active',
  archived = 'Archived'
}

export enum LevelVariant {
  intern = 'Intern',
  junior = 'Junior',
  middle = 'Middle',
  highMiddle = 'High Middle',
  senior = 'Senior'
}

export enum ExpertizeVariant {
  pa = 'PA',
  qa = 'QA',
  design = 'Design',
  fullstack = 'Fullstack',
  frontend = 'Frontend',
  backend = 'Backend',
  flutter = 'Flutter',
  ios = 'IOS',
  android = 'Android'
}

export interface User {
  id: string;
  img?: string;
  createdAt?: string;
  updatedAt?: string;
  phone?: string;
  email: string;
  hasPlanner: boolean;
  role: string;
  name: string;
  workDays: number[];
  colour: string;
  defaultRate: number;
  status: WorkStatusVariant;
  defaultLevel: string;
  defaultLegalStatus: string;
  defaultWeeklyCapacity: number;
  defaultExpertize: string;
}
