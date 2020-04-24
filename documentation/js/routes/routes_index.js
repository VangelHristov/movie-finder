var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"home","component":"HomeComponent"},{"path":"popular","component":"MoviesListComponent"},{"path":"in-theaters","component":"MoviesListComponent"},{"path":"movies/:id","component":"MovieDetailsComponent","resolve":{"movieDetails":"MovieDetailsResolver","trailers":"MovieTrailerResolver"}},{"path":"about","component":"AboutComponent"},{"path":"","redirectTo":"home","pathMatch":"full"}],"kind":"module"}]}