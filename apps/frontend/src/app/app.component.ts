import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { PageLoaderComponent } from './shared/page-loader.component';

@Component({
    imports: [
        CommonModule,
        PageLoaderComponent,
        RouterModule,
    ],
    selector: 'app-root',
    template: `@if (isAuth0Loading$ | async) {
  <div
    class="page-layout"
    >
    <app-page-loader></app-page-loader>
  </div>
} @else {
  <router-outlet></router-outlet>
}
`,
    styles: ''
})
export class AppComponent {
  private readonly authService = inject(AuthService);
  isAuth0Loading$ = this.authService.isLoading$;
}
