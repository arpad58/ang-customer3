import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerEditorComponent } from './page/customer-editor/customer-editor.component';
import { CustomerListComponent } from './page/customer-list/customer-list.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent
  },
  {
    path: 'customer-editor',
    component: CustomerEditorComponent,
  },
  {
    path: '**',
    component: CustomerListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
