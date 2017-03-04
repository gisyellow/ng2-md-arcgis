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
var core_1 = require("@angular/core");
var point_1 = require("../../../models/point");
var geolocation_service_1 = require("../../../services/geolocation.service");
var data_service_1 = require("../../../services/data.service");
exports.CONTACT_NUMBER_PATTERN = '^(\\+|00)\\d{2}\\s\\d{3}\\s\\d{4}\\s\\d{3}$';
exports.EMAIL_PATTERN = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$';
var PointFormComponent = (function () {
    function PointFormComponent(mapService, geolocationService, dataService) {
        var _this = this;
        this.mapService = mapService;
        this.geolocationService = geolocationService;
        this.dataService = dataService;
        this.point = new point_1.Point();
        this.hiddenForm = true;
        this.submitted = false;
        this.validAddress = false;
        this.host = window.location.href;
        this.mapClickSubscribe = this.mapService.onMapClickObservable
            .subscribe(function (evt) {
            if (!evt.isPointClicked) {
                _this.point = new point_1.Point();
                _this.resetForm();
                _this.point.ip = _this.ip;
                _this.hiddenForm = false;
                _this.validAddress = false;
                _this.formError = undefined;
                _this.saveAddress(evt.mapPoint)
                    .then(function () {
                    _this.validAddress = true;
                })
                    .catch(function () {
                    _this.formError = 'No valid selected address';
                });
            }
        });
        this.geolocationService.getIpAddress()
            .then(function (ip) {
            _this.ip = ip;
        });
    }
    PointFormComponent.prototype.saveAddress = function (point) {
        var _this = this;
        return ARCGIS_MODULE.getAddress(point).then(function (response) {
            _this.point.address = response.address.Match_addr;
            _this.point.latitude = response.location.latitude;
            _this.point.longitude = response.location.longitude;
        });
    };
    PointFormComponent.prototype.cancel = function () {
        this.point = new point_1.Point();
        this.resetForm();
        this.closePointForm();
    };
    PointFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.dataService.savePoint(this.point)
            .then(function (point) {
            _this.submitted = true;
            _this.point = point;
            _this.resetForm();
        });
        return false;
    };
    PointFormComponent.prototype.resetForm = function () {
        var form = document.querySelector('#point-form');
        if (form) {
            form.reset();
        }
    };
    PointFormComponent.prototype.closePointForm = function () {
        this.hiddenForm = true;
        this.submitted = false;
    };
    PointFormComponent.prototype.ngAfterViewInit = function () {
        // Workaround to Material implementation problem with pattern validator.
        if (window.document.querySelector('input[name="contactNumber"]')) {
            window.document.querySelector('input[name="contactNumber"]')
                .setAttribute('pattern', exports.CONTACT_NUMBER_PATTERN);
            window.document.querySelector('input[name="email"]')
                .setAttribute('pattern', exports.EMAIL_PATTERN);
        }
    };
    PointFormComponent.prototype.ngOnDestroy = function () {
        this.mapClickSubscribe.unsubscribe();
    };
    return PointFormComponent;
}());
PointFormComponent = __decorate([
    core_1.Component({
        selector: 'point-form',
        templateUrl: 'point-form.component.html',
        styleUrls: ['point-form.component.css'],
        providers: [geolocation_service_1.GeolocationService, data_service_1.DataService]
    })
], PointFormComponent);
exports.PointFormComponent = PointFormComponent;
