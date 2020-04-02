import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from '@app/core.module';
import { SharedModule } from '@shared/shared.module';
import { AdminContentLayoutComponent } from './layout/admin-content-layout/admin-content-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { PageLoginComponent } from './layout/page-login/page-login.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminContentLayoutComponent,
    ContentLayoutComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    PageLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // core & shared
    CoreModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
