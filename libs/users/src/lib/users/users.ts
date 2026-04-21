import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { USERS } from '@my-workspace/shared-ui'

@Component({
  selector: 'lib-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Users {
  users = USERS
  constructor(private router: Router){}
  expandedUsers: Record<number, boolean> = {}
  toggleDetails(id: number) {
    this.expandedUsers[id] = !this.expandedUsers[id]
  }
  getTasks(){
    this.router.navigate(['tasks'])
  }
}
