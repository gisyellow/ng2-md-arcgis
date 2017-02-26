/**
 * Created by najorcruzcruz on 9/7/16.
 */
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export declare type Params = {
    [key: string]: any;
};

export class ActivatedRouteMock extends ActivatedRoute {
    public params: Observable<Params>;
    observer: any;

    constructor() {
        super();
        this.params = Observable.create((observer:any) => {
            this.observer = observer;
        });
    }

    next(id:number) {
        this.observer.onNext(id);
    }
}
