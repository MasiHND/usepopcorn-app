import { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import Logo from "./Components/Logo";
import Search from "./Components/Search";
import NumResults from "./Components/NumResults";
import MainLayout from "./Components/MainLayout";
import Box from "./Components/Box";
import MovieList from "./Components/MovieList";
import WathcedSummary from "./Components/WatchedSummary";
import WatchedMovieList from "./Components/WatchedMovieList";
import Loader from "./Components/Loader";
import ErrorMessage from "./Components/ErrorMessage";
import SelectedMovie from "./Components/selectedMovie";
import { useMovies } from "./Hooks/useMovies";
import { useLocalStorageState } from "./Hooks/useLocalStorageState";
import AppFooter from "./Components/AppFooter";

const MYKEY = "e3d6a10c";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(imdbID) {
    setSelectedMovieId((selectedMovieId) =>
      imdbID === selectedMovieId ? null : imdbID
    );
  }

  function handleCloseMovie() {
    setSelectedMovieId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <MainLayout>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedMovieId ? (
            <SelectedMovie
              onCloseMovie={handleCloseMovie}
              selectedMovieId={selectedMovieId}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WathcedSummary watched={watched} />
              <WatchedMovieList
                onRemoveWatched={handleDeleteWatched}
                watched={watched}
              />
            </>
          )}
        </Box>
        <AppFooter/>
      </MainLayout>
    </>
  );
}
