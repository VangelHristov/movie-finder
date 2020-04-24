import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css']
})
export class RatingComponent {
    @Input() vote: number;

    constructor() {
    }

    getFillColor(): string {
        return this.vote > 6 ? 'green' : this.vote > 3 ? 'orange' : 'red';
    }

}
