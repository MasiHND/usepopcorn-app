import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import IMDb from "../assets/IMDb.png";

const MYKEY = "e3d6a10c";

export default function SelectedMovie({
  selectedMovieId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const countRef = useRef(0);

  const isWatched = watched.map((m) => m.imdbID).includes(selectedMovieId);
  const watchedUserRating = watched.find((m) => m.imdbID === selectedMovieId)?.userRating

  useEffect(function(){
    if (userRating) countRef.current= countRef.current + 1;
  },[userRating])
  
    useEffect(function () {
      function callback (e) {
        if (e.key === "Escape") {
          onCloseMovie();
        }
      }
      document.addEventListener("keydown", callback);

      return function () { document.removeEventListener("keydown", callback);
      }
    }, [onCloseMovie]);
   
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedMovieId,
      title: movieDetails.Title,
      poster: movieDetails.Poster,
      year: movieDetails.Year,
      imdbRating: Math.round(Number(movieDetails.imdbRating) * 100) / 100,
      runtime: Number(movieDetails.Runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      async function fetchMovieDetails() {
        setIsLoading(true);

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${MYKEY}&i=${selectedMovieId}`
        );

        if (!res.ok) throw new Error("Something Went Wrong !");

        const data = await res.json();
        setMovieDetails(data);

        if (data.Response === "False") throw new Error("Movie Not Found !");

        setIsLoading(false);
      }

      if (selectedMovieId) fetchMovieDetails();
    },
    [selectedMovieId]
  );

  useEffect(function (){
    if (!movieDetails.Title) return;
    document.title = `🎞️ Movie: ${movieDetails.Title}`;
    
    return function () {
      document.title = "UsePopcorn";
    }
  }
  ,[movieDetails.Title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <img
              src={movieDetails.Poster}
              alt={`Poster Of ${movieDetails.Title} Movie`}
            />
            <div className="details-overview">
              <h2>{movieDetails.Title}</h2>
              <p>
                {movieDetails.Released} &bull; {movieDetails.Runtime}
              </p>
              <p>{movieDetails.Genre}</p>
              <p>
                <img src={IMDb} alt="IMDb Logo" />
                {movieDetails.imdbRating} IMDB Rating{" "}
              </p>
            </div>
            <button className="btn-back" onClick={() => onCloseMovie()}>
              &larr;
            </button>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? 
              <>
              <StarRating
                onSetRating={setUserRating}
                maxRating={10}
                defaultRating={movieDetails.imdbRating}
                size={42}
                // message={[
                //   "Awful",
                //   "Terrible",
                //   "Bad",
                //   "Not Good",
                //   "Not Bad",
                //   "Okay",
                //   "Good",
                //   "Very Good",
                //   "Amazing",
                //   "Perfect",
                // ]}
              />
              {!userRating && (
                <button className="btn-message">
                  Please Rate The Movie First To Add It To Your Watched List.
                </button>
              )}
              {userRating && (
                <button className="btn-add" onClick={handleAdd}>
                  <span>+</span> Add to List
                </button>
              )}{" "}
              </> : <>
              <button className="btn-message">You Alredy Rated This Movie {watchedUserRating}<span>🌟</span>!</button>
              
              </>
              }
            </div>

            <p>
              <em>{movieDetails.Plot}</em>
            </p>
            <p>
              {" "}
              <b>Staring:</b> <em>{movieDetails.Actors}</em>
            </p>
            <p>
              {" "}
              <b>Directed By:</b> <em>{movieDetails.Director}</em>
            </p>
          </section>
        </>
      )}
    </div>
  );
}
