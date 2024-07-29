import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimations(),
    provideToastr(), 
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),       
    provideRouter(routes),provideHttpClient()
  ]
};

