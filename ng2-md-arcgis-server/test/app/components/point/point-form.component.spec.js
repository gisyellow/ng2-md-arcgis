"use strict";
/**
 * Created by najorcruzcruz on 11/7/16.
 */
var point_form_component_1 = require('../../../../app/components/point/point-form.component');
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/compiler/testing');
var point_1 = require("../../../../app/models/point");
var http_mock_1 = require("../../../mocks/http.mock");
var socket_service_mock_1 = require("../../../mocks/socket.service.mock");
var socket_service_1 = require("../../../../app/services/socket.service");
var http_1 = require("@angular/http");
var data_service_1 = require("../../../../app/services/data.service");
var map_service_1 = require("../../../../app/services/map.service");
var icon_registry_1 = require("@angular2-material/icon/icon-registry");
var geolocation_service_1 = require("../../../../app/services/geolocation.service");
var forms_1 = require("@angular/forms");
var geolocation_service_mock_1 = require("../../../mocks/geolocation.service.mock");
describe('Point Form Component', function () {
    var mapService;
    var dataService;
    var http;
    var point;
    beforeEach(function () { return testing_1.addProviders([
        forms_1.disableDeprecatedForms(),
        forms_1.provideForms(),
        data_service_1.DataService,
        map_service_1.MapService,
        geolocation_service_1.GeolocationService,
        icon_registry_1.MdIconRegistry,
        {
            provide: socket_service_1.SocketService,
            useValue: new socket_service_mock_1.SocketServiceMock()
        },
        {
            provide: http_1.Http,
            useValue: new http_mock_1.HttpMock()
        },
        {
            provide: geolocation_service_1.GeolocationService,
            useValue: new geolocation_service_mock_1.GeolocationServiceMock()
        }
    ]); });
    beforeEach(testing_1.inject([map_service_1.MapService, data_service_1.DataService, http_1.Http], function (map, ds, httpMock) {
        mapService = map;
        dataService = ds;
        http = httpMock;
        spyOn(dataService, 'savePoint').and.callThrough();
        point = new point_1.Point();
        point.firstName = 'Peter';
        point.email = 'peter@email.com';
        http.setReturnedData(point);
    }));
    it('Contact Number Pattern', function () {
        var regExp = new RegExp(point_form_component_1.CONTACT_NUMBER_PATTERN);
        expectRegExp(regExp, '', false, 'Empty contact number');
        expectRegExp(regExp, '+99 999 9999 999', true, 'Correct Number');
        expectRegExp(regExp, '0099 999 9999 999', true, 'Correct Number');
        expectRegExp(regExp, '0199 999 9999 999', false, 'must start with + or 00');
        expectRegExp(regExp, '+99 9999 999 999', false, 'correct order');
    });
    it('Email Pattern', function () {
        var regExp = new RegExp(point_form_component_1.EMAIL_PATTERN);
        expectRegExp(regExp, '', false, 'Empty email');
        expectRegExp(regExp, 'foo@gmail.com', true, 'Correct email');
        expectRegExp(regExp, 'foo_other_foo@yahoo.com', true, 'Correct email');
    });
    function expectRegExp(regExp, value, toBe, message) {
        expect(regExp.test(value)).toBe(toBe, message ? "'" + value + "' " + message : '');
    }
    it('Open Point Form component', testing_1.async(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
        return tcb
            .createAsync(point_form_component_1.PointFormComponent)
            .then(function (fixture) {
            fixture.detectChanges();
            fixture.elementRef.nativeElement.style.display = 'none';
            expect(fixture.componentInstance.hiddenForm).toBe(true, 'should be hidden');
            mapService.mapClickNext({ isPointClicked: false });
            fixture.componentInstance.validAddress = true;
            fixture.detectChanges();
            expect(fixture.componentInstance.hiddenForm).toBe(false, 'should be displayed');
        });
    })), 10000);
    it('Fill Point Form component', testing_1.async(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
        return tcb
            .createAsync(point_form_component_1.PointFormComponent)
            .then(function (fixture) {
            fixture.elementRef.nativeElement.style.display = 'none';
            var nativeElement = fixture.elementRef.nativeElement;
            mapService.mapClickNext({ isPointClicked: false });
            fixture.componentInstance.validAddress = true;
            fixture.detectChanges();
            expect(fixture.componentInstance.submitted).toBe(false, 'not yet submitted');
            fillUpElement(nativeElement, 'firstName', 'FirstName');
            fillUpElement(nativeElement, 'lastName', 'FirstName');
            fillUpElement(nativeElement, 'email', 'name@name.com');
            fillUpElement(nativeElement, 'contactNumber', '+34 999 9999 999');
            nativeElement.querySelector('#save-but').click();
            fixture.detectChanges();
            expect(dataService.savePoint).toHaveBeenCalledTimes(1);
        });
    })), 10000);
    function fillUpElement(element, attribute, value) {
        var input = element.querySelector("md-input[name=\"" + attribute + "\"] input");
        input.value = value;
    }
});
//# sourceMappingURL=point-form.component.spec.js.map