import {MovieDetails} from '../models/movie-details';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MovieDetailsResolver implements Resolve<MovieDetails> {
    constructor(private moviesService: MoviesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieDetails> {
        return this.moviesService.getById(route.params.id);
    }
}
