import {NgModule} from '@angular/core';

import {
  MatMenuModule
} from '@angular/material/menu';

import {
  MatButtonToggleModule
} from '@angular/material/button-toggle';

import {
  MatSidenavModule
} from '@angular/material/sidenav';

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatIconModule
} from '@angular/material/icon';

import {
  MatListModule
} from '@angular/material/list';

import {
  MatDialogModule
} from '@angular/material/dialog';

import {
  MatTreeModule
} from '@angular/material/tree';

import {
  MatCheckboxModule
} from '@angular/material/checkbox';

import {
  MatFormFieldModule  
} from '@angular/material/form-field';


import {
  MatInputModule  
} from '@angular/material/input';

import {
  MatCardModule  
} from '@angular/material/card';

import {
  MatRadioModule  
} from '@angular/material/radio';


import {
  MatTooltipModule  
} from '@angular/material/tooltip';

import {
  MatProgressSpinnerModule  
} from '@angular/material/progress-spinner';

import {
  MatExpansionModule  
} from '@angular/material/expansion';

import {
  MatTabsModule
} from '@angular/material/tabs';

import {
  MatTableModule
} from '@angular/material/table';

import {
  MatProgressBarModule
} from '@angular/material/progress-bar'

@NgModule({
  exports: [
    MatProgressBarModule, 
    MatTabsModule,
    MatTableModule,
    MatTooltipModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatCardModule,
    MatInputModule, 
    MatFormFieldModule,
    MatCheckboxModule,
    MatTreeModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonToggleModule
    
  ]
})
export class DemoMaterialModule {}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */