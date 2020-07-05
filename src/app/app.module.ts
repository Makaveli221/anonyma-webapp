
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from '@app/core.module';
import { SharedModule } from '@shared/shared.module';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { AccountLayoutComponent } from './layout/account-layout/account-layout.component';
import { PageAccessDeniedComponent } from './layout/page-access-denied/page-access-denied.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { ContentAuthComponent } from './layout/content-auth/content-auth.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ChatbotModule } from '@modules/front/chatbot/chatbot.module';
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    ContentAuthComponent,
    SidebarComponent,
    AccountLayoutComponent,
    PageAccessDeniedComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    // core & shared
    CoreModule,
    SharedModule,

    ChatbotModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
