import {Component, Input} from '@angular/core';
import {MovieTrailer} from '../../../../models/movie-trailer';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-trailers',
    templateUrl: './trailers.component.html',
    styleUrls: ['./trailers.component.css']
})
export class TrailersComponent {
    @Input() trailers: MovieTrailer[];

    constructor(public sanitizer: DomSanitizer) {
    }
}
