"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by najorcruzcruz on 11/7/16.
 */
/**
 * Created by najorcruzcruz on 11/7/16.
 */
var core_1 = require("@angular/core");
var point_1 = require("../../../models/point");
var data_service_1 = require("../../../services/data.service");
var browser_1 = require("@angular/platform-browser/src/facade/browser");
exports.CONTACT_NUMBER_PATTERN = '^(\\+|00)\\d{2}\\s\\d{3}\\s\\d{4}\\s\\d{3}$';
exports.EMAIL_PATTERN = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$';
var PointDetailComponent = (function () {
    function PointDetailComponent(dataService, route, router) {
        var _this = this;
        this.dataService = dataService;
        this.route = route;
        this.router = router;
        this.point = new point_1.Point();
        this.sub = this.route.params.subscribe(function (params) {
            var id = params['id'];
            _this.dataService.getPoint(id)
                .then(function (point) { return _this.point = point; });
        });
    }
    PointDetailComponent.prototype.onSubmit = function () {
        this.dataService.updatePoint(this.point)
            .then(function (point) {
            // this.router.navigate(['/']);
        });
    };
    PointDetailComponent.prototype.delete = function () {
        var _this = this;
        this.dataService.deletePoint(this.point)
            .then(function (point) {
            _this.router.navigate(['/']);
        });
    };
    PointDetailComponent.prototype.ngAfterViewInit = function () {
        // Workaround to Material design problem with pattern validator.
        if (browser_1.document.querySelector('input[name="contactNumber"]')) {
            browser_1.document.querySelector('input[name="contactNumber"]')
                .setAttribute('pattern', exports.CONTACT_NUMBER_PATTERN);
            browser_1.document.querySelector('input[name="email"]')
                .setAttribute('pattern', exports.EMAIL_PATTERN);
        }
    };
    PointDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    return PointDetailComponent;
}());
PointDetailComponent = __decorate([
    core_1.Component({
        selector: 'point-detail',
        templateUrl: 'point-detail.component.html',
        styleUrls: ['point-detail.component.css'],
        providers: [data_service_1.DataService]
    })
], PointDetailComponent);
exports.PointDetailComponent = PointDetailComponent;
