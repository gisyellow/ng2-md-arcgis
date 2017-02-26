"use strict";
var testing_1 = require("@angular/core/testing");
var http_1 = require("@angular/http");
var point_component_1 = require("../../../../app/components/point/point.component");
var map_service_1 = require("../../../../app/services/map.service");
var data_service_1 = require("../../../../app/services/data.service");
var socket_service_1 = require("../../../../app/services/socket.service");
var icon_registry_1 = require("@angular2-material/icon/icon-registry");
var socket_service_mock_1 = require("../../../mocks/socket.service.mock");
var http_mock_1 = require("../../../mocks/http.mock");
var point_1 = require("../../../../app/models/point");
var geolocation_service_mock_1 = require("../../../mocks/geolocation.service.mock");
var geolocation_service_1 = require("../../../../app/services/geolocation.service");
describe('Point Component', function () {
    var mapService;
    var http;
    var point;
    beforeEach(function () { return testing_1.addProviders([
        {
            provide: socket_service_1.SocketService,
            useValue: new socket_service_mock_1.SocketServiceMock()
        },
        {
            provide: geolocation_service_1.GeolocationService,
            useValue: new geolocation_service_mock_1.GeolocationServiceMock()
        },
        {
            provide: http_1.Http,
            useValue: new http_mock_1.HttpMock()
        },
        data_service_1.DataService,
        point_component_1.PointComponent,
        map_service_1.MapService,
        icon_registry_1.MdIconRegistry
    ]); });
    beforeEach(testing_1.inject([map_service_1.MapService, http_1.Http], function (map, httpMock) {
        mapService = map;
        http = httpMock;
        point = new point_1.Point();
        point.firstName = 'Peter';
        point.email = 'peter@email.com';
        http.setReturnedData(point);
    }));
    it('Open Point component', testing_1.async(testing_1.inject([testing_1.TestComponentBuilder], function (tcb) {
        return tcb
            .createAsync(point_component_1.PointComponent)
            .then(function (fixture) {
            var nativeElement = fixture.elementRef.nativeElement;
            nativeElement.style.display = 'none';
            fixture.detectChanges();
            expect(fixture.componentInstance.hiddenComponent).toBe(true);
            fixture.componentInstance.point = point;
            mapService.mapClickNext({ isPointClicked: true });
            expect(fixture.componentInstance.hiddenComponent).toBe(false);
            expect(nativeElement.innerHTML.match('peter@email\.com')).toBe(null);
            nativeElement.querySelector('#private-data-but').click();
            fixture.detectChanges();
            expect(nativeElement.innerHTML.match('peter@email\.com')[0]).toBe('peter@email\.com');
        });
    })));
    it('Private data is hidden', testing_1.async(testing_1.inject([testing_1.TestComponentBuilder], function (tcb) {
        return tcb
            .createAsync(point_component_1.PointComponent)
            .then(function (fixture) {
            fixture.detectChanges();
            var nativeElement = fixture.elementRef.nativeElement;
            nativeElement.style.display = 'none';
            fixture.componentInstance.point = point;
            mapService.mapClickNext({ isPointClicked: true });
            expect(nativeElement.innerHTML.match('peter@email\.com')).toBe(null);
            nativeElement.querySelector('#private-data-but').click();
            fixture.detectChanges();
            expect(nativeElement.innerHTML.match('peter@email\.com')[0]).toBe('peter@email\.com');
        });
    })));
});
//# sourceMappingURL=point.component.spec.js.map