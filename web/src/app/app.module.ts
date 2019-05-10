import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules} from "@angular/router";
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { DataListModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';

import { AppComponent } from './app.component';
import { FileListComponent } from './file-list/file-list.component';
import { ROUTES } from './app.routes';

import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faTrash, faBell } from '@fortawesome/free-solid-svg-icons'

@NgModule({
  declarations: [
    AppComponent,
    FileListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule,
    HttpModule,HttpClientModule,
    FileUploadModule,
    DataListModule,
    DropdownModule,
    FontAwesomeModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule 
{ 
  constructor()
  {
    library.add( faPlay, faTrash, faBell );
  }
}
