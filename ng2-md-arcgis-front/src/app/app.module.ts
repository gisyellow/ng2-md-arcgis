/**
 * Created by najorcruzcruz on 14/10/16.
 */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { routing } from './routes/app-routing.module';

import { MapComponent } from "./components/map/map.component";
import { PointFormComponent } from "./components/point/form/point-form.component";
import { PointDetailComponent } from "./components/point/detail/point-detail.component";
import { PointComponent } from "./components/point/view/point.component";
import { MapService } from "./services/map.service";
import { AppComponent } from "./components/app.component";
import { MainComponent } from './components/main/main.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        MaterialModule,
        routing
    ],
    declarations: [
        AppComponent,
        PointFormComponent,
        PointDetailComponent,
        PointComponent,
        MapComponent,
        MainComponent
    ],
    providers: [
        MapService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
