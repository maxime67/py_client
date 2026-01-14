import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <nav class="header-nav">
        <a class="logo" routerLink="/">🍿 Vidéothèque</a>
        <a class="nav-link" routerLink="/movies" routerLinkActive="active">
          Films
        </a>
      </nav>
    </header>
  `,
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class HeaderComponent {}
