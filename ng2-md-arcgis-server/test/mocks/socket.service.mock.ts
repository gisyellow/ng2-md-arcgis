import { Subject } from "rxjs/Rx";
/**
 * Created by najorcruzcruz on 13/7/16.
 */


export class SocketServiceMock {

    private onCreatedPoint = new Subject<any>();
    private onUpdatedPoint = new Subject<any>();
    private onRemovedPoint = new Subject<any>();

    onCreatedPointObservable = this.onCreatedPoint.asObservable();
    onUpdatedPointObservable = this.onUpdatedPoint.asObservable();
    onRemovedPointObservable = this.onRemovedPoint.asObservable();

}