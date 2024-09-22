import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import options from "../api";
import MovieCard from "../components/MovieCard";
function Movie({ searchTerm }) {
  const [movies, setMovies] = useState([]);
  const [discoveredMovies, setDiscoveredMovies] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (searchTerm) {
      const fetchMovies = async () => {
        try {
          await axios
            .get(
              `https://api.themoviedb.org/3/search/movie?query=${searchTerm}`,
              options
            )
            .then((response) => {
              setMovies(response.data.results);
              console.log(response.data);
            });
        } catch (error) {
          console.log(error);
        }
      };
      fetchMovies();
    }
  }, [searchTerm]);
  useEffect(() => {
    const fetchDiscover = async () => {
      try {
        await axios
          .get(
            `https://api.themoviedb.org/3/discover/movie?page=${page}`,
            options
          )
          .then((response) => {
            setDiscoveredMovies((prevData) => [
              ...prevData,
              ...response.data.results,
            ]);
            console.log(discoveredMovies);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchDiscover();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleLoadMoreClick = (page) => {
    setPage(page + 1);
  };
  return (
    <div className="flex flex-col gap-10">
      <div className="sm:grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 sm:grid-auto-rows-[1fr]">
        {movies.length !== 0 &&
          movies.map((movie, index) => {
            return <MovieCard key={index} movie={movie} />;
          })}
      </div>
      {discoveredMovies.length < 22 && (
        <div className="flex items-center justify-center">
          <button
            onClick={() => handleLoadMoreClick(page)}
            className="bg-black text-white p-3 rounded-lg font-semibold"
          >
            Load More Movie
          </button>
        </div>
      )}
    </div>
  );
}

export default Movie;
