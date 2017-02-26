/**
 * Created by najorcruzcruz on 11/7/16.
 */
import {Injectable} from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { SocketService } from "./socket.service";

@Injectable()
export class MapService {

    private onMapClick = new Subject<any>();

    onMapClickObservable = this.onMapClick.asObservable();

    mapClickNext(evt: any) {
        this.onMapClick.next(evt);
    }

}