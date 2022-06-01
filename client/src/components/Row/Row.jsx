import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import './Row.css';

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title , fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  

  useEffect(() => {
    async function fetchData(){
     const request = await axios.get(fetchUrl);
     setMovies(request.data.results);
     return request;
    } fetchData();
    
  }, [fetchUrl]);
 
//    const opts = {
//      height: "390",
//      width: "100%",
//      playerVars: {
//        autoplay:1,
//      },
//    }

    return (
        <div className="row" >
           
            <h2>{ title }</h2>

            <div className="row__posters" >

              {movies?.map(movie =>(
                <img 
                key={movie}
                // onClick={()=> handleClick(movie)}
                className={`row__poster  ${isLargeRow && "row__posterLarge"} `}
                src={`${baseUrl}${isLargeRow ? movie?.poster_path : movie?.backdrop_path}`}
                alt={movie.name} 
                />
              ))}
            </div>
        </div>
    )
}

export default Row;