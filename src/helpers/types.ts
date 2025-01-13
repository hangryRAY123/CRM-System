export enum TabKeys {
  tab1 = 'all',
  tab2 = 'completed',
  tab3 = 'inWork',
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
