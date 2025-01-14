export enum TabKeys {
  all = 'all',
  completed = 'completed',
  inWork = 'inWork',
}

export type AllTask = {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
};

export type TasksInfo = {
  all: number;
  completed: number;
  inWork: number;
};

export type UserRegistration = {
  email: string;
  login: string;
  password: string;
  phoneNumber: string;
  username: string;
};

export type AuthData = {
  login: string;
  password: string;
};
