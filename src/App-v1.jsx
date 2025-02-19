import { useState } from "react";
import NavBar from "./Components/NavBar";
import Logo from "./Components/Logo";
import Search from "./Components/Search";
import NumResults from "./Components/NumResults";
import MainLayout from "./Components/MainLayout";
import Box from "./Components/Box";
import MovieList from "./Components/MovieList";
import WathcedSummary from "./Components/WatchedSummary";
import WatchedMovieList from "./Components/WatchedMovieList";
import StarRating from "./Components/StarRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];


export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <MainLayout>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <WathcedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </MainLayout>
      <StarRating
        maxRating={10}
        defaultRating={6}
        message={[
          "Awful",
          "Terrible",
          "Bad",
          "Not Good",
          "Not Bad",
          "Okay",
          "Good",
          "Very Good",
          "Amazing",
          "Perfect",
        ]}
        />
      <Test />
    </>
  );
}

function Test() {
  const [movieRating, setMovieRating] = useState(0)

return (<div>
    <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
    <p>This Movie Was Rated {movieRating} Stars</p>
  </div>);
} 
