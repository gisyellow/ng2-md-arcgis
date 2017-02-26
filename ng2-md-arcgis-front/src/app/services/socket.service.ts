/**
 * Created by najorcruzcruz on 13/7/16.
 */
import * as io from "socket.io-client";
import { Subject } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { EMIT_NEW_POINT, EMIT_UPDATED_POINT, EMIT_REMOVED_POINT } from "../common/constants";
import { Point } from "../models/point";


@Injectable()
export class SocketService {

    socket: any;

    private onCreatedPoint = new Subject<any>();
    private onUpdatedPoint = new Subject<any>();
    private onRemovedPoint = new Subject<any>();

    onCreatedPointObservable = this.onCreatedPoint.asObservable();
    onUpdatedPointObservable = this.onUpdatedPoint.asObservable();
    onRemovedPointObservable = this.onRemovedPoint.asObservable();

    constructor() {
        this.socket = io('http://localhost:3000');

        this.socket.on(EMIT_NEW_POINT, (point: Point) => {
            this.onCreatedPoint.next(point);
        });

        this.socket.on(EMIT_UPDATED_POINT, (point: Point) => {
            this.onUpdatedPoint.next(point);
        });

        this.socket.on(EMIT_REMOVED_POINT, (point: Point) => {
            this.onRemovedPoint.next(point);
        });
    }
}