/**
 * Created by najorcruzcruz on 11/7/16.
 */

import { Injectable } from '@angular/core';
import { Point } from "../models/point";
import { Http } from "@angular/http";


@Injectable()
export class DataService {
    
    private BASE_REST_URL:string = 'http://localhost:3000/api/';

    constructor(private http: Http) {

    }

    getPoints(): Promise<Point[]> {
        return this.http.get(this.BASE_REST_URL + 'points')
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getPoint(id: string) {
        return this.http.get(this.BASE_REST_URL + `points/${id}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    savePoint(point: Point) {
        return this.http.post(this.BASE_REST_URL + 'points/', point)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    updatePoint(point: Point) {
        return this.http.put(this.BASE_REST_URL + `points/${point._id}`, point)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    deletePoint(point: Point) {
        return this.http.delete(this.BASE_REST_URL + `points/${point._id}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    handleError(error: Error) {
        console.error(error);
    }
}
