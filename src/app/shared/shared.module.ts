import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    LayoutComponent,
    DialogComponent,
  ],
  imports: [CommonModule, RouterModule, MatDialogModule, FormsModule],
  exports: [FooterComponent, NavbarComponent, LayoutComponent],
})
export class SharedModule {}
