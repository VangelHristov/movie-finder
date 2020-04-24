import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServiceWorkerModule} from '@angular/service-worker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MoviesService} from './services/movies.service';
import {MovieSummaryComponent} from './components/movies/movie-summary/movie-summary.component';
import {NavigationComponent} from './components/layout/navigation/navigation.component';
import {FooterComponent} from './components/layout/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {MovieDetailsComponent} from './components/movies/movie-details/movie-details.component';
import {AboutComponent} from './components/about/about.component';
import {MapperService} from './services/mapper.service';
import {MovieDetailsResolver} from './resolvers/movie-details-resolver';
import {MovieTrailerResolver} from './resolvers/movie-trailer-resolver';
import {environment} from '../environments/environment';
import {MoneyPipe} from './pipes/money.pipe';
import {MoviesListComponent} from './components/movies/movies-list/movies-list.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { RatingComponent } from './components/movies/movie-details/rating/rating.component';
import { TrailersComponent } from './components/movies/movie-details/trailers/trailers.component';
import { SearchComponent } from './components/layout/navigation/search/search.component';

@NgModule({
    declarations: [
        AppComponent,
        MovieSummaryComponent,
        NavigationComponent,
        FooterComponent,
        HomeComponent,
        MovieDetailsComponent,
        AboutComponent,
        MoneyPipe,
        MoviesListComponent,
        RatingComponent,
        TrailersComponent,
        SearchComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register(
            'ngsw-worker.js',
            {
                enabled: environment.production
            }),
        InfiniteScrollModule
    ],
    providers: [
        MoviesService,
        MapperService,
        MovieDetailsResolver,
        MovieTrailerResolver]
    ,
    bootstrap: [AppComponent]
})
export class AppModule {
}
