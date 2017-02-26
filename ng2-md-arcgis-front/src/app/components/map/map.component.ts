/**
 * Created by najorcruzcruz on 11/7/16.
 */
import { Component, AfterContentInit, OnDestroy, AfterViewInit } from '@angular/core';
import { GeolocationService } from '../../services/geolocation.service';
import { MapService } from '../../services/map.service';
import { DataService } from "../../services/data.service";
import { Point } from "../../models/point";
import { SocketService } from "../../services/socket.service";
import { Subscription } from "rxjs/Rx";
import { document, MouseEvent } from "@angular/platform-browser/src/facade/browser";

declare var ARCGIS_MODULE: any;

@Component({
    selector: 'my-map',
    templateUrl: 'map.component.html',
    providers: [GeolocationService, DataService, SocketService]
})

export class MapComponent implements AfterViewInit, OnDestroy {

    idMapElement = 'viewDiv';
    onRemovedPointSubscription: Subscription;
    onCreatedPointSubscription: Subscription;

    constructor(private geolocationService: GeolocationService, private mapService: MapService,
                private dataservice: DataService, private socketService: SocketService) {

        this.onRemovedPointSubscription = this.socketService.onRemovedPointObservable
            .subscribe((point: Point) => {
                ARCGIS_MODULE.removePoint(point);
            });

        this.onCreatedPointSubscription = this.socketService.onCreatedPointObservable
            .subscribe((point: Point) => {
                ARCGIS_MODULE.addPoint([point]);
            });
    }

    ngAfterViewInit() {
        let intervalId;
        intervalId = setInterval(() => {
            if (window['ARCGIS_MODULE'] !== undefined) {
                clearInterval(intervalId);
                this.initArcGis();
            }
        }, 100);
    }

    private initArcGis() {
        ARCGIS_MODULE.init(this.idMapElement, () => {
            this.dataservice.getPoints()
                .then((points: any) => {
                    ARCGIS_MODULE.addPoint(points);
                });

            let opts = {
                onClick: (evt: any) => {
                    evt.isPointClicked = this.isClickInsidePoint(evt);
                    if (evt.isPointClicked) {
                        this.findPointId(evt);
                    } else {
                        this.mapService.mapClickNext(evt);
                    }
                },
                coords: {}
            };

            this.geolocationService.getLocation()
                .then((coords: any) => {
                    opts.coords = coords;
                    ARCGIS_MODULE.load(opts);
                }).catch((error: any) => {
                ARCGIS_MODULE.load(opts);
            });
        });
    }

    findPointId(evt: any) {
        let interval = setInterval(() => {
            let element = document.querySelector('point-id');
            if (element && element.innerHTML.trim().length > 0) {
                clearInterval(interval);
                evt.pointId = element.innerHTML;
                this.closePopupArcGis();
                this.mapService.mapClickNext(evt);
            }
        }, 500);
    }

    closePopupArcGis() {
        document.querySelector('.esri-close-icon').dispatchEvent(new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        }))
    }

    isClickInsidePoint(evt: any) {
        let points: any = document.querySelectorAll('image');
        for (let i = 0, len = points.length; i < len; i++) {
            if (evt.center.x >= points[i].getBoundingClientRect().left &&
                evt.center.x <= points[i].getBoundingClientRect().right &&
                evt.center.y >= points[i].getBoundingClientRect().top &&
                evt.center.y <= points[i].getBoundingClientRect().bottom) {
                return true;
            }
        }
        return false;
    }

    ngOnDestroy() {
        this.onRemovedPointSubscription.unsubscribe();
        this.onCreatedPointSubscription.unsubscribe();
    }
}
