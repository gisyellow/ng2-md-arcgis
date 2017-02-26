/**
 * Created by najorcruzcruz on 11/7/16.
 */
import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { Point } from '../../../models/point';
import { MapService } from '../../../services/map.service';
import { GeolocationService } from '../../../services/geolocation.service';
import { DataService } from "../../../services/data.service";
// import Response = Express.Response;
import { Subscription } from "rxjs";

export const CONTACT_NUMBER_PATTERN = '^(\\+|00)\\d{2}\\s\\d{3}\\s\\d{4}\\s\\d{3}$';
export const EMAIL_PATTERN = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$';

declare var ARCGIS_MODULE: any;

@Component({
    selector: 'point-form',
    templateUrl: 'point-form.component.html',
    styleUrls: ['point-form.component.css'],
    providers: [GeolocationService, DataService]
})

export class PointFormComponent implements OnDestroy, AfterViewInit {
    mapClickSubscribe: Subscription;
    formError: string;
    ip: string;

    point = new Point();
    hiddenForm = true;
    submitted = false;
    validAddress = false;
    host = window.location.href;

    constructor(private mapService: MapService, private geolocationService: GeolocationService,
                private dataService: DataService) {

        this.mapClickSubscribe = this.mapService.onMapClickObservable
            .subscribe((evt: any) => {
                if (!evt.isPointClicked) {
                    this.point = new Point();
                    this.resetForm();
                    this.point.ip = this.ip;

                    this.hiddenForm = false;
                    this.validAddress = false;
                    this.formError = undefined;

                    this.saveAddress(evt.mapPoint)
                        .then(() => {
                            this.validAddress = true;
                        })
                        .catch(() => {
                            this.formError = 'No valid selected address'
                        })
                }
            });

        this.geolocationService.getIpAddress()
            .then((ip: string) => {
                this.ip = ip;
            });
    }

    saveAddress(point: any) {
        return ARCGIS_MODULE.getAddress(point).then((response: any) => {
            this.point.address = response.address.Match_addr;
            this.point.latitude = response.location.latitude;
            this.point.longitude = response.location.longitude;
        })
    }

    cancel() {
        this.point = new Point();
        this.resetForm();
        this.closePointForm();
    }

    onSubmit() {
        this.dataService.savePoint(this.point)
            .then((point: any) => {
                this.submitted = true;
                this.point = point;
                this.resetForm();
            });
        return false;
    }

    resetForm() {
        let form: HTMLFormElement = <HTMLFormElement>document.querySelector('#point-form');
        if (form) {
            form.reset();
        }
    }

    closePointForm() {
        this.hiddenForm = true;
        this.submitted = false;
    }

    ngAfterViewInit() {
        // Workaround to Material implementation problem with pattern validator.
        if (window.document.querySelector('input[name="contactNumber"]')) {
            window.document.querySelector('input[name="contactNumber"]')
                .setAttribute('pattern', CONTACT_NUMBER_PATTERN);
            window.document.querySelector('input[name="email"]')
                .setAttribute('pattern', EMAIL_PATTERN);
        }
    }

    ngOnDestroy() {
        this.mapClickSubscribe.unsubscribe();
    }
}
