import {Component} from '@angular/core';
import {MovieDetails} from '../../../models/movie-details';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieTrailer} from '../../../models/movie-trailer';
import {ScrollableViewport} from '../../../utility/scrollable-viewport';
import {ViewportScroller} from '@angular/common';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.css']
})

export class MovieDetailsComponent extends ScrollableViewport {
    movieDetails: MovieDetails;
    trailers: MovieTrailer[] = [];

    constructor(route: ActivatedRoute, router: Router, viewportScroller: ViewportScroller) {
        super(viewportScroller, router);
        route.data.subscribe(data => {
            this.movieDetails = data.movieDetails;
            this.trailers = data.trailers.slice(0, 9);
        });
    }
}
