import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TASKS } from '@my-workspace/shared-ui'


@Component({
  selector: 'lib-tasks',
  imports: [],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tasks {
  tasks = TASKS
}
