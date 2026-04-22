import { Route } from '@angular/router';
import { Users } from '../users/users';
import { ProfileTasks } from '../profile-tasks/profile-tasks';
export const remoteRoutes: Route[] = [
    { path: '', component: Users },
    { path: 'profile-tasks/:id', component: ProfileTasks }
];
