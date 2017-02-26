/**
 * Created by najorcruzcruz on 14/10/16.
 */

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PointDetailComponent } from "../components/point/detail/point-detail.component";
import { MainComponent } from "../components/main/main.component";

const APP_ROUTES: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'point/detail/:id',
        component: PointDetailComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);