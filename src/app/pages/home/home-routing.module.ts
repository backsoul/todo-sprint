import { StadisticsComponent } from './components/stadistics/stadistics.component';
import { LayoutComponent } from 'src/app/shared/components/layout/layout.component';
import { HomeComponent } from './components/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'stadistics',
        component: StadisticsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
