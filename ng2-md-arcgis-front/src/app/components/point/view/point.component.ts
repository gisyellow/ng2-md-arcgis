/**
 * Created by najorcruzcruz on 12/7/16.
 */
import { Component, OnDestroy } from '@angular/core';
import { Point } from "../../../models/point";
import { Subscription } from "rxjs/Rx";
import { MapService } from "../../../services/map.service";
import { DataService } from "../../../services/data.service";
import { SocketService } from "../../../services/socket.service";

@Component({
    selector: 'my-point',
    templateUrl: 'point.component.html',
    styleUrls: ['point.component.css'],
    providers: [DataService, SocketService]
})

export class PointComponent implements OnDestroy {

    mapClickSubscribe: Subscription;
    onUpdatedPointSubscription: Subscription;
    onRemovedPointSubscription: Subscription;
    point: Point;
    error: string;

    hiddenComponent = true;

    constructor(private mapService: MapService, private dataService: DataService,
                private socketService: SocketService) {
        this.mapClickSubscribe = this.mapService.onMapClickObservable
            .subscribe((evt: any) => {
                if (evt.isPointClicked) {
                    this.error = undefined;
                    this.hiddenComponent = false;
                    this.dataService.getPoint(evt.pointId)
                        .then(returnedPoint => {
                            this.point = returnedPoint;
                        });
                }
            });

        this.onUpdatedPointSubscription = this.socketService.onUpdatedPointObservable
            .subscribe((updatedPoint: Point) => {
                if (this.point && updatedPoint._id === this.point._id) {
                    this.point = updatedPoint;
                }
            });

        this.onRemovedPointSubscription = this.socketService.onRemovedPointObservable
            .subscribe((removedPoint: Point) => {
                if (this.point && removedPoint._id === this.point._id) {
                    this.point = new Point();
                    this.error = 'Point has gone';
                }
            });
    }

    closePointComponent() {
        this.hiddenComponent = true;
    }

    ngOnDestroy() {
        this.mapClickSubscribe.unsubscribe();
        this.onUpdatedPointSubscription.unsubscribe();
        this.onRemovedPointSubscription.unsubscribe();
    }
}