/**
 * Created by najorcruzcruz on 11/7/16.
 */
import {
    PointFormComponent,
    CONTACT_NUMBER_PATTERN,
    EMAIL_PATTERN
} from '../../../../app/components/point/point-form.component';

import {
    inject,
    async,
    addProviders, fakeAsync,
} from '@angular/core/testing';

import {
    TestComponentBuilder,
    ComponentFixture,
} from '@angular/compiler/testing';

import { Point } from "../../../../app/models/point";
import { HttpMock } from "../../../mocks/http.mock";
import { SocketServiceMock } from "../../../mocks/socket.service.mock";
import { SocketService } from "../../../../app/services/socket.service";
import { Http } from "@angular/http";
import { DataService } from "../../../../app/services/data.service";
import { MapService } from "../../../../app/services/map.service";
import { MdIconRegistry } from "@angular2-material/icon/icon-registry";
import { GeolocationService } from "../../../../app/services/geolocation.service";
import { provideForms, disableDeprecatedForms } from "@angular/forms";
import { GeolocationServiceMock } from "../../../mocks/geolocation.service.mock";


describe('Point Form Component', () => {

    let mapService: MapService;
    let dataService: DataService;
    let http: HttpMock;
    let point: Point;

    beforeEach(() => addProviders([
        disableDeprecatedForms(),
        provideForms(),
        DataService,
        MapService,
        GeolocationService,
        MdIconRegistry,
        {
            provide: SocketService,
            useValue: new SocketServiceMock()
        },
        {
            provide: Http,
            useValue: new HttpMock()
        },
        {
            provide: GeolocationService,
            useValue: new GeolocationServiceMock()
        }
    ]));

    beforeEach(inject([MapService, DataService, Http], (map: MapService, ds: DataService, httpMock: HttpMock) => {
        mapService = map;
        dataService = ds;
        http = httpMock;

        spyOn(dataService, 'savePoint').and.callThrough();

        point = new Point();
        point.firstName = 'Peter';
        point.email = 'peter@email.com';
        http.setReturnedData(point);
    }));

    it('Contact Number Pattern', () => {
        const regExp = new RegExp(CONTACT_NUMBER_PATTERN);
        expectRegExp(regExp, '', false, 'Empty contact number');
        expectRegExp(regExp, '+99 999 9999 999', true, 'Correct Number');
        expectRegExp(regExp, '0099 999 9999 999', true, 'Correct Number');
        expectRegExp(regExp, '0199 999 9999 999', false, 'must start with + or 00');
        expectRegExp(regExp, '+99 9999 999 999', false, 'correct order');
    });

    it('Email Pattern', () => {
        const regExp = new RegExp(EMAIL_PATTERN);
        expectRegExp(regExp, '', false, 'Empty email');
        expectRegExp(regExp, 'foo@gmail.com', true, 'Correct email');
        expectRegExp(regExp, 'foo_other_foo@yahoo.com', true, 'Correct email');
    });


    function expectRegExp(regExp: RegExp, value: string, toBe: boolean, message?: string) {
        expect(regExp.test(value)).toBe(toBe, message ? `'${value}' ${message}` : '');
    }

    it('Open Point Form component', async(inject(
        [TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb
                .createAsync(PointFormComponent)
                .then((fixture) => {
                    fixture.detectChanges();
                    fixture.elementRef.nativeElement.style.display = 'none';

                    expect(fixture.componentInstance.hiddenForm).toBe(true, 'should be hidden');

                    mapService.mapClickNext({ isPointClicked: false });
                    fixture.componentInstance.validAddress = true;
                    fixture.detectChanges();

                    expect(fixture.componentInstance.hiddenForm).toBe(false, 'should be displayed');
                });
        })), 10000);

    it('Fill Point Form component', async(inject(
        [TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb
                .createAsync(PointFormComponent)
                .then((fixture) => {
                    fixture.elementRef.nativeElement.style.display = 'none';

                    let nativeElement = fixture.elementRef.nativeElement;

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

    function fillUpElement(element: Element, attribute: string, value: string) {
        let input = <HTMLInputElement>element.querySelector(`md-input[name="${attribute}"] input`);
        input.value = value;
    }
});