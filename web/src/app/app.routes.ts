import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FileListComponent } from './file-list/file-list.component';

export const ROUTES: Routes = [
  {
    path: 'files',
    component: FileListComponent,
  },
  {
    path: 'home', 
    component : HomeComponent
  },
  {
    path: '', 
    component : HomeComponent
  },
];
