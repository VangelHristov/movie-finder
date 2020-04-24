import {Component} from '@angular/core';
import {ScrollableViewport} from '../../../utility/scrollable-viewport';
import {Movie} from '../../../models/movie';
import {ActivatedRoute, Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';
import {MoviesService} from '../../../services/movies.service';

@Component({
    selector: 'app-movies-list',
    templateUrl: './movies-list.component.html',
    styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent extends ScrollableViewport {
    movies: Movie[] = [];
    page = 1;
    path: string;

    constructor(
        private moviesService: MoviesService,
        route: ActivatedRoute,
        viewportScroller: ViewportScroller,
        router: Router
    ) {
        super(viewportScroller, router);
        this.path = route.snapshot.url.pop().path;
        this.getMovies();
    }

    getMovies() {
        switch (this.path) {
            case 'popular':
                return this.moviesService.getPopular(this.page++).subscribe(value => {
                    this.movies = this.movies.concat(value);
                });
            case 'in-theaters':
                return this.moviesService.getInTheaters(this.page++).subscribe(value => {
                    this.movies = this.movies.concat(value);
                });
        }
    }
}
