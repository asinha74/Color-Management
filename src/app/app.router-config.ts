import { HomeComponent } from "app/home/home.component";
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { GridComponent } from "app/grid/grid.component";



export const routerConfig: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'grid',
        component: GridComponent
    },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
        routerConfig, {
        //enableTracing: true
    })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRouterConfig {
}
