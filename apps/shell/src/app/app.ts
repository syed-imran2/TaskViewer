import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App {
  protected title = 'shell';

  constructor(private router: Router) {}

  go(path: string) {
    this.router.navigate([path]);
  }

  isActive(path: string): boolean {
    const url = this.router.url;
    if (path === '') return url === '/';
    return url.startsWith('/' + path);
  }
}