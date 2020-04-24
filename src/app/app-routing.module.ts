import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {MovieDetailsComponent} from './components/movies/movie-details/movie-details.component';
import {AboutComponent} from './components/about/about.component';
import {MovieDetailsResolver} from './resolvers/movie-details-resolver';
import {MovieTrailerResolver} from './resolvers/movie-trailer-resolver';
import {MoviesListComponent} from './components/movies/movies-list/movies-list.component';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {
        path: 'popular',
        component: MoviesListComponent
    },
    {
        path: 'in-theaters',
        component: MoviesListComponent
    },
    {
        path: 'movies/:id',
        component: MovieDetailsComponent,
        resolve: {
            movieDetails: MovieDetailsResolver,
            trailers: MovieTrailerResolver
        }
    },
    {path: 'about', component: AboutComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(
        routes,
        {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled'
        })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
