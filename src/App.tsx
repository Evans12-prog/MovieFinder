import { useState } from "react";

import Searchbar from "./component/Searchbar";
import MovieGrid from "./component/MovieGrid";
import EmptyState from "./component/EmptyState";
import Loading from "./component/Loading";

type OMDbMovie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  imdbRating: string;
};

type Movie = {
  title: string;
  year: string;
  poster: string;
  rating: number;
};

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

 const searchMovies = async (title: string) => {
  if (!title.trim()) return;

  setLoading(true);

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${title}`
    );

    const data = await response.json();

    if (data.Response === "True") {
      const detailedMovies = await Promise.all(
        data.Search.map(async (movie: OMDbMovie) => {
          const detailsResponse = await fetch(
            `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${movie.imdbID}`
          );

          const details = await detailsResponse.json();

          return {
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
            rating:
              details.imdbRating !== "N/A"
                ? Number(details.imdbRating)
                : 0,
          };
        })
      );

      setMovies(detailedMovies);
    } else {
      setMovies([]);
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    setMovies([]);
  } finally {
    setLoading(false);
  }
};

  return (
  <>
    <header className="hero">
      <h1>🎬 Movie Finder</h1>
      <p>Search for your favorite movies and discover something new.</p>
    </header>

    <Searchbar onSearch={searchMovies} />

    {loading ? (
      <Loading />
    ) : movies.length > 0 ? (
      <MovieGrid movies={movies} />
    ) : (
      <EmptyState />
    )}
  </>
);
}

export default App;