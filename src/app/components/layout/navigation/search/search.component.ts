import {Component} from '@angular/core';
import {SearchResult} from '../../../../models/search-result';
import {Subject} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {MoviesService} from '../../../../services/movies.service';

@Component({
    selector   : 'app-search',
    templateUrl: './search.component.html',
    styleUrls  : ['./search.component.css']
})
export class SearchComponent {

    searchResults: SearchResult[] = [];
    searchTerm$                   = new Subject<string>();
    searchField                   = new FormControl('');
    searchForm                    = new FormGroup({searchField: this.searchField});

    constructor(moviesService: MoviesService) {
        // TODO: replace console.log with error notification
        moviesService
            .search(this.searchTerm$)
            .subscribe(
                result => this.searchResults = result,
                err => console.log(err)
            );
    }

    search(event: KeyboardEvent): void {
        event.preventDefault();
        event.stopPropagation();
        if (event.key === 'Escape' || !this.searchField.value) {
            return this.emptyResults();
        }

        return this.searchTerm$.next(this.searchField.value);
    }

    emptyResults(): void {
        this.searchResults = [];
        this.searchField.setValue('');
    }
}
