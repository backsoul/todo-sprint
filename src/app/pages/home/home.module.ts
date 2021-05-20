import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StadisticsComponent } from './components/stadistics/stadistics.component';

@NgModule({
  declarations: [HomeComponent, StadisticsComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, DragDropModule],
})
export class HomeModule {}
