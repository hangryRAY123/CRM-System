export enum TabKeys {
  ALL = 'all',
  COMPLETED = 'completed',
  INWORK = 'inWork',
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

export type AuthData = {
  login: string;
  password: string;
};

export type ProfileRequest = Partial<{
  username: string;
  email: string;
  phoneNumber: string;
}>;

export enum Roles {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  USER = 'USER',
}

export type User = {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: Roles[];
  phoneNumber: string;
};

export type UserRegistration = {
  email: string;
  login: string;
  password: string;
  phoneNumber: string;
  username: string;
};

export type Sort = Partial<{
  isBlocked: string;
  search: string;
  offset: number;
  sortBy: string;
  sortOrder: string;
}>;

export type State = {
  notifications: { error: string; success: string };
  auth: {
    isAuth: boolean;
    isAdmin: boolean;
    isCollapsed: boolean;
  };
  user: {
    isLoading: boolean;
    sort: Sort;
  };
};

export interface Component {
  id: number;
  type: "Header" | "Footer" | "Menu" | "ColumnBlock" | "ImageBlock";
  text?: string;
  url?: string;
}

export interface DraggableItemTypes {
  type: string;
  name: string;
}


export type PasswordRequest = string;

export type AccessToken = string;

export type RefreshToken = string;
