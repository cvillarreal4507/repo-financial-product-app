import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { ModalComponent } from './components/modal/modal.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';

const COMPONENTS = [
  ButtonComponent,
  InputComponent,
  ModalComponent,
  DropdownComponent,
  SkeletonComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ...COMPONENTS
  ]
})
export class SharedModule { }
