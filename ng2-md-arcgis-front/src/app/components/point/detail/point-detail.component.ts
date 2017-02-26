/**
 * Created by najorcruzcruz on 11/7/16.
 */
/**
 * Created by najorcruzcruz on 11/7/16.
 */
import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { Point } from '../../../models/point';
import { Subscription } from "rxjs/Rx";
import { DataService } from "../../../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { document } from "@angular/platform-browser/src/facade/browser";

export const CONTACT_NUMBER_PATTERN = '^(\\+|00)\\d{2}\\s\\d{3}\\s\\d{4}\\s\\d{3}$';
export const EMAIL_PATTERN = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$';

declare var ARCGIS_MODULE: any;

@Component({
    selector: 'point-detail',
    templateUrl: 'point-detail.component.html',
    styleUrls: ['point-detail.component.css'],
    providers: [DataService]
})

export class PointDetailComponent implements OnDestroy, AfterViewInit {
    sub: Subscription;
    point = new Point();

    constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
        this.sub = this.route.params.subscribe(params => {
            let id = params['id'];
            this.dataService.getPoint(id)
                .then(point => this.point = point);
        });
    }

    onSubmit() {
        this.dataService.updatePoint(this.point)
            .then(point => {
                // this.router.navigate(['/']);
            });
    }

    delete() {
        this.dataService.deletePoint(this.point)
            .then(point => {
                this.router.navigate(['/']);
            });
    }

    ngAfterViewInit() {
        // Workaround to Material design problem with pattern validator.
        if (document.querySelector('input[name="contactNumber"]')) {
            document.querySelector('input[name="contactNumber"]')
                .setAttribute('pattern', CONTACT_NUMBER_PATTERN);
            document.querySelector('input[name="email"]')
                .setAttribute('pattern', EMAIL_PATTERN);
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
