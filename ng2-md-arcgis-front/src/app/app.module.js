"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by najorcruzcruz on 14/10/16.
 */
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var app_routing_module_1 = require("./routes/app-routing.module");
var map_component_1 = require("./components/map/map.component");
var point_form_component_1 = require("./components/point/form/point-form.component");
var point_detail_component_1 = require("./components/point/detail/point-detail.component");
var point_component_1 = require("./components/point/view/point.component");
var map_service_1 = require("./services/map.service");
var app_component_1 = require("./components/app.component");
var main_component_1 = require("./components/main/main.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            material_1.MaterialModule,
            app_routing_module_1.routing
        ],
        declarations: [
            app_component_1.AppComponent,
            point_form_component_1.PointFormComponent,
            point_detail_component_1.PointDetailComponent,
            point_component_1.PointComponent,
            map_component_1.MapComponent,
            main_component_1.MainComponent
        ],
        providers: [
            map_service_1.MapService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
