import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from '@app/guard/auth.guard';
import { RoleGuard } from '@app/guard/role.guard';
import { NoAuthGuard } from '@app/guard/no-auth.guard';
import { throwIfAlreadyLoaded } from '@app/guard/module-import.guard';

import { TokenInterceptor } from '@app/interceptor/token.interceptor';
import { ErrorInterceptor } from '@app/interceptor/error.interceptor';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    NoAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
