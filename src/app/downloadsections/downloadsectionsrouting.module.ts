import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadSectionsPage } from './downloadsections.page';

const routes: Routes = [
  {
    path: '',
    component:  DownloadSectionsPage 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadPageRoutingModule {}
