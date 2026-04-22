import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'tasks',
    loadChildren: () => import('tasksApp/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'users',
    loadChildren: () => import('usersApp/Routes').then((m) => m!.remoteRoutes),
  },
];
