import {Movie} from './movie';
import {MovieTrailer} from './movie-trailer';

export interface DbResponse {
    results: Movie[] | MovieTrailer[];
}
