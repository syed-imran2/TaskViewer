import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'tasks',
    loadChildren: () =>
      import('@my-workspace/tasks').then((m) => m.tasksRoutes),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('@my-workspace/users').then((m) => m.usersRoutes),
  },
];
