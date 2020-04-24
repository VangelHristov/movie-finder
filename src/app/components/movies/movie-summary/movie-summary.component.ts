import {Component, Input} from '@angular/core';
import {Movie} from '../../../models/movie';

@Component({
    selector: 'app-movie',
    templateUrl: './movie-summary.component.html',
    styleUrls: ['./movie-summary.component.css']
})
export class MovieSummaryComponent {
    @Input() movie: Movie;

    constructor() {
    }
}
