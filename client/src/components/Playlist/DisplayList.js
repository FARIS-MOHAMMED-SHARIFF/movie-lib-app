import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import '../Row/Row.css';

const baseUrl = "https://image.tmdb.org/t/p/original/";

function DisplayList({ title , fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  
  const config = {
    headers: { 'x-auth-token' :  localStorage.getItem('token') }
};
  useEffect(() => {
    async function fetchData(){
     const request = await axios.get(fetchUrl, config);
     setMovies(request.data.movies);
    //  return request;
    } fetchData();
    
  }, []);
 
//   .then(res => {
//     console.log(res.data.results)
//     setPlaylist(res.data)
// })
// .catch(err => {
//     console.log(err)
// })    
// }, []); 

    return (
        <div className="row" >
           
            <h2>{ title }</h2>

            <div className="row__posters" >

              {movies?.map(movie =>(
                <img 
                key={movie}
                // onClick={()=> handleClick(movie)}
                className={`row__poster  ${isLargeRow && "row__posterLarge"} `}
                src={`${baseUrl}${isLargeRow ? movie?.poster_paths : movie?.backdrop_path}`}
                alt={movie.name} 
                />
              ))}
            </div>
        </div>
    )
}

export default DisplayList;