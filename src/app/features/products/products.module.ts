import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';

import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'add',
    component: FormComponent
  },
  {
    path: 'edit/:id',
    component: FormComponent
  }
];

@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    ContextMenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
