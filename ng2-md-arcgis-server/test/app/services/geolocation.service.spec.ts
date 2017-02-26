/**
 * Created by najorcruzcruz on 11/7/16.
 */


import { GeolocationService } from '../../../app/services/geolocation.service';

import { inject } from '@angular/core/testing';
import { HTTP_PROVIDERS } from '@angular/http';
import { addProviders } from '@angular/core/testing';
import 'rxjs/add/operator/toPromise';

describe('Geolocation Service', () => {

    let geolocationService: GeolocationService;

    beforeEach(() => addProviders([
        HTTP_PROVIDERS, GeolocationService
    ]));

    beforeEach(inject([GeolocationService], (geo: GeolocationService) => {
        geolocationService = geo;
    }));

    it('Get geographical location', (done: Function) => {
        geolocationService.getLocation().then((coords: any) => {
            expect(coords).toBeDefined();
            expect(coords.latitude).toBeDefined();
            expect(coords.longitude).toBeDefined();
            done();
        }).catch((error: any) => {
            fail(error);
            done();
        });
    }, 20000);

    it('Get IP address', (done: Function) => {
        geolocationService.getIpAddress()
            .then((ip: string) => {
                expect(ip).toBeDefined();
                expect(ip).toMatch(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
                done();
            })
            .catch((error: Error) => {
                fail(error);
                done();
            });
    }, 10000);
});