import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {Observable} from 'rxjs';
import {MovieTrailer} from '../models/movie-trailer';

@Injectable({
    providedIn: 'root'
})
export class MovieTrailerResolver implements Resolve<MovieTrailer[]> {
    constructor(private moviesService: MoviesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieTrailer[]> {
        return this.moviesService.getTrailers(route.params.id);
    }
}
