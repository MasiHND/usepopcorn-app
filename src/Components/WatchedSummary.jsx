import IMDb from "../assets/IMDb.png";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const averageRate = (arr) =>
  arr.reduce(
    (acc, cur, i, arr) => Math.round((acc + cur / arr.length) * 100) / 100,
    0
  );

export default function WathcedSummary({ watched }) {
  const avgImdbRating = averageRate(watched.map((movie) => movie.imdbRating));
  const avgUserRating = averageRate(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <img src={IMDb} alt="IMDb Logo" />
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
