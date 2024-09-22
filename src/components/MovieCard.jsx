import React from "react";
import { MdStarRate, MdPerson } from "react-icons/md";
function MovieCard({ movie }) {
  return (
    <div className="rounded overflow-hidden p-4 shadow-2xl items-center justify-center">
      <div className="px-1 pt-1 pb-1 flex flex-row items-center justify-between">
        <span className="items-center gap-1 inline-flex bg-black rounded-md px-3 py-1 text-sm font-semibold text-yellow-400 mr-2 mb-2">
          <MdStarRate className="w-3 h-4" />
          {movie.vote_average.toFixed(1)}
        </span>
        <span className="items-center gap-1 inline-flex bg-black rounded-md px-3 py-1 text-sm font-semibold text-yellow-400 mr-2 mb-2">
          <MdPerson className="w-3 h-4" />
          {movie.vote_count}
        </span>
      </div>
      <div className="flex items-center justify-center object-contain">
        {movie.poster_path ? (
          <img
            className="w-96 object-cover"
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie?.poster_path}`}
            alt="poster"
          />
        ) : (
          <img
            className="w-96 object-cover"
            src={`https://placehold.co/600x900/png`}
            alt="poster"
          />
        )}
      </div>
      <div className="px-6 py-4 flex items-center justify-center flex-col">
        <div className="font-bold text-xl mb-2">{movie.title}</div>
        <p className="text-gray-700 text-base">{movie.overview}</p>
      </div>
    </div>
  );
}
export default MovieCard;
