import React, { useEffect, useState } from 'react'
import Movie from '../Movie/Movie';
import Navbar from '../Navbar/Navbar';
import './Search.css'
// const imageUrl = "https://image.tmdb.org/t/p/original/"
const API_URL="https://api.themoviedb.org/3/movie/popular?api_key=094a3d803bdc4b5dd9242156577eda89";
// const API_SEARCH="https://api.themoviedb.org/3/search/movie?api_key=094a3d803bdc4b5dd9242156577eda89&query";

const Search = () => {
  const [movies, setMovies]=useState([]);
  const [query, setQuery]=useState('');

  useEffect(() => {
    fetch(API_URL)
    .then((res)=>res.json())
    .then(data=>{
      console.log(data);
      setMovies(data.results);
    })
  }, []);


  const searchMovie = async(e)=>{
    e.preventDefault();
    try{
      if(query){
        const url=`https://api.themoviedb.org/3/search/movie?api_key=094a3d803bdc4b5dd9242156577eda89&query=${query}`;
        const res= await fetch(url);
        const data= await res.json();
        console.log(data);
        setMovies(data.results);
      }
      setQuery("");
    }
    catch(e){
      console.log(e);
    }
  }

  const changeHandler=(e)=>{
    setQuery(e.target.value);
  }
  return (
    <><Navbar />
    <div class="container"> 
        <header>
          <form onSubmit={searchMovie}>
            <input className="search"
            type= "search"  
            value={ query }
            onChange={changeHandler}
            placeholder="Search.." />
          </form>
        </header>     
        <div className = "movie-container">
        {movies.length > 0 && 
              movies.map((movie) => <Movie key={movie.id} {...movie} />)}
        </div>
    </div>
    </>
  )
}

export default Search