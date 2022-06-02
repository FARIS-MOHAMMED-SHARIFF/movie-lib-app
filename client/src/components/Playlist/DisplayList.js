import React, { useEffect, useState } from 'react';
// import axios from '../../axios';
import '../Row/Row.css';
import axios from "axios";

const baseUrl = "https://image.tmdb.org/t/p/original/";

function DisplayList({ title , url, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  
  const config = {
    headers: { 'x-auth-token' :  localStorage.getItem('token') }
};
  useEffect(() => {
    async function fetchData(){
     const request = await axios.get(url, config);
     setMovies(request.data);
    //  return request;
    } fetchData();
    
  }, []);

    return (
        <div className="row" >
           
            <h2>{ title }</h2>

            <div className="row__posters" >

              {movies.data?.map(movie =>(
                <img 
                key={movie}
                // onClick={()=> handleClick(movie)}
                className={"row__poster"}
                src = {`https://image.tmdb.org/t/p/original/${movie.poster_paths}`}
                alt={movie.title} 
                />
              ))}
            </div>
        </div>
    )
}

export default DisplayList;