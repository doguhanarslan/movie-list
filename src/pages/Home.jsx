import React from "react";
import { useEffect, useState } from "react";
import options from "../api";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import OptionsBar from "../components/OptionsBar";
function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [sortedArr, setSortedArr] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("Popular");
  const [page, setPage] = useState(1);
  const [topRatedPage, setTopRatedPage] = useState(1);
  useEffect(() => {
    const fetchDiscover = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?page=${page}`,
          options
        );
        setPopularMovies((prevData) => [...prevData, ...response.data.results]);
        setSortedArr((prevData) => [...prevData, ...response.data.results]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDiscover();
  }, [page]);

  useEffect(() => {
    const fetchTopRatedMovies = async (e) => {
        try {
            const response = await axios.get(
              `https://api.themoviedb.org/3/movie/top_rated?page=${topRatedPage}`,
              options
            );
            setTopRatedMovies((prevData) => [
              ...prevData,
              ...response.data.results,
            ]);
            console.log(response.data.results);
          } catch (error) {
            console.log(error);
          }
        }
      fetchTopRatedMovies()
    }, [topRatedPage]);

  const uniqueById = (array) => {
    const seen = new Set();
    const filteredArray = array.filter((item) => {
      const duplicate = seen.has(item.id);
      seen.add(item.id);
      return !duplicate;
    });
    return filteredArray;
  };

  const handleLoadMoreClick = () => {
    setPage((prevPage) => prevPage + 1);
    console.log(sortedArr);
  };

  const handleSortChange = () => {
    const sortedData = popularMovies.sort((a, b) => {
      return b.vote_count - a.vote_count;
    });
    const uniq = uniqueById([...popularMovies, ...sortedData]);
    setSortedArr(uniq);
    // Diziyi sıralayın ve kopyayı state'e ayarlayın
    setIsSorted(true);
  };
  const handleOptionPageChange = (page) => {
    setActivePage(page);
    console.log(activePage);
  };
  const handleFilterChange = ({ filter }) => {};
  return (
    <div className="flex flex-col gap-10">
      <OptionsBar
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onOptionPageChange={handleOptionPageChange}
      />
      <div className="sm:grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 sm:grid-auto-rows-[1fr]">
        {loading ? (
          <h1>Loading</h1>
        ) : isSorted ? (
          sortedArr.map((movie, index) => {
            return <MovieCard key={index} movie={movie} />;
          })
        ) : (
          activePage === "Popular" &&
          popularMovies.map((movie, index) => {
            return <MovieCard key={index} movie={movie} />;
          })
        )}
        {activePage === "Top Rated" &&
          topRatedMovies.map((movie, index) => {
            return <MovieCard key={index} movie={movie} />;
          })}
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={() => handleLoadMoreClick(page)}
          className="bg-black text-white p-3 rounded-lg font-semibold"
        >
          Load More Movie
        </button>
      </div>
    </div>
  );
}

export default Home;
