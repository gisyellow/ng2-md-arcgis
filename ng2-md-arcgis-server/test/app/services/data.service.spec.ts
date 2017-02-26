/**
 * Created by najorcruzcruz on 13/7/16.
 */

import { DataService } from "../../../app/services/data.service";
import { inject, } from '@angular/core/testing';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { addProviders } from '@angular/core/testing';
import { Point } from "../../../app/models/point";
import { HttpMock } from "../../mocks/http.mock";
import { GeolocationServiceMock } from "../../mocks/geolocation.service.mock";
import { GeolocationService } from "../../../app/services/geolocation.service";


describe('Data Service', () => {

    let dataService: DataService;
    let http: HttpMock;

    beforeEach(() => addProviders([
        HTTP_PROVIDERS, DataService,
        {
            provide: Http,
            useValue: new HttpMock()
        },
        {
            provide: GeolocationService,
            useValue: new GeolocationServiceMock()
        },
    ]));

    beforeEach(inject([DataService, Http], (ds: DataService, h: HttpMock) => {
        dataService = ds;
        http = h;
    }));


    it('Get points', (done: Function) => {
        http.setReturnedData([{firstName: 'FirstName'}]);

        dataService.getPoints()
            .then((points: Point[]) => {
                expect(points.length).toBe(1);
                expect(points[0].firstName).toBe('FirstName');
                done();
            })
            .catch((error: Error) => {
                done(error);
            })
    });

    it('Get point', (done: Function) => {
        http.setReturnedData({firstName: 'FirstName'});

        dataService.getPoint('someid')
            .then((point: Point) => {
                expect(point).toBeDefined();
                expect(point.firstName).toBe('FirstName');
                done();
            })
            .catch((error: Error) => {
                done(error);
            })
    });

    it('Save point', (done: Function) => {
        const point : Point = new Point();
        point.firstName = 'FirstName';

        http.setReturnedData(point);

        dataService.savePoint(point)
            .then((point: Point) => {
                expect(point).toBeDefined();
                expect(point.firstName).toBe('FirstName');
                done();
            })
            .catch((error: Error) => {
                done(error);
            })
    });

    it('Update point', (done: Function) => {
        const point : Point = new Point();
        point.firstName = 'FirstName';

        http.setReturnedData(point);

        dataService.updatePoint(point)
            .then((point: Point) => {
                expect(point).toBeDefined();
                expect(point.firstName).toBe('FirstName');
                done();
            })
            .catch((error: Error) => {
                done(error);
            })
    });

    it('Delete point', (done: Function) => {
        const point : Point = new Point();
        point.firstName = 'FirstName';

        http.setReturnedData(point);

        dataService.deletePoint(point)
            .then((point: Point) => {
                expect(point).toBeDefined();
                expect(point.firstName).toBe('FirstName');
                done();
            })
            .catch((error: Error) => {
                done(error);
            })
    });

});