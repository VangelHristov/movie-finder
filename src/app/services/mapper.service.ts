import {Injectable} from '@angular/core';
import {Movie} from '../models/movie';
import {MovieDetails} from '../models/movie-details';
import {DbMovieDetails} from '../models/db-movie-details';
import {MovieTrailer} from '../models/movie-trailer';
import {SearchResult} from '../models/search-result';

const getImgPath = (fragment: string | null, poster: boolean) => {
    const posterBaseUrl = 'https://image.tmdb.org/t/p/w220_and_h330_face/';
    const backdropBaseUrl = 'https://image.tmdb.org/t/p/w1400_and_h450_face';
    const baseUrl = poster ? posterBaseUrl : backdropBaseUrl;

    return fragment
        ? `${baseUrl}${fragment}`
        : '../../assets/error_404.jpg';
};

const pick = (collection: Array<any>, prop: string) =>
    collection.reduce((acc, cur) => acc.concat(cur[prop]), []);

@Injectable({
    providedIn: 'root'
})
export class MapperService {

    constructor() {
    }

    mapToMovieSummary(movies: Movie[]): Movie[] {
        return movies.map((movie: Movie) => {
            return {
                id: movie.id,
                title: movie.title,
                release_date: movie.release_date,
                poster_path: getImgPath(movie.poster_path, true)
            };
        });
    }

    mapToMovieDetails(value: DbMovieDetails): MovieDetails {
        return {
            id: value.id,
            poster_path: getImgPath(value.poster_path, true),
            backdrop_path: getImgPath(value.backdrop_path, false),
            budget: value.budget,
            genres: pick(value.genres, 'name'),
            overview: value.overview,
            revenue: value.revenue,
            runtime: value.runtime,
            languages: pick(value.spoken_languages, 'name'),
            title: value.title,
            vote: value.vote_average,
            release_date: value.release_date
        };
    }

    mapToMovieTrailers(value: MovieTrailer[]): MovieTrailer[] {
        return value.map((trailer: MovieTrailer) => {
            trailer.key = 'https://www.youtube.com/embed/' + trailer.key;
            return trailer;
        });
    }

    mapToSearchResults(value): SearchResult[] {
        return value.map(x => ({id: x.id, title: `${x.title} (${x.release_date.substr(0, 4)})`}));
    }
}
