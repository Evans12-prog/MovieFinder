type Movie = {
title: string;
year: string;
poster: string;
rating: number;
};

type MovieCardProps = {
    movie:Movie;
}

function MovieCard({movie}:MovieCardProps){
return(
    <article className="movie-card">
        <img src={movie.poster} alt={movie.title}/>

        <div className="movie-info">
            <h3>{movie.title}</h3>
            <div className="movie-meta">
                <span>{movie.year}</span>
                <span className="movie-rating" aria-label={`IMDb rating ${movie.rating} out of 10`}>
                    <span aria-hidden="true">★</span> {movie.rating > 0 ? movie.rating.toFixed(1) : "N/A"}
                </span>
            </div>
        </div>
    </article>
)
}
export default MovieCard;
