import MovieCard  from "./MovieCard";
type Movie = {
    title:string;
    year:string;
    poster:string;
    rating:number;
};
type MovieGridProps = {
    movies:Movie[];
}
function MovieGrid({movies}:MovieGridProps){
return(
    <div className="movie-grid">
   {
    movies.map((movie)=> (
        <MovieCard key={movie.title} movie={movie} />
    ))
   } 
   </div>
)
}
export default MovieGrid;