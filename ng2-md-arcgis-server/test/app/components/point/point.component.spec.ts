import {
    inject, async, TestComponentBuilder, setBaseTestProviders, addProviders, resetBaseTestProviders, fakeAsync
} from "@angular/core/testing";


import { Http } from "@angular/http";
import { PointComponent } from "../../../../app/components/point/point.component";
import { MapService } from "../../../../app/services/map.service";
import { DataService } from "../../../../app/services/data.service";
import { SocketService } from "../../../../app/services/socket.service";
import { MdIconRegistry } from "@angular2-material/icon/icon-registry";
import { SocketServiceMock } from "../../../mocks/socket.service.mock";
import { HttpMock } from "../../../mocks/http.mock";
import { Point } from "../../../../app/models/point";
import { GeolocationServiceMock } from "../../../mocks/geolocation.service.mock";
import { GeolocationService } from "../../../../app/services/geolocation.service";

describe('Point Component', () => {

    let mapService: MapService;
    let http: HttpMock;
    let point: Point;

    beforeEach(() => addProviders([
        {
            provide: SocketService,
            useValue: new SocketServiceMock()
        },
        {
            provide: GeolocationService,
            useValue: new GeolocationServiceMock()
        },
        {
            provide: Http,
            useValue: new HttpMock()
        },
        DataService,
        PointComponent,
        MapService,
        MdIconRegistry
    ]));

    beforeEach(inject([MapService, Http], (map: MapService, httpMock: HttpMock) => {
        mapService = map;
        http = httpMock;

        point = new Point();
        point.firstName = 'Peter';
        point.email = 'peter@email.com';
        http.setReturnedData(point);
    }));


    it('Open Point component', async(inject(
        [TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb
                .createAsync(PointComponent)
                .then((fixture) => {
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


    it('Private data is hidden', async(inject(
        [TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb
                .createAsync(PointComponent)
                .then((fixture) => {
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