import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewUserComponent } from './new-user/new-user.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { ListUserComponent } from './list-user/list-user.component';
import { NewUserService } from './new-user/new-user.service';
import { ListUserService } from './list-user/list-user.service';
import { AddDocumentService } from './add-document/add-document.service';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';


@NgModule({
  declarations: [
    AppComponent,
    NewUserComponent,
    AddDocumentComponent,
    ListUserComponent,
    FileSelectDirective,
    FileDropDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    NewUserService,
    ListUserService,
    AddDocumentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
