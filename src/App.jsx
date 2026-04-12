import { useState, useEffect } from "react"
import Search from "./components/search"
import Loader from "./components/loader";
import MovieCard from "./components/movieCard";
import { useDebounce } from 'use-debounce'
import { fetchTrendingMovies, updateSearchCount } from "./config/appwrite";


const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
 

    async function fetchMovies(query = ""){
      setErrorMessage('');
      setIsLoading(true);
      try{
        const endpoint = query 
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`


        const response = await fetch(endpoint, API_OPTIONS);
        if(!response.ok) throw new Error("Failed to fetch movies");

        const data = await response.json();
        
        if(!data.results) {
          setErrorMessage("Failed to fetch movies");
          setMovieList([]);
          return;
        }

        setMovieList(data.results || []);

        if(query && data.results.length > 0){
          await updateSearchCount(query, data.results[0]);
      }
        return data;
      }catch(err){
        console.log(err);
        setErrorMessage("Error retrieving movies, please try again later");
      }finally{
        setIsLoading(false);
      }
    }

    async function loadTrendingMovies(){
      try{
        const movies = await fetchTrendingMovies();

        setTrendingMovies(movies);
      }catch(err){
        console.error(`Error fetching movies ${err}`)
    }
  }

useEffect(() => {
  fetchMovies(debouncedSearchTerm);
}, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, [])

  return (
    <div>
      <main>
        <div className="pattern" />
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="Hero Banner" />
            <h1>
              Find all the{" "}
              <span className="text-gradient">
                movies you have been looking
              </span>{" "}
              for in 1 place
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          {trendingMovies.length > 0 && (
            <section className="trending">
              <h2>Trending movies</h2>

              <ul>
                {trendingMovies.map((movie, index) => (
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.title}/>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="all-movies">
            <h2 className="mt-10">All movies</h2>

            {isLoading ? (
              <Loader />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </section>
        </div>
        </main>
    </div>
  );
}

export default App
