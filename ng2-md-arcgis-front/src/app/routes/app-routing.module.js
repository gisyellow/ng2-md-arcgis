/**
 * Created by najorcruzcruz on 14/10/16.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var point_detail_component_1 = require("../components/point/detail/point-detail.component");
var main_component_1 = require("../components/main/main.component");
var APP_ROUTES = [
    {
        path: '',
        component: main_component_1.MainComponent
    },
    {
        path: 'point/detail/:id',
        component: point_detail_component_1.PointDetailComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(APP_ROUTES);
